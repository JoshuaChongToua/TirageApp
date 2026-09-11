import {Component, effect, Inject, OnInit, signal, WritableSignal} from '@angular/core';
import {DetailService} from "./services/detail.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatDialog} from "@angular/material/dialog";
import {AddNoteAvisComponent} from "./add-note-avis/add-note-avis.component";
import {AvisComponent} from "./avis/avis.component";
import {StarRatingComponent} from "../../shared/star-rating/star-rating.component";
import {DatePipe, DecimalPipe, NgClass} from "@angular/common";
import {DomSanitizer} from "@angular/platform-browser";
import {InformationComponent} from "./information/information.component";
import {EpisodeComponent} from "./episode/episode.component";
import {SpecialComponent} from "./special/special.component";
import {MatTooltip} from "@angular/material/tooltip";
import {ConversationComponent} from "./conversation/conversation.component";
import {MainPageService} from "../main-page/services/main-page.service";

@Component({
    selector: 'app-detail',
    imports: [
        AvisComponent,
        InformationComponent,
        EpisodeComponent,
        SpecialComponent,
        MatTooltip,
        NgClass,
        DecimalPipe,
        DatePipe,
    ],
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.sass'
})
export class DetailComponent implements OnInit {

    event: any;

    eventDetail = this.detailService.event
    noteAverage = this.detailService.noteAverage
    ongletToDisplay: WritableSignal<any> = signal('info')
    hasVoted = this.detailService.hasVoted
    listGenres: WritableSignal<any> = this.mainPageService.listGenres;
    protected readonly Math = Math;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private detailService: DetailService, private mainPageService: MainPageService) {
        effect(() => {
            if (this.detailService.reloadHasVoted()) {
                this.detailService.getHasVoted(this.event.id)
                this.detailService.reloadHasVoted.set(false)
            }
        });
    }

    ngOnInit(): void {
        if (this.listGenres().length <= 0) {
            this.mainPageService.getGenresList()
        }
        this.event = this.data.event;
        this.detailService.getDetailId(this.event)
        this.detailService.getNoteAverage(this.event.id)
        this.detailService.getHasVoted(this.event.id)
        this.detailService.isAdded(this.event.id)

    }

    closeModal() {
        this.dialog.closeAll()
    }

    selectOnglet(name: string) {
        if (this.ongletToDisplay() !== name) {
            this.ongletToDisplay.set(name)
        }
    }

    addToList(titre: any) {
        const type = titre.release_date ? "movie" : "tv"
        this.detailService.addToList(titre.id, type)
    }

    removeFromList(titre: any) {
        this.detailService.removeFromList(titre.id)
    }

    addNoteAndAvis(titre: any) {
        this.dialog.open(AddNoteAvisComponent, {
            width: '750px',
            maxHeight: '95vh',
            height: '400px',
            data: {
                titre: titre,
                hasVoted: this.hasVoted,
            }
        });
    }

    sendToConversation(titre: any) {
        this.dialog.open(ConversationComponent, {
            width: '750px',
            maxHeight: '95vh',
            height: '400px',
            data: {
                titre: titre,
            }
        });
    }

    getGenres(idGenre: any): any {
        return this.listGenres()?.find((genre: any) => genre.id === idGenre)?.name;
    }

}

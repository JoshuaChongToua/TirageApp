import {Component, effect, Inject, OnInit, signal, WritableSignal} from '@angular/core';
import {DetailService} from "./services/detail.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatDialog} from "@angular/material/dialog";
import {AddNoteAvisComponent} from "./add-note-avis/add-note-avis.component";
import {AvisComponent} from "./avis/avis.component";
import {StarRatingComponent} from "../../shared/star-rating/star-rating.component";
import {NgIf} from "@angular/common";
import {DomSanitizer} from "@angular/platform-browser";
import {InformationComponent} from "./information/information.component";
import {EpisodeComponent} from "./episode/episode.component";
import {SpecialComponent} from "./special/special.component";

@Component({
  selector: 'app-detail',
  standalone: true,
    imports: [
        AvisComponent,
        InformationComponent,
        EpisodeComponent,
        SpecialComponent,
    ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.sass'
})
export class DetailComponent implements OnInit {

    event: any;

    eventDetail!: WritableSignal<any>
    noteAverage!: WritableSignal<any>
    ongletToDisplay: WritableSignal<any> = signal('info')
	addedToList!: WritableSignal<any>

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private detailService: DetailService) {
        this.eventDetail = this.detailService.event
        this.noteAverage = this.detailService.noteAverage
        this.addedToList = this.detailService.addedToList
    }

    ngOnInit(): void {
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

}

import {Component, effect, Inject, OnInit, signal, WritableSignal} from '@angular/core';
import {DetailService} from "./services/detail.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatDialog} from "@angular/material/dialog";
import {AddNoteAvisComponent} from "./add-note-avis/add-note-avis.component";
import {AvisComponent} from "./avis/avis.component";
import {StarRatingComponent} from "../../shared/star-rating/star-rating.component";

@Component({
  selector: 'app-detail',
  standalone: true,
    imports: [
        AvisComponent,
        StarRatingComponent
    ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.sass'
})
export class DetailComponent implements OnInit {

    event: any;
    eventDetail!: WritableSignal<any>
    noteAverage!: WritableSignal<any>
    hasVoted!: WritableSignal<any>
    ongletToDisplay: WritableSignal<any> = signal('info')
    reloadHasVoted!: WritableSignal<any>
	addedToList!: WritableSignal<any>

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private detailService: DetailService) {
        this.eventDetail = this.detailService.event
        this.noteAverage = this.detailService.noteAverage
        this.hasVoted = this.detailService.hasVoted
        this.reloadHasVoted = this.detailService.reloadHasVoted
        this.addedToList = this.detailService.addedToList

        effect(() => {
            if (this.reloadHasVoted()) {
                this.detailService.getHasVoted(this.event.id)
                this.detailService.getNoteAverage(this.event.id)
                this.reloadHasVoted.set(false)
            }
        }, {allowSignalWrites: true});
    }

    ngOnInit(): void {
        this.event = this.data.event;
        this.detailService.getDetailId(this.event.id)
        this.detailService.getNoteAverage(this.event.id)
        this.detailService.getHasVoted(this.event.id)
        this.detailService.isAdded(this.event.id)
    }

    closeModal() {
        this.dialog.closeAll()
    }

    getGenres() {
        return this.eventDetail()?.genres.map((genre:any) => genre.name)
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

	ngOnDestroy() {
		this.addedToList.set(false)
	}

}

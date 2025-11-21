import {Component, effect, Input, WritableSignal} from '@angular/core';
import {StarRatingComponent} from "../../../shared/star-rating/star-rating.component";
import {MatDialog} from "@angular/material/dialog";
import {DetailService} from "../services/detail.service";
import {AddNoteAvisComponent} from "../add-note-avis/add-note-avis.component";

@Component({
  selector: 'app-information',
  standalone: true,
    imports: [
        StarRatingComponent
    ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.sass'
})
export class InformationComponent {

    @Input() titre: any
    @Input() titreDetail: any
    reloadHasVoted!: WritableSignal<any>
    noteAverage!: WritableSignal<any>
    hasVoted!: WritableSignal<any>

    constructor(private detailService: DetailService, private dialog: MatDialog) {
        this.noteAverage = this.detailService.noteAverage
        this.reloadHasVoted = this.detailService.reloadHasVoted
        this.hasVoted = this.detailService.hasVoted

        effect(() => {
            if (this.reloadHasVoted()) {
                this.detailService.getHasVoted(this.titre.id)
                this.detailService.getNoteAverage(this.titre.id)
                this.reloadHasVoted.set(false)
            }
        }, {allowSignalWrites: true});

        this.reloadHasVoted = this.detailService.reloadHasVoted
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

    getGenres() {
        if (this.titreDetail) {
            return this.titreDetail?.genres.map((genre: any) => genre.name)
        }
    }
}

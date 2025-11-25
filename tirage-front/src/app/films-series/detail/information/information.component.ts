import {Component, effect, Input, WritableSignal} from '@angular/core';
import {StarRatingComponent} from "../../../shared/star-rating/star-rating.component";
import {DetailService} from "../services/detail.service";

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

    constructor(private detailService: DetailService) {
        this.noteAverage = this.detailService.noteAverage
        this.reloadHasVoted = this.detailService.reloadHasVoted
        this.hasVoted = this.detailService.hasVoted

        effect(() => {
            if (this.reloadHasVoted()) {
                this.detailService.getNoteAverage(this.titre.id)
            }
        }, {allowSignalWrites: true});

        this.reloadHasVoted = this.detailService.reloadHasVoted
    }

    getGenres() {
        if (this.titreDetail) {
            return this.titreDetail?.genres.map((genre: any) => genre.name)
        }
    }
}

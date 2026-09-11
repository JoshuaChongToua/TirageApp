import {Component, effect, Input, WritableSignal} from '@angular/core';
import {StarRatingComponent} from "../../../shared/star-rating/star-rating.component";
import {DetailService} from "../services/detail.service";

@Component({
    selector: 'app-information',
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
    addedToList = this.detailService.addedToList

    constructor(private detailService: DetailService) {
        this.noteAverage = this.detailService.noteAverage
        this.reloadHasVoted = this.detailService.reloadHasVoted
        this.hasVoted = this.detailService.hasVoted

        effect(() => {
            if (this.reloadHasVoted()) {
                this.detailService.getNoteAverage(this.titre.id)
            }
        });

        this.reloadHasVoted = this.detailService.reloadHasVoted
    }

    getGenres() {
        if (this.titreDetail) {
            return this.titreDetail?.genres.map((genre: any) => genre.name)
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

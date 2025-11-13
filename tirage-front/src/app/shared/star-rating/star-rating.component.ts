import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {AddNoteAvisService} from "../../films-series/detail/add-note-avis/services/add-note-avis.service";

@Component({
    selector: 'app-star-rating',
    templateUrl: './star-rating.component.html',
    standalone: true,
    imports: [
        NgClass,
        MatIcon
    ],
    styleUrls: ['./star-rating.component.sass']
})
export class StarRatingComponent   {

    @Input() note: any
    @Input() context!: 'avis-page' | 'detail-page' | 'add-avis-page'
    selectedRating = 0;
    stars = Array.from({length: 5}, (_, i) => ({
        id: i + 1,
        icon: 'star',
        class: 'star-gray star-hover star'
    }));

    listNoSelectStar = ['avis-page', 'detail-page'];

    constructor(private addNoteAvisService: AddNoteAvisService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['note'] && this.note != null) {
            this.selectedRating = this.note;
            this.updateStarsFromValue(this.note);
        } else if (changes['note'] && this.note == null) {
            this.resetStars();
        }
    }

    updateStarsFromValue(value: number) {
        const floor = Math.floor(value);
        const hasHalf = (value - floor) >= 0.5;

        this.stars.forEach(star => {
            if (star.id <= floor) {
                star.icon = 'star';
                star.class = 'star-gold star';
            } else if (star.id === floor + 1 && hasHalf) {
                star.icon = 'star_half';
                star.class = 'star-gold star half';
            } else {
                star.icon = 'star';
                star.class = 'star-gray star';
            }
        });
    }
    selectStar(value: any): void{
        this.selectedRating = value;
        this.updateStarsFromValue(this.selectedRating);
        this.addNoteAvisService.noteAvisForm.get('note')?.patchValue(this.selectedRating);
    }

    resetStars() {
        this.stars.forEach(star => {
            star.icon = 'star';
            star.class = 'star-gray star';
        });
        this.selectedRating = 0;
    }


}

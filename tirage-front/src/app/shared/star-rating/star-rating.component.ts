import {Component, OnInit} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {AddNoteAvisService} from "../../films-series/detail/add-note-avis/services/add-note-avis.service";

@Component({
    selector: 'app-star-rating',
    templateUrl: './star-rating.component.html',
    standalone: true,
    imports: [
        MatCard,
        NgClass,
        MatIcon
    ],
    styleUrls: ['./star-rating.component.sass']
})
export class StarRatingComponent implements OnInit {


    selectedRating = 0;
    stars = [
        {
            id: 1,
            icon: 'star',
            class: 'star-gray star-hover star'
        },
        {
            id: 2,
            icon: 'star',
            class: 'star-gray star-hover star'
        },
        {
            id: 3,
            icon: 'star',
            class: 'star-gray star-hover star'
        },
        {
            id: 4,
            icon: 'star',
            class: 'star-gray star-hover star'
        },
        {
            id: 5,
            icon: 'star',
            class: 'star-gray star-hover star'
        }

    ];

    constructor(private addNoteAvisService: AddNoteAvisService) {}

    ngOnInit(): void {

    }


    selectStar(value: any): void{

        this.stars.filter( (star) => {

            if ( star.id <= value){

                star.class = 'star-gold star';

            }else{

                star.class = 'star-gray star';

            }

            return star;
        });

        this.selectedRating = value;
        this.addNoteAvisService.noteAvisForm.get('note')?.patchValue(this.selectedRating);
    }

}

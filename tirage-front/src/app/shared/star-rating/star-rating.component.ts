import {Component, OnInit} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

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

    constructor() {}

    ngOnInit(): void {

    }


    selectStar(value: any): void{

        // prevent multiple selection
        if ( this.selectedRating === 0){

            this.stars.filter( (star) => {

                if ( star.id <= value){

                    star.class = 'star-gold star';

                }else{

                    star.class = 'star-gray star';

                }

                return star;
            });

        }

        this.selectedRating = value;


    }

}

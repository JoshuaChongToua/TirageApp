import { Component } from '@angular/core';
import {LolService} from "../services/lol.service";
import {ActivatedRoute} from "@angular/router";
import {Champion} from "../../shared/interfaces/champion-interface";
import {InfoComponent} from "./info/info.component";

@Component({
  selector: 'app-champion',
    imports: [
        InfoComponent
    ],
  templateUrl: './champion.component.html',
  styleUrl: './champion.component.sass',
})
export class ChampionComponent {

    championId!: string | null
    champion!: Champion

    constructor(private lolService: LolService, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.paramMap.subscribe(params => {
            this.championId = params.get('id');
        });
    }

    ngOnInit() {
        this.lolService.getChampionDetails(this.championId!).subscribe({
            next: data => {
                this.champion = data
                console.log(data);
            },
            error: err => {
                console.log(err);
            }

        })
    }
}

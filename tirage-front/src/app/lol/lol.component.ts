import {Component, effect, OnInit} from '@angular/core';
import {LolService} from "./services/lol.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {RouterLink} from "@angular/router";
import {environment} from "../../environment/environment.development";

@Component({
  selector: 'app-lol',
    imports: [
        RouterLink
    ],
  templateUrl: './lol.component.html',
  styleUrl: './lol.component.sass',
})
export class LolComponent implements OnInit {

    constructor(private lolService: LolService) {
        effect(() => {
            const championsData = this.champions();
            if (championsData) {
                console.log('Liste des champions :', championsData);
            }
        });
    }
    champions = toSignal(this.lolService.getChampions());

    ngOnInit() {
    }

    protected readonly environment = environment;
}

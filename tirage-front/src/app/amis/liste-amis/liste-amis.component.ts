import {Component, OnInit, WritableSignal} from '@angular/core';
import {MatTooltip} from "@angular/material/tooltip";
import {ListeAmisService} from "./services/liste-amis.service";

@Component({
  selector: 'app-liste-amis',
  standalone: true,
    imports: [
        MatTooltip
    ],
  templateUrl: './liste-amis.component.html',
  styleUrl: './liste-amis.component.sass'
})
export class ListeAmisComponent implements OnInit {

    amis!: WritableSignal<any>;

    constructor(private listeAmisService: ListeAmisService) {
        this.amis = listeAmisService.amis
    }

    ngOnInit() {
        this.listeAmisService.getAmis()
    }
}

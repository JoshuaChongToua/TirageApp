import {Component, Input} from '@angular/core';
import {Champion} from "../../../shared/interfaces/champion-interface";
import {environment} from "../../../../environment/environment.development";

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.sass',
})
export class InfoComponent {
    @Input() champion!: Champion;


    protected readonly environment = environment;
}

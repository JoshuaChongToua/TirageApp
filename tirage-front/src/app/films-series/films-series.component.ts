import { Component } from '@angular/core';
import {MainPageComponent} from "./main-page/main-page.component";

@Component({
  selector: 'app-films-series',
  standalone: true,
    imports: [
        MainPageComponent
    ],
  templateUrl: './films-series.component.html',
  styleUrl: './films-series.component.scss'
})
export class FilmsSeriesComponent {

}

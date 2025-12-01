import {Component, WritableSignal} from '@angular/core';
import {MainPageComponent} from "./main-page/main-page.component";
import {NavbarService} from "../navbar/services/navbar.service";

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

    showType!: WritableSignal<any>

    constructor(private navbarService: NavbarService) {
        this.showType = this.navbarService.showType
    }

    ngOnInit(): void {
        this.showType.set(true)
    }
}

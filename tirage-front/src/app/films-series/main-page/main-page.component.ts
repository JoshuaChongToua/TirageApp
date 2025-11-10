import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {MainPageService} from "./services/main-page.service";
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import {DetailService} from "../detail/services/detail.service";
import {DetailComponent} from "../detail/detail.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-main-page',
  standalone: true,
    imports: [
        DragScrollComponent,
        DragScrollItemDirective,
    ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.sass'
})
export class MainPageComponent implements OnInit {

    moviesGenre!: WritableSignal<any>
    selectedEvent: WritableSignal<any> = signal(null)

    constructor(private mainPageService: MainPageService, private dialog: MatDialog, private detailService: DetailService) {
        this.moviesGenre= this.mainPageService.moviesGenre;
        this.selectedEvent= this.mainPageService.selectedEvent;
    }

    ngOnInit() {
        this.mainPageService.getMovieFromthisGenre(27)
    }

    openDetail(event: any) {
        this.dialog.open(DetailComponent, {
            maxWidth: '1500px',
            maxHeight: '95vh',
            height: 'auto',
            data: {
                event: event,
            }
        });
    }
}

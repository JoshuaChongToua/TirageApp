import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {MainPageService} from "./services/main-page.service";
import {ListeTitresDragComponent} from "../../shared/components/liste-titres-drag/liste-titres-drag.component";
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import {DetailComponent} from "../detail/detail.component";
import {MatDialog} from "@angular/material/dialog";
import {ListeTitresComponent} from "../../shared/components/liste-titres/liste-titres.component";
import {DetailService} from "../detail/services/detail.service";


@Component({
  selector: 'app-main-page',
  standalone: true,
    imports: [
        ListeTitresDragComponent,
        DragScrollComponent,
        DragScrollItemDirective,
        ListeTitresComponent
    ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.sass'
})
export class MainPageComponent implements OnInit {

    moviesGenre!: WritableSignal<any>
    moviestrending!: WritableSignal<any>
    seriesTopRated!: WritableSignal<any>
    selectedType!: WritableSignal<any>
	lastTitles: WritableSignal<any> = signal(null)
    ongletToDisplay: WritableSignal<any> = signal('main')

    constructor(private mainPageService: MainPageService, private dialog: MatDialog, private detailService: DetailService) {
        this.moviesGenre = this.mainPageService.moviesGenre;
        this.moviestrending = this.mainPageService.moviestrending;
        this.selectedType = this.mainPageService.selectedType;
        this.seriesTopRated = this.mainPageService.seriesTopRated;
    }

    ngOnInit() {
        this.mainPageService.getMovieTrending()
        this.mainPageService.getSeriesTopRated()
		this.mainPageService.getLatestTitles().subscribe(data => {
			this.lastTitles.set(data)
		});
	}

    openDetail(event: any) {
        this.detailService.getDetailIdMainPage(event).subscribe({
            next: (data: any) => {
                this.dialog.open(DetailComponent, {
                    width: data.backdrop_path ? '780px' : '1500px',
                    maxWidth: '95vw',
                    maxHeight: '95vh',
                    height: 'auto',
                    data: { event: event }
                });
            }
        })
    }

    selectOnglet(name: string, idGenre: number | null = null) {
        if (idGenre) {
            this.mainPageService.getMovieFromthisGenre(idGenre)
        }
        if (this.ongletToDisplay() !== name) {
            this.ongletToDisplay.set(name)
        }
    }

    ngOnDestroy() {
        this.ongletToDisplay.set('main')
    }

}

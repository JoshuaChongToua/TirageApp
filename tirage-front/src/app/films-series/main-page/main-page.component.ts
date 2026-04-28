import {Component, effect, OnInit, signal, WritableSignal} from '@angular/core';
import {MainPageService} from "./services/main-page.service";
import {ListeTitresDragComponent} from "../../shared/components/liste-titres-drag/liste-titres-drag.component";
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import {DetailComponent} from "../detail/detail.component";
import {MatDialog} from "@angular/material/dialog";
import {ListeTitresComponent} from "../../shared/components/liste-titres/liste-titres.component";
import {DetailService} from "../detail/services/detail.service";
import {LoaderMovieComponent} from "../../shared/loader/loader-movie/loader-movie.component";


@Component({
    selector: 'app-main-page',
    imports: [
        ListeTitresDragComponent,
        DragScrollComponent,
        DragScrollItemDirective,
        ListeTitresComponent,
        LoaderMovieComponent
    ],
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.sass'
})
export class MainPageComponent implements OnInit {
    constructor(private mainPageService: MainPageService, private dialog: MatDialog, private detailService: DetailService) {
        effect(() => {
            if (this.selectedType() === "movie") {
                this.mainPageService.getLatestMovies();
                this.mainPageService.getMovieTrending();
                this.mainPageService.getMoviesPopular();
            }
            if (this.selectedType() === "tv") {
                this.mainPageService.getLatestSeries();
                this.mainPageService.getSeriesTopRated();
                this.mainPageService.getSeriesTrending();
                this.mainPageService.getSeriesPopular();
            }
        });
    }

    //Movies
    moviestrending: WritableSignal<any> = this.mainPageService.moviestrending
    moviesPopular : WritableSignal<any> = this.mainPageService.moviesPopular

    //
    selectedType: WritableSignal<any> = this.mainPageService.selectedType;
    ongletToDisplay: WritableSignal<any> = signal('main')
    titlesGenre: WritableSignal<any> = this.mainPageService.titlesGenre;

    //Series
    seriesTopRated: WritableSignal<any> = this.mainPageService.seriesTopRated;
    lastTitles: WritableSignal<any> = this.mainPageService.latestTitles
    seriestrending: WritableSignal<any> = this.mainPageService.seriestrending;
    seriesPopular: WritableSignal<any> = this.mainPageService.seriesPopular;

    //Loader
    latestTitlesLoader: WritableSignal<any> = this.mainPageService.latestTitlesLoader
    latestTitlesGenreLoader: WritableSignal<any> = this.mainPageService.latestTitlesGenreLoader


    ngOnInit() {
	}

    openDetail(event: any) {
        this.detailService.getDetailIdMainPage(event).subscribe({
            next: (data: any) => {
                this.dialog.open(DetailComponent, {
                    width: data.backdrop_path ? '780px' : '1500px',
                    maxWidth: '95vw',
                    maxHeight: '95vh',
                    height: 'auto',
                    data: { event: event },
                    autoFocus: false
                });
            }
        })
    }

    selectOnglet(name: string, idGenre: number | null = null) {
        if (idGenre) {
            this.mainPageService.getTitleFromthisGenre(idGenre)
        }
        if (this.ongletToDisplay() !== name) {
            this.ongletToDisplay.set(name)
        }
    }

    ngOnDestroy() {
        this.ongletToDisplay.set('main')
    }

}

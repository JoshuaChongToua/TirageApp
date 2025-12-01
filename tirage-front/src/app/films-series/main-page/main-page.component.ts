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
  standalone: true,
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

    //Movies
    moviestrending!: WritableSignal<any>
    moviesPopular !: WritableSignal<any>

    //
    selectedType!: WritableSignal<any>
    ongletToDisplay: WritableSignal<any> = signal('main')
    titlesGenre!: WritableSignal<any>

    //Series
    seriesTopRated!: WritableSignal<any>
    lastTitles!: WritableSignal<any>
    seriestrending!: WritableSignal<any>
    seriesPopular!: WritableSignal<any>

    //Loader
    latestTitlesLoader!: WritableSignal<any>
    latestTitlesGenreLoader!: WritableSignal<any>

    constructor(private mainPageService: MainPageService, private dialog: MatDialog, private detailService: DetailService) {
        this.moviestrending = this.mainPageService.moviestrending;
        this.moviesPopular = this.mainPageService.moviesPopular;

        this.selectedType = this.mainPageService.selectedType;

        this.seriesTopRated = this.mainPageService.seriesTopRated;
        this.seriestrending = this.mainPageService.seriestrending;
        this.seriesPopular = this.mainPageService.seriesPopular;

        this.lastTitles = this.mainPageService.latestTitles
        this.titlesGenre = this.mainPageService.titlesGenre;

        this.latestTitlesLoader = this.mainPageService.latestTitlesLoader
        this.latestTitlesGenreLoader = this.mainPageService.latestTitlesGenreLoader

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
        }, { allowSignalWrites: true });

    }

    ngOnInit() {
        this.mainPageService.getLatestMovies()
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

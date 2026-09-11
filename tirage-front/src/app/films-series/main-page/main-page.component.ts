import {Component, computed, effect, OnInit, signal, WritableSignal} from '@angular/core';
import {MainPageService} from "./services/main-page.service";
import {ListeTitresDragComponent} from "../../shared/components/liste-titres-drag/liste-titres-drag.component";
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import {DetailComponent} from "../detail/detail.component";
import {MatDialog} from "@angular/material/dialog";
import {ListeTitresComponent} from "../../shared/components/liste-titres/liste-titres.component";
import {DetailService} from "../detail/services/detail.service";
import {LoaderMovieComponent} from "../../shared/loader/loader-movie/loader-movie.component";
import {DecimalPipe} from "@angular/common";
import {MyListService} from "../my-account/my-list/services/my-list.service";


@Component({
    selector: 'app-main-page',
    imports: [
        ListeTitresDragComponent,
        DragScrollComponent,
        DragScrollItemDirective,
        ListeTitresComponent,
        LoaderMovieComponent,
        DecimalPipe
    ],
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.sass'
})
export class MainPageComponent implements OnInit {
    constructor(private mainPageService: MainPageService, private dialog: MatDialog, private detailService: DetailService, private myListService: MyListService) {
        effect(() => {
            if (this.selectedType() === "movie") {
                this.mainPageService.getLatestMovies();
                this.mainPageService.getMovieTrending();
                this.mainPageService.getMoviesPopular();
                this.myListService.getMyList()

            }
            if (this.selectedType() === "tv") {
                this.mainPageService.getLatestSeries();
                this.mainPageService.getSeriesTopRated();
                this.mainPageService.getSeriesTrending();
                this.mainPageService.getSeriesPopular();
                this.myListService.getMyList()

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
    listGenres: WritableSignal<any> = this.mainPageService.listGenres;

    //Series
    seriesTopRated: WritableSignal<any> = this.mainPageService.seriesTopRated;
    lastTitles: WritableSignal<any> = this.mainPageService.latestTitles
    seriestrending: WritableSignal<any> = this.mainPageService.seriestrending;
    seriesPopular: WritableSignal<any> = this.mainPageService.seriesPopular;

    //Loader
    latestTitlesLoader: WritableSignal<any> = this.mainPageService.latestTitlesLoader
    latestTitlesGenreLoader: WritableSignal<any> = this.mainPageService.latestTitlesGenreLoader
    loaderMyList: WritableSignal<any> = this.myListService.loaderMyList

    myList: WritableSignal<any> = this.myListService.myList

    protected readonly Math = Math;


    ngOnInit() {
        this.mainPageService.getGenresList()
        this.myListService.getMyList()
	}

    openDetail(event: any) {
        this.detailService.getDetailIdMainPage(event).subscribe({
            next: (data: any) => {
                this.dialog.open(DetailComponent, {
                    width: '80vw',
                    maxWidth: '90vw',
                    maxHeight: '90vh',
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

    getGenres(idGenre: any): any {
        return this.listGenres()?.find((genre: any) => genre.id === idGenre)?.name;
    }

    addToList(titre: any) {
        const type = titre.release_date ? "movie" : "tv"
        this.detailService.addToList(titre.id, type)
    }

    removeFromList(titre: any) {
        this.detailService.removeFromList(titre.id)
    }

    isAddedToMyList(titre: any) {
        return this.myList()?.find((item: any) => item.id === titre.id);
    }

    ngOnDestroy() {
        this.ongletToDisplay.set('main')
    }

}

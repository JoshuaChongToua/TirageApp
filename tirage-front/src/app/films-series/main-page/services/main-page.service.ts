import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environment/environment.development";
import {forkJoin} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

    constructor(private http: HttpClient) { }

    moviestrending : WritableSignal<any> = signal(null)
    moviesPopular : WritableSignal<any> = signal(null)

    notesAverage : WritableSignal<any> = signal(null)
    selectedType : WritableSignal<any> = signal('movie')

    seriesTopRated : WritableSignal<any> = signal(null)
    seriestrending : WritableSignal<any> = signal(null)
    seriesPopular : WritableSignal<any> = signal(null)

    latestTitles : WritableSignal<any> = signal(null)
    titlesGenre : WritableSignal<any> = signal(null)

    latestTitlesLoader : WritableSignal<any> = signal(false)
    latestTitlesGenreLoader : WritableSignal<any> = signal(false)



    getTitleFromthisGenre(idGenre: number): any {
        this.latestTitlesGenreLoader.set(true)
        const requetes = []
        const date = new Date().toISOString().split('T')[0];
        const dateFilter: any = this.selectedType() === 'movie' ? { 'primary_release_date.lte': date } : { 'first_air_date.lte': date };
        for (let i = 1; i <= 3; i++) {
            requetes.push(
                this.http.get("https://api.themoviedb.org/3/discover/" + this.selectedType(), {
                    params: {
                        api_key: environment.apiKey2,
                        language: 'fr-FR',
                        sort_by: 'vote_average.desc',
                        with_genres: idGenre,
                        page: i,
                        ...dateFilter,
                        'vote_count.gte': 50,
                    },
                })
            )
        }
        forkJoin(requetes).subscribe({
            next: (data: any) => {
                const res = data.flatMap((d: any) => d.results)
                    .sort((a: any, b: any) => b.vote_average - a.vote_average)
                this.latestTitlesGenreLoader.set(false)
                this.titlesGenre.set(res)
            }
        })
    }

    getMovieTrending(): any {
        this.http.get("https://api.themoviedb.org/3/trending/movie/day", {
            params: {
                api_key: environment.apiKey2,
                language: 'fr-FR',
                sort_by: 'release_date.desc',
                page: 1,
            },
        }).subscribe({
            next: (data: any) => {
                this.moviestrending.set(data.results);
            }
        })
    }

    getLatestMovies(): any {
        this.latestTitlesLoader.set(true)
        this.http.get(`https://api.themoviedb.org/3/movie/now_playing`, {
            params: {
                api_key: environment.apiKey2,
                language: 'fr-FR',
                page: 1
            }
        }).subscribe({
            next: (data: any) => {
                this.latestTitles.set(data.results);
                this.latestTitlesLoader.set(false)
            },
            error: (err: any) => {
                this.latestTitlesLoader.set(false)
            }
        })
    }

    getMoviesPopular(): any {
        this.http.get(`https://api.themoviedb.org/3/movie/popular`, {
            params: {
                api_key: environment.apiKey2,
                language: 'fr-FR',
                page: 1
            }
        }).subscribe({
            next: (data: any) => {
                this.moviesPopular.set(data.results);
            }
        })
    }



    getSeriesTopRated(): any {
        this.http.get("https://api.themoviedb.org/3/tv/top_rated", {
            params: {
                api_key: environment.apiKey2,
                language: 'fr-FR',
                sort_by: 'release_date.desc',
                page: 1,
            },
        }).subscribe({
            next: (data: any) => {
                this.seriesTopRated.set(data.results);
            }
        })
    }


    getLatestSeries(): any {
        this.latestTitlesLoader.set(true)
        this.http.get(`https://api.themoviedb.org/3/tv/on_the_air`, {
            params: {
                api_key: environment.apiKey2,
                language: 'fr-FR',
                page: 1
            }
        }).subscribe({
            next: (data: any) => {
                this.latestTitles.set(data.results);
                this.latestTitlesLoader.set(false)
            }
        })
    }

    getSeriesPopular(): any {
        this.http.get(`https://api.themoviedb.org/3/tv/popular`, {
            params: {
                api_key: environment.apiKey2,
                language: 'fr-FR',
                page: 1
            }
        }).subscribe({
            next: (data: any) => {
                this.seriesPopular.set(data.results);
            }
        })
    }

    getSeriesTrending(): any {
        this.http.get("https://api.themoviedb.org/3/trending/tv/day", {
            params: {
                api_key: environment.apiKey2,
                language: 'fr-FR',
                sort_by: 'release_date.desc',
                page: 1,
            },
        }).subscribe({
            next: (data: any) => {
                this.seriestrending.set(data.results);
            }
        })
    }


    getNoteAverageList(listId: any): any {
        this.http.post(environment.apiURL + "/api/getNoteAverageList", {titreId: listId}).subscribe({
            next: (data: any) => {
                this.notesAverage.set(data);
            }
        })
    }


}



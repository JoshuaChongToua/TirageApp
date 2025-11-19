import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environment/environment.development";
import {forkJoin, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

    constructor(private http: HttpClient) { }

    moviesGenre : WritableSignal<any> = signal(null)
    moviestrending : WritableSignal<any> = signal(null)
    notesAverage : WritableSignal<any> = signal(null)


    getMovieFromthisGenre(idGenre: number): any {
        this.http.get("https://api.themoviedb.org/3/discover/movie?api_key=" + environment.apiKey2 + "&with_genres=" + idGenre + "&language=fr-FR&sort_by=popularity.desc&page=1").subscribe({
            next: (data: any) => {
                this.moviesGenre.set(data.results);
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

    getLatestTitles() {
        const movies$ = this.http.get(
            `https://api.themoviedb.org/3/discover/movie`,
            {
                params: {
                    api_key: environment.apiKey2,
                    language: 'fr-FR',
                    sort_by: 'release_date.desc',
                    page: 1,
                },
            }
        );

        const series$ = this.http.get(
            `https://api.themoviedb.org/3/discover/tv`,
            {
                params: {
                    api_key: environment.apiKey2,
                    language: 'fr-FR',
                    sort_by: 'first_air_date.desc',
                    page: 1,
                },
            }
        );

        return forkJoin([movies$, series$]).pipe(
            map(([movies, series]: any) => {
                const formattedMovies = movies.results.map((m: any) => ({
                    ...m,
                    media_type: 'movie',
                    date: m.release_date
                }));

                const formattedSeries = series.results.map((s: any) => ({
                    ...s,
                    media_type: 'tv',
                    date: s.first_air_date
                }));

                return [...formattedMovies, ...formattedSeries]
                    .filter(t => t.date && t.backdrop_path)
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0,6)
            })
        );
    }

    getNoteAverageList(listId: any): any {
        this.http.post(environment.apiURL + "/api/getNoteAverageList", {titreId: listId}).subscribe({
            next: (data: any) => {
                this.notesAverage.set(data);
            }
        })
    }


}



import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environment/environment.development";
import {forkJoin} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

    constructor(private http: HttpClient) {
    }

    titres: WritableSignal<any> = signal(null)

    // (name: string): any {
    //     this.http.get("https://api.themoviedb.org/3/search/movie?api_key=" + environment.apiKey2 + "&query=" + name + "&language=fr-FR&sort_by=popularity.desc").subscribe({
    //         next: (data: any) => {
    //             this.titres.set(data.results);
    //         }
    //     })
    //     this.http.get("https://api.themoviedb.org/3/search/tv?api_key=" + environment.apiKey2 + "&query=" + name + "&language=fr-FR&sort_by=popularity.desc").subscribe({
    //         next: (data: any) => {
    //             this.titres.set(data.results);
    //         }
    //     })
    // }}

    getMovieAndSeriesByName(name: string) {
        const movie$ = this.http.get(`https://api.themoviedb.org/3/search/movie`, {
            params: {
                api_key: environment.apiKey2,
                query: name,
                language: 'fr-FR',
                sort_by: 'popularity.desc'
            }
        });

        const tv$ = this.http.get(`https://api.themoviedb.org/3/search/tv`, {
            params: {
                api_key: environment.apiKey2,
                query: name,
                language: 'fr-FR',
                sort_by: 'popularity.desc'
            }
        });

        forkJoin([movie$, tv$]).subscribe(([movies, tvs]: any) => {
            const results = [...movies.results, ...tvs.results];
            this.titres.set(results);
        });
    }
}



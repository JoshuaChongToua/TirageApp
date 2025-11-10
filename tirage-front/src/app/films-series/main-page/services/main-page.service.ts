import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environment/environment.development";

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

    constructor(private http: HttpClient) { }

    moviesGenre : WritableSignal<any> = signal(null)
    selectedEvent: WritableSignal<any> = signal(null)


    getMovieFromthisGenre(idGenre: number): any {
        this.http.get("https://api.themoviedb.org/3/discover/movie?api_key=" + environment.apiKey2 + "&with_genres=" + idGenre + "&language=fr-FR&sort_by=popularity.desc&page=1").subscribe({
            next: (data: any) => {
                this.moviesGenre.set(data.results);
                console.log(this.moviesGenre());
            }
        })
    }
}



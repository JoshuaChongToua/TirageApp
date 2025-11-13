import {Injectable, signal, WritableSignal} from '@angular/core';
import {environment} from "../../../../environment/environment.development";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DetailService {

    event : WritableSignal<any> = signal(null)
    noteAverage: WritableSignal<any> = signal(null)

    constructor(private http: HttpClient) { }

    getDetailId(id: number) {
        this.http.get("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + environment.apiKey2 + "&language=fr-FR").subscribe({
            next: (data: any) => {
                this.event.set(data);
            }
        })
    }

    getNoteAverage(id: number) {
        this.http.post(environment.apiURL + "/api/getNoteAverage", {titreId: id}).subscribe({
            next: (data: any) => {
                this.noteAverage.set(data);
            }
        })
    }
}

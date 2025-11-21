import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environment/environment.development";

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

    episodesDetails: WritableSignal<any> = signal(null)

    constructor(private http: HttpClient) { }

    getSaisonDetail(id: number, saisonNumber: number): any {
        this.http.get("https://api.themoviedb.org/3/tv/" + id + "/season/" + saisonNumber, {
            params: {
                api_key: environment.apiKey2,
                language: 'fr-FR',
                sort_by: 'release_date.desc',
                page: 1,
            },
        }).subscribe({
            next: (data: any) => {
                this.episodesDetails.set(data.episodes)
                console.log(this.episodesDetails())
            }
        })
    }
}

import {Injectable, signal, WritableSignal} from '@angular/core';
import {environment} from "../../../../environment/environment.development";
import {HttpClient} from "@angular/common/http";
import {MyListService} from "../../my-account/my-list/services/my-list.service";

@Injectable({
    providedIn: 'root'
})
export class DetailService {

    event: WritableSignal<any> = signal(null)
    noteAverage: WritableSignal<any> = signal(null)
    hasVoted: WritableSignal<any> = signal(null)
    reloadHasVoted: WritableSignal<any> = signal(false)
    images: WritableSignal<any> = signal(null)
    addedToList: WritableSignal<any> = signal(false)

    constructor(private http: HttpClient, private myListService: MyListService) {
    }

    getDetailId(titre: any) {
        const type = titre.release_date ? 'movie' : 'tv'

        this.http.get("https://api.themoviedb.org/3/" + type + "/" + titre.id + "?api_key=" + environment.apiKey2 + "&language=fr-FR").subscribe({
            next: (data: any) => {
                this.event.set(data);
                console.log(this.event());
            }
        })
    }

    getDetailIdMainPage(titre: any) {
        const type = titre.release_date ? 'movie' : 'tv'

        return this.http.get("https://api.themoviedb.org/3/" + type + "/" + titre.id + "?api_key=" + environment.apiKey2 + "&language=fr-FR")
    }

    getNoteAverage(id: number) {
        this.http.post(environment.apiURL + "/api/getNoteAverage", {titreId: id}).subscribe({
            next: (data: any) => {
                this.noteAverage.set(data);
            }
        })
    }

    getHasVoted(id: number) {
        this.http.post(environment.apiURL + "/api/hasVoted", {titreId: id}).subscribe({
            next: (data: any) => {
                this.hasVoted.set(data);
            }
        })
    }

    addToList(titre: number, type: string) {
        this.http.post(environment.apiURL + "/api/addToList", {titre_id: titre, type: type}).subscribe({
            next: (data: any) => {
                this.addedToList.set(true);
                this.myListService.getMyList()
            }
        })
    }

    removeFromList(titre: number) {
        this.http.post(environment.apiURL + "/api/removeFromList", {titre_id: titre}).subscribe({
            next: (data: any) => {
                this.addedToList.set(false);
                this.myListService.getMyList()
            }
        })
    }

    isAdded(titre: number) {
        this.http.post(environment.apiURL + "/api/isAdded", {titre_id: titre}).subscribe({
            next: (data: any) => {
                this.addedToList.set(!!data);
            }
        })
    }

    getImageMovie(id: number): any {
        this.http.get("https://api.themoviedb.org/3/movie/" + id + "/images", {
            params: {
                api_key: environment.apiKey2,
                language: 'fr-FR',
                sort_by: 'release_date.desc',
                page: 1,
            },
        }).subscribe({
            next: (data: any) => {
                this.images.set(data.posters)
            }
        })
    }

}

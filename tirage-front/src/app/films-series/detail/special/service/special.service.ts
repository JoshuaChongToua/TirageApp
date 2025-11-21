import {Injectable, signal, WritableSignal} from '@angular/core';
import {environment} from "../../../../../environment/environment.development";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SpecialService {

    videoYoutube: WritableSignal<any> = signal(null)

    constructor(private http: HttpClient) { }

    getTrailerMovie(id: number, type: string): any {
        this.videoYoutube.set(null)
        this.http.get("https://api.themoviedb.org/3/" + type + "/" + id + "/videos", {
            params: {
                api_key: environment.apiKey2,
                language: 'fr-FR',
                page: 1,
            },
        }).subscribe({
            next: (data: any) => {
                let videos = []
                for (const item of data.results) {
                    if (item.site.toLowerCase() === 'youtube') {
                        videos.push(item)
                    }
                }
                this.videoYoutube.set(videos)
            },
        })
    }
}

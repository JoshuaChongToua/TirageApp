import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environment/environment.development";
import {forkJoin} from "rxjs";
import {MainPageService} from "../../main-page/services/main-page.service";

@Injectable({
  providedIn: 'root'
})
export class SearchService {


    constructor(private http: HttpClient, private mainPageService: MainPageService) {
        this.selectedType = this.mainPageService.selectedType
    }

    titres: WritableSignal<any> = signal(null)
    selectedType!: WritableSignal<any>

    titresLoader: WritableSignal<any> = signal(false)

    getMoviesByName(name: string) {
        this.titresLoader.set(true)
        this.http.get(`https://api.themoviedb.org/3/search/movie`, {
            params: {
                api_key: environment.apiKey2,
                query: name,
                language: 'fr-FR',
            }
        })
        .subscribe({
            next: (data: any) => {
                this.titres.set(data.results);
                this.titresLoader.set(false)
            }
        });
    }

    getSeriesByName(name: string) {
        this.titresLoader.set(true)
        this.http.get(`https://api.themoviedb.org/3/search/tv`, {
            params: {
                api_key: environment.apiKey2,
                query: name,
                language: 'fr-FR',
            }
        })
        .subscribe({
            next: (data: any) => {
                this.titres.set(data.results);
                this.titresLoader.set(false)
            }
        });
    }
}



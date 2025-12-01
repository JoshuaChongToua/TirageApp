import {Injectable, signal, WritableSignal} from '@angular/core';
import {environment} from "../../../../../environment/environment.development";
import {HttpClient} from "@angular/common/http";
import {forkJoin} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MyListService {

    myList:WritableSignal<any> = signal(null)
    myListLimited:WritableSignal<any> = signal(null)

    constructor(private http: HttpClient) { }

    getMyList() {
        this.http.get(environment.apiURL + "/api/getMyList").subscribe({
            next: (data: any) => {
                const requests = data.map((titre:any) =>
                    this.http.get(`https://api.themoviedb.org/3/${titre.type}/${titre.titre_id}`,
                        {
                            params: {
                                api_key: environment.apiKey2,
                                language: 'fr-FR',
                            }
                        }
                    )
                );
                forkJoin(requests).subscribe({
                    next: (titresDetails: any) => {
                        this.myList.set(titresDetails);
                    }
                });
            }
        })
    }

    getMyListLimited() {
        this.http.get(environment.apiURL + "/api/getMyListLimited").subscribe({
            next: (data: any) => {
                const requests = data.map((titre:any) =>
                    this.http.get(`https://api.themoviedb.org/3/${titre.type}/${titre.titre_id}`,
                        {
                            params: {
                                api_key: environment.apiKey2,
                                language: 'fr-FR',
                            }
                        }
                    )
                );
                forkJoin(requests).subscribe({
                    next: (titresDetails: any) => {
                        this.myListLimited.set(titresDetails);
                    }
                });
            }
        })
    }
}

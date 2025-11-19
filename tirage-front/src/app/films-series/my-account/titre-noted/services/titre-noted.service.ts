import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environment/environment.development";
import {forkJoin} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TitreNotedService {

	titresNoted:WritableSignal<any> = signal(null)
	titresNotedLimited:WritableSignal<any> = signal(null)

	constructor(private http: HttpClient) { }

	getTitreNoted() {
		this.http.get(environment.apiURL + "/api/getTitreNoted").subscribe({
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
						this.titresNoted.set(titresDetails);
					}
				});
			}
		});
	}

	getTitreNotedLimited() {
		this.http.get(environment.apiURL + "/api/getTitreNotedLimited").subscribe({
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
						this.titresNotedLimited.set(titresDetails);
					}
				});
			}
		});
	}
}



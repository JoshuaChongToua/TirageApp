import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environment/environment.development";

@Injectable({
  providedIn: 'root'
})
export class AvisService {

    constructor(private http: HttpClient) { }

    notesAvisData : WritableSignal<any> = signal(null)

    getNoteAvis(titre: any) {
        this.http.post(environment.apiURL + '/api/getNotesAndAvis', {titre_id: titre.id}).subscribe({
            next: (data:any) => {
                this.notesAvisData.set(data);
            }
        })
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);
        const utcDate = new Date(Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate()
        ));
        const year = utcDate.getUTCFullYear();
        const month = String(utcDate.getUTCMonth() + 1).padStart(2, '0');
        const day = String(utcDate.getUTCDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    }
}

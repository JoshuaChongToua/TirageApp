import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.development';

@Injectable({
    providedIn: 'root'
})
export class MesPartiesService {
    users : any[] = []
    roleUser !: any

    constructor(private http: HttpClient) { }

    getParties(): Observable<any> {
        return this.http.get<any>(`${environment.apiURL}/api/mesParties`);
    }

    editPartie(id: number, partieData: any): Observable<any> {
        return this.http.put<any>(`${environment.apiURL}/api/mesParties/${id}/edit`, partieData);
    }

    quitterPartie(id: number): Observable<any> {
        return this.http.delete<any>(`${environment.apiURL}/api/mesParties/quitter/${id}`);
    }

    viewPartie(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiURL}/api/mesParties/view/${id}`)
    }

    tirage(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiURL}/api/mesParties/${id}/tirage`)
    }

    finPartie(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiURL}/api/mesParties/terminer/${id}`)
    }

    getRestrictions(id:number): Observable<any> {
        return this.http.get<any>(`${environment.apiURL}/api/mesParties/${id}/restrictions`);
    }
    addRestriction(id: number, restriction: any): Observable<any> {
        return this.http.put<any>(`${environment.apiURL}/api/mesParties/${id}/restriction/create`, restriction)
    }

    getUsersPartie(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiURL}/api/mesParties/view/${id}/restriction/getUsers`)
    }

    deleteRestriction(id: number, idRestriction:number): Observable<any> {
        return this.http.delete<any>(`${environment.apiURL}/api/mesParties/${id}/restriction/${idRestriction}`);
    }

    updateSouhaits(id: number, souhaits: any): Observable<any> {
        return this.http.put<any>(`${environment.apiURL}/api/mesParties/${id}/updateSouhaits`, souhaits)
    }

    getSouhaits(id: number, idUser: any): Observable<any> {
        return this.http.get<any>(`${environment.apiURL}/api/mesParties/souhaits/${id}/${idUser}`)
    }

    kick(id: number, idUser: number): Observable<any> {
        return this.http.delete<any>(`${environment.apiURL}/api/mesParties/view/${id}/${idUser}`);
    }



}

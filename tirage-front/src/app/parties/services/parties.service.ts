import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PartiesService {

  constructor(private http: HttpClient) { }

  // Obtenir la liste des parties
  getParties(): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/api/partie`);
  }

  // Rejoindre une partie
  rejoindrePartie(id: number, password?: { password: string }): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/api/partie/rejoindre/${id}`, password);
  }

  // Créer une partie
  createPartie(partieData: any): Observable<any> {
    console.log(partieData)
    return this.http.post<any>(`${environment.apiURL}/api/partie/create`, partieData);
  }

  viewPartie(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/api/partie/view/${id}`)
  }

  // Modifier une partie
  editPartie(id: number, partieData: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}/api/partie/${id}/edit`, partieData);
  }

  // Supprimer une partie
  deletePartie(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}/api/partie/${id}`);
  }

  // Quitter une partie
  quitterPartie(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}/api/partie/quitter/${id}`);
  }
}

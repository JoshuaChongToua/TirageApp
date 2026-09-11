import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Champion} from "../../shared/interfaces/champion-interface";
import {firstValueFrom, map, Observable, switchMap} from "rxjs";
import {LolData} from "../../shared/interfaces/lol-data-interface";
import {environment} from "../../../environment/environment.development";

@Injectable({
  providedIn: 'root',
})
export class LolService {

    private baseUrl = '/lol-api';

    constructor(private http: HttpClient) { }

    getChampions(): Observable<Champion[]> {
        return this.http.get<{ data: Record<string, Champion> }>(`${this.baseUrl}/cdn/${environment.lolVersion}/data/fr_FR/champion.json`)
            .pipe(map((response) => Object.values(response.data)));
    }

    getChampionDetails(id: string): Observable<Champion> {
        return this.http.get<{ data: Record<string, Champion> }>(`${this.baseUrl}/cdn/${environment.lolVersion}/data/fr_FR/champion/${id}.json`)
            .pipe(map((response) => response.data[id]));
    }
}


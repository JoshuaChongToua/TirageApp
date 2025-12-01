import {Injectable, signal, WritableSignal} from '@angular/core';
import {environment} from "../../../../environment/environment.development";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListeAmisService {

    amis: WritableSignal<any> = signal(null)

    constructor(private http: HttpClient) { }


    getAmis() {
        this.http.get(environment.apiURL + "/api/getAmis").subscribe({
            next: (data: any)=> {
                this.amis.set(data);
            }
        })
    }
}

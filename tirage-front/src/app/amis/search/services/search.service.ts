import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environment/environment.development";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

    users: WritableSignal<any> = signal(null)

    search(name: string){
        this.http.post(environment.apiURL + "/api/getUsers", {name : name}).subscribe({
            next: (data: any)=> {
                this.users.set(data)
            }
        })
    }

    sendDemande(id: number){
        this.http.post(environment.apiURL + "/api/demande/" + id, {}).subscribe({
            next: (data: any)=> {
                this.users().forEach((user: any) => {
                    if (user.id == id) {
                        user.demande = true;
                    }
                })
            }
        })
    }

    fakeDemande(){
        this.http.post(environment.apiURL + "/api/fakeDemande", {}).subscribe({
            next: (data: any)=> {

            }
        })
    }

    deleteDemande(id: number){
        this.http.post(environment.apiURL + "/api/deleteDemande", {receveur: id}).subscribe({
            next: (data: any)=> {
                this.users().forEach((user: any) => {
                    if (user.id == id) {
                        user.demande = false;
                    }
                })
            }
        })
    }
}

import {Injectable, signal, WritableSignal} from '@angular/core';
import {environment} from "../../../../environment/environment.development";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DemandeService {

    constructor(private http: HttpClient) { }

    demandes: WritableSignal<any> = signal(null)

    getDemandes(){
        this.http.get(environment.apiURL + "/api/getDemandes").subscribe({
            next: (data: any)=> {
                this.demandes.set(data);
            }
        })
    }

    addAmi(demandeId: number) {
        this.http.post(environment.apiURL + "/api/addAmi", {demande: demandeId}).subscribe({
            next: (data: any)=> {
                this.getDemandes();
            }
        })
    }

    refuserDemande(demandeurId: number) {
        this.http.post(environment.apiURL + "/api/refuserDemande", {demandeur: demandeurId}).subscribe({
            next: (data: any)=> {
                this.getDemandes();
            }
        })
    }

}

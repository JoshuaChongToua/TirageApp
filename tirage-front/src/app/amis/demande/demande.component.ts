import {Component, WritableSignal} from '@angular/core';
import {DemandeService} from "./services/demande.service";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-demande',
  standalone: true,
    imports: [
        MatTooltip
    ],
  templateUrl: './demande.component.html',
  styleUrl: './demande.component.sass'
})
export class DemandeComponent {

    demandes!: WritableSignal<any>

    constructor(private demandeService: DemandeService) {
        this.demandes = demandeService.demandes;
    }

    ngOnInit() {
        this.demandeService.getDemandes()
    }

    addAmi(demandeId: number) {
        this.demandeService.addAmi(demandeId)
    }

    refuserDemande(demandeurId: number) {
        this.demandeService.refuserDemande(demandeurId)
    }
}

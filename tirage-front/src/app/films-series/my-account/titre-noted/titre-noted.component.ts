import {Component, OnInit, WritableSignal} from '@angular/core';
import {TitreNotedService} from "./services/titre-noted.service";
import {ListeTitresComponent} from "../../../shared/components/liste-titres/liste-titres.component";
import {MyAccountService} from "../services/my-account.service";

@Component({
  selector: 'app-titre-noted',
  standalone: true,
	imports: [
		ListeTitresComponent
	],
  templateUrl: './titre-noted.component.html',
  styleUrl: './titre-noted.component.sass'
})
export class TitreNotedComponent implements OnInit {

	titresNoted!: WritableSignal<any>

	constructor(private titreNotedService: TitreNotedService, private myAccountService: MyAccountService) {
		this.titresNoted = this.titreNotedService.titresNoted
	}

	ngOnInit() {
		this.titreNotedService.getTitreNoted()
	}

	changeOnglet(onglet: string) {
		this.myAccountService.changeOnglet(onglet);
	}

	ngOnDestroy() {
		this.myAccountService.changeOnglet('my-account');
	}

}

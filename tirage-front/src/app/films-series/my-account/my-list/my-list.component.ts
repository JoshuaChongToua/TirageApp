import {Component, OnDestroy, OnInit, WritableSignal} from '@angular/core';
import {MyListService} from "./services/my-list.service";
import {MyAccountService} from "../services/my-account.service";
import {ListeTitresComponent} from "../../../shared/components/liste-titres/liste-titres.component";

@Component({
  selector: 'app-my-list',
  standalone: true,
	imports: [
		ListeTitresComponent
	],
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.sass'
})
export class MyListComponent implements OnInit, OnDestroy {

	mylist!: WritableSignal<any>

	constructor(private myListService: MyListService, private myAccountService: MyAccountService) {
		this.mylist = this.myListService.myList
	}

	ngOnInit() {
		this.myListService.getMyList()
	}

	changeOnglet(onglet: string) {
		this.myAccountService.changeOnglet(onglet);
	}

	ngOnDestroy() {
		this.myAccountService.changeOnglet('my-account');
	}

}

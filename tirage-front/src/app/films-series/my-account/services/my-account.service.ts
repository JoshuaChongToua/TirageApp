import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {
	ongletToDisplay: WritableSignal<any> = signal("my-account")

  	constructor() { }


	changeOnglet(onglet: string) {
		this.ongletToDisplay.set(onglet);
	}
}

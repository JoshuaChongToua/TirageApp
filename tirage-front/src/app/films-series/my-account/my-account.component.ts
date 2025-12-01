import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {MyListComponent} from "./my-list/my-list.component";
import {TitreNotedComponent} from "./titre-noted/titre-noted.component";
import {ListeTitresDragComponent} from "../../shared/components/liste-titres-drag/liste-titres-drag.component";
import {TitreNotedService} from "./titre-noted/services/titre-noted.service";
import {MyListService} from "./my-list/services/my-list.service";
import {MyAccountService} from "./services/my-account.service";
import {LoginService} from "../../login/services/login.service";
import {Observable} from "rxjs";
import {NavbarService} from "../../navbar/services/navbar.service";

@Component({
    selector: 'app-my-account',
    standalone: true,
    imports: [
        ListeTitresDragComponent,
        TitreNotedComponent,
        MyListComponent
    ],
    templateUrl: './my-account.component.html',
    styleUrl: './my-account.component.sass'
    })
export class MyAccountComponent implements OnInit {

    titresNotedLimited!: WritableSignal<any>
    myListLimited!: WritableSignal<any>
    ongletToDisplay!: WritableSignal<any>
    showType!: WritableSignal<any>
    currentUser!: Observable<any>
    user!: any

    constructor(private loginService: LoginService, private titreNotedService: TitreNotedService, private myListService: MyListService, private myAccountService: MyAccountService, private navbarService: NavbarService) {
        this.titresNotedLimited = titreNotedService.titresNotedLimited
        this.myListLimited = myListService.myListLimited
        this.ongletToDisplay = myAccountService.ongletToDisplay
        this.currentUser = this.loginService.userConnected$
        this.showType = this.navbarService.showType
    }

    ngOnInit() {
        this.titreNotedService.getTitreNotedLimited()
        this.myListService.getMyListLimited()
        this.currentUser.subscribe(u => {
            if (u) {
                this.user = u
            }
        })
        this.showType.set(true)
    }

    changeOnglet(onglet: string) {
        this.myAccountService.changeOnglet(onglet);
    }
}

import {Component, OnInit, WritableSignal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/services/login.service';
import {MainPageService} from "../films-series/main-page/services/main-page.service";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {
    MatExpansionModule,
    MatExpansionPanel,
} from "@angular/material/expansion";
import {NavbarService} from "./services/navbar.service";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, CommonModule, MatMenuTrigger, MatMenu, MatMenuItem, MatExpansionPanel, MatExpansionModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.sass'
})
export class NavbarComponent implements OnInit {
    currentUser!: Observable<any>
    user!: any
    isLoggedIn: boolean = false

    selectedType!: WritableSignal<any>
    showType!: WritableSignal<any>

    constructor(private loginService: LoginService, private router: Router, private mainPageService: MainPageService, private navbarService: NavbarService) {
        this.currentUser = this.loginService.userConnected$
        this.selectedType = this.mainPageService.selectedType
        this.showType = this.navbarService.showType
    }

    ngOnInit(): void {
        this.loginService._isLogged$.subscribe(loggedIn => {
            this.isLoggedIn = loggedIn;
        });
        this.currentUser.subscribe(u => {
        if (u) {
                this.user = u
            }
        })
    }

    selectType(type: string) {
        if (type != this.selectedType()) {
            this.selectedType.set(type)
        }
    }


    logout() {
        this.loginService.logout()
        this.router.navigateByUrl('/login')
        this.isLoggedIn = false
    }
}

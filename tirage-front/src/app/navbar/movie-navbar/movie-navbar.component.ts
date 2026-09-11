import {Component, HostListener, WritableSignal} from '@angular/core';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {LoginService} from "../../login/services/login.service";
import {MainPageService} from "../../films-series/main-page/services/main-page.service";
import {NavbarService} from "../services/navbar.service";
import {Observable} from "rxjs";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-movie-navbar',
    imports: [
        MatMenu,
        MatMenuItem,
        RouterLink,
        RouterLinkActive,
        NgClass,
        MatMenuTrigger
    ],
  templateUrl: './movie-navbar.component.html',
  styleUrl: './movie-navbar.component.sass',
})
export class MovieNavbarComponent {
    constructor(private loginService: LoginService, private router: Router, private mainPageService: MainPageService, private navbarService: NavbarService) {
        this.currentUser = this.loginService.userConnected$
        this.selectedType = this.mainPageService.selectedType
        this.showType = this.navbarService.showType
    }

    currentUser!: Observable<any>
    user!: any
    isLoggedIn: boolean = false

    selectedType!: WritableSignal<any>
    showType!: WritableSignal<any>

    isNavbarVisible = true;
    lastScrollPosition = 0;

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


    @HostListener('window:scroll', [])
    onWindowScroll() {
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        // Si on scroll vers le bas : on cache la navbar
        this.isNavbarVisible = !(currentScrollPosition > this.lastScrollPosition && currentScrollPosition > 50);

        this.lastScrollPosition = currentScrollPosition;
    }
}

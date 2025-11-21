import {Component, signal, WritableSignal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/services/login.service';
import {MainPageService} from "../films-series/main-page/services/main-page.service";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.sass'
})
export class NavbarComponent {
    currentUser!: Observable<any>
    user!: any
    userId!: number
    userName !: string
    email !: any
    isLoggedIn: boolean = false

    // selectedType!: WritableSignal<any>

    constructor(private loginService: LoginService, private router: Router, private mainPageService: MainPageService) {
        this.currentUser = this.loginService.userConnected$
        // this.selectedType = this.mainPageService.selectedType
    }

    ngOnInit(): void {
        this.loginService._isLogged$.subscribe(loggedIn => {
            this.isLoggedIn = loggedIn;
        });
        this.currentUser.subscribe(u => {
            if (u) {
                this.userId = u.id
                this.email = u.email
                this.userName = u.name
            }
        })
    }

    // selectType(type: string) {
    //     if (type != this.selectedType()) {
    //         this.selectedType.set(type)
    //     }
    // }


    logout() {
        this.loginService.logout()
        this.router.navigateByUrl('/login')
        this.isLoggedIn = false
    }
}

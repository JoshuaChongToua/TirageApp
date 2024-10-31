import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/services/login.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    currentUser!: Observable<any>
    user!: any
    userId!: number
    userName !: string
    email !: any
    isLoggedIn: boolean = false
    constructor(private loginService: LoginService, private router: Router) {
        this.currentUser = this.loginService.userConnected$
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

    logout() {
        this.loginService.logout()
        this.router.navigateByUrl('/login')
        this.isLoggedIn = false
    }
}

import {inject, Injectable} from '@angular/core';
import {CanActivate, CanActivateFn, Router} from '@angular/router';
import { LoginService } from './login/services/login.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) { }



    canActivate(): boolean {
        if (this.loginService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}

export function isLogged(): CanActivateFn {
    return () => {
        const oauthService: LoginService = inject(LoginService);
        const router: Router = inject(Router);
        if (oauthService.isTokenExpire()) {

            router.navigate(['/login']);
            oauthService._isLogged$.next(false)
            return false;
        }
        oauthService._isLogged$.next(true)
        return true;
    }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environment/environment.development';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interface/user.interface';

@Injectable({
    providedIn: 'root',
})
export class LoginService {

    public _isLogged$ = new BehaviorSubject<boolean>(false)
    get isLogged$() {
        return this._isLogged$.asObservable()
    }

    public _userConnected$ = new BehaviorSubject<any | null>(null)
    get userConnected$() {
        return this._userConnected$.asObservable()
    }
    constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {
        const token = sessionStorage.getItem('token-auth');
        this._isLogged$.next(!!token);
        this.loadUserFromToken();

    }

    public userInfo: any;

    sendCredentials(credentials: any) {
        const infosLog = { email: credentials.email, password: credentials.password }
        const headers = { 'Content-type': 'application/json' }

        this.http.post(environment.apiURL + '/api/login_check', infosLog, { headers }).subscribe({
            next: (data: any) => {
                sessionStorage.setItem('token-auth', data.token);
                console.log("Connecté", data);
                this.getConnectedUser()
                this._isLogged$.next(true)
                this.router.navigateByUrl('/')
            },
            error: (err: any) => {
                console.log("Errrrrrrrreeeeeeurrrr", err)
                this._isLogged$.next(false)
            }
        });
    }

    private loadUserFromToken() {
        const token = sessionStorage.getItem('token-auth');
        if (token) {
            this.getConnectedUser();  // Appelle getConnectedUser pour actualiser les données utilisateur
        }
    }

    logout() {
        sessionStorage.removeItem('token-auth');
        this._isLogged$.next(false)
        this._userConnected$.next(null)
        //this.router.navigateByUrl('/login')
    }

    login(token: string) {
        sessionStorage.setItem('token-auth', token);
        this._isLogged$.next(true);  // Utilisateur connecté
    }

    // Vérifie si le token est expiré
    isTokenExpire() {
        return this.jwtHelper.isTokenExpired(sessionStorage.getItem('token-auth'));
    }

    isLoggedIn() {
        if (this.isTokenExpire() == false) {
            return true;
        } else {
            return false;
        }
    }

    // Méthode pour obtenir le token
    private getToken(): string {
        return sessionStorage.getItem('token-auth') || ''; // Assurez-vous d'avoir une valeur par défaut
    }

    getConnectedUser() {
        this.http.get<User>(environment.apiURL + '/api/userConnected').subscribe({
            next: (value: User) => {
                this._userConnected$.next(value)
            }, error: (e: Error) => {
                console.log(e.message)
            }
        })
    }



}

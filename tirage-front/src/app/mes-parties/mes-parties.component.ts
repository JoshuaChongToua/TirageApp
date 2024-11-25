import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../login/services/login.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MesPartiesService } from './services/mes-parties.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
    selector: 'app-mes-parties',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, CommonModule, LoaderComponent],
    templateUrl: './mes-parties.component.html',
    styleUrl: './mes-parties.component.scss'
})
export class MesPartiesComponent implements OnInit {
    mesParties: any[] = []

    currentUser!: Observable<any>
    userId !: any

    constructor(private mesPartiesService: MesPartiesService, private loginService: LoginService, private router: Router) {
        this.currentUser = this.loginService.userConnected$
    }

    private _isMesPartiesLoading$ = new BehaviorSubject<boolean>(false)
    get _isMesPartiesLoading() {
        return this._isMesPartiesLoading$.asObservable()
    }


    ngOnInit(): void {
        this._isMesPartiesLoading$.next(true)
        this.currentUser.subscribe(u => {
            if (u) {
                this.userId = u.id
            }
        })
        this.mesPartiesService.getParties().subscribe({
            next: (data) => {
                console.log(data)
                this.mesParties = data.parties;
                this._isMesPartiesLoading$.next(false)
            },
            error: (err) => {
                this._isMesPartiesLoading$.next(false)
                console.error('Erreur lors de la récupération des parties', err);
            }
        });
    }

    quitter(id: number) {
        this.mesPartiesService.quitterPartie(id).subscribe({
            next: () => {
                console.log("Partie Quittée")
                this.mesPartiesService.getParties().subscribe({
                    next: (data) => {
                        this.mesParties = data.parties;
                    },
                    error: (err) => {
                        console.error('Erreur lors de la récupération des parties', err);
                    }
                });
            },
            error: (error) => {
                console.error("Erreur lors de la suppression :", error);
            }
        });
    }
}

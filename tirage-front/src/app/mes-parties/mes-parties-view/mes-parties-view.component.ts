import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { PartiesService } from '../../parties/services/parties.service';
import { LoginService } from '../../login/services/login.service';
import { MesPartiesService } from '../services/mes-parties.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-mes-parties-view',
    standalone: true,
    imports: [CommonModule, MatProgressSpinner, RouterLink, RouterLinkActive],
    templateUrl: './mes-parties-view.component.html',
    styleUrl: './mes-parties-view.component.scss'
})
export class MesPartiesViewComponent implements OnInit {
    currentUser!: Observable<any>
    userId !: any
    partieId!: number

    partie !: any
    partiesRejoints: any[] = []
    users: any[] = []
    tirageResultats: any[] = []
    tirages: any[] = []
    roleUser: any
    restrictions: any[] = []
    toto: boolean = true

    constructor(private route: ActivatedRoute, private mesPartiesServices: MesPartiesService, private loginService: LoginService) {
        this.currentUser = this.loginService.userConnected$
    }
    mesParties!: Observable<any>

    ngOnInit(): void {
        this.currentUser.subscribe(u => {
            if (u) {
                this.userId = u.id
            }
        })
        const idParam = this.route.snapshot.paramMap.get('id') || "";
        this.partieId = parseInt(idParam);
        this.mesParties = this.mesPartiesServices.viewPartie(this.partieId)
        this.mesPartiesServices.viewPartie(this.partieId).subscribe({
            next: (data) => {
                this.partie = data.partie;
                this.partiesRejoints = data.parties;
                let valide = false
                for (let partieR of this.partiesRejoints) {
                    this.users.push(partieR.user);
                    if (this.mesPartiesServices.users.length < this.users.length ) {
                        this.mesPartiesServices.users.push(partieR.user)
                    }
                    this.partie = partieR.partie.name
                    if (partieR.user.id == this.userId) {
                        this.roleUser = partieR.role
                        this.mesPartiesServices.roleUser = this.roleUser
                    }
                    if (!valide) {
                        for (let tirage of partieR.partie.tirageResultats) {
                            this.tirageResultats.push(tirage);
                        }
                        valide = true
                    }
                }
                // this.tirages = data.tirages;
                // this.roleUser = data.util;
                // this.restrictions = data.restrictions;
            },
            error: (err) => {
                console.error('Erreur lors de la récupération des parties-view', err);
            }
        });

        this.mesPartiesServices.getRestrictions(this.partieId).subscribe({
            next: (data) => {
                console.log(data)
                this.restrictions.push(...data.restrictions)
                console.log(this.restrictions)
            }
        });

        console.log(this.users)
    }

    tirage(id: number) {
        this.mesPartiesServices.tirage(id).subscribe({
            next: () => {
                console.log("Tirage reussi")
                this.mesPartiesServices.viewPartie(this.partieId).subscribe({
                    next: (data) => {
                        this.partie = data.partie;
                        this.partiesRejoints = data.parties;
                        let valide = false
                        for (let partieR of this.partiesRejoints) {
                            if (!valide) {
                                for (let tirage of partieR.partie.tirageResultats) {
                                    this.tirageResultats.push(tirage);
                                    valide = true
                                }
                            }
                        }
                        // this.tirages = data.tirages;
                        // this.roleUser = data.util;
                        // this.restrictions = data.restrictions;
                    },
                    error: (err) => {
                        console.error('Erreur lors de la récupération des parties-view', err);
                    }
                });
            },
            error: (err: Error) => {
                console.log(err.message)
            }
        })
    }

    finPartie(id: number) {
        this.mesPartiesServices.finPartie(id).subscribe({
            next: () => {
                console.log("fin reussi")
                this.mesPartiesServices.viewPartie(this.partieId).subscribe({
                    next: (data) => {
                        this.partie = data.partie;
                        this.partiesRejoints = data.parties;
                        this.tirageResultats = [];
                        // this.tirages = data.tirages;
                        // this.roleUser = data.util;
                        // this.restrictions = data.restrictions;
                    },
                    error: (err) => {
                        console.error('Erreur lors de la récupération des parties-view', err);
                    }
                });
            },
            error: (err: Error) => {
                console.log(err.message)
            }
        })
    }

    kick(idUser: number) {
        this.mesPartiesServices.kick(this.partieId, idUser).subscribe({
            next:()=> {
                console.log("Exclusion reussi")
                this.mesPartiesServices.viewPartie(this.partieId).subscribe({
                    next: (data) => {
                        this.partie = data.partie;
                        this.partiesRejoints = data.parties;
                        let valide = false
                        for (let partieR of this.partiesRejoints) {
                            if (!valide) {
                                for (let tirage of partieR.partie.tirageResultats) {
                                    this.tirageResultats.push(tirage);
                                    valide = true
                                }
                            }
                        }
                        // this.tirages = data.tirages;
                        // this.roleUser = data.util;
                        // this.restrictions = data.restrictions;
                    }
                })
            },
            error:(err)=>{
                console.log(err)
            }
        })
    }
}

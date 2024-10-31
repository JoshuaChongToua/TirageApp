import { PartieRejoint } from './../parties-rejoints/interface/partieRejoint.interface';
import { Component, OnInit } from '@angular/core';
import { PartiesService } from './services/parties.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../login/services/login.service';
import { Observable } from 'rxjs';
import { Partie } from './interface/partie.interface';

@Component({
    selector: 'app-parties',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './parties.component.html',
    styleUrls: ['./parties.component.scss']
})
export class PartiesComponent implements OnInit {

    parties: any[] = [];
    partiesRejoints: any[] = [];
    userId !: any
    currentUser!: Observable<any>

    constructor(private partiesService: PartiesService, private loginService: LoginService, private router: Router) {
        this.currentUser = this.loginService.userConnected$
    }

    ngOnInit(): void {
        this.currentUser.subscribe(u => {
            if (u) {
                this.userId = u.id
            }
        })
        this.partiesService.getParties().subscribe({
            next: (data) => {
                this.parties = data.parties;
                for (let partieR of data.parties) {
                    for (let partieRejoint of partieR.partieRejoints) {
                        partieRejoint.partieId = partieR.id
                    }
                    this.partiesRejoints.push(...partieR.partieRejoints)

                }
                this.parties.forEach(partie => {
                    const joinedPartie = this.partiesRejoints.find(
                        partieRejoint => partieRejoint.partieId === partie.id && partieRejoint.user.id === this.userId
                    );

                    partie.hasJoined = !!joinedPartie;
                    partie.partieRejointId = joinedPartie ? joinedPartie.id : null;
                });
            },
            error: (err) => {
                console.error('Erreur lors de la récupération des parties', err);
            }
        });


    }

    deletePartie(id: number) {
        this.partiesService.deletePartie(id).subscribe({
            next: () => {
                console.log("Partie Supprimée")
                this.partiesService.getParties().subscribe({
                    next: (data) => {
                        this.refreshParties()
                    },
                    error: (error) => {
                        console.error("Erreur lors de la récupération des parties :", error);
                    }
                })
            },
            error: (error) => {
                console.error("Erreur lors de la suppression :", error);
            }
        });
    }

    rejoindre(id: number) {
        this.partiesService.rejoindrePartie(id, { password: '' }).subscribe({
            next: () => {
                console.log("Partie Rejointe")
                this.partiesService.getParties().subscribe({
                    next: () => {
                        this.refreshParties()
                    },
                    error: (error) => {
                        console.error("Erreur lors de la récupération des parties :", error);
                    }
                })
            },
            error: (error) => {
                console.error("Erreur lors de la connexion à la partie :", error);
            }
        })
    }

    // partie.component.ts
    handleRejoindre(partie: any): void {
        if (!partie.password) {
            this.rejoindre(partie.id)
        } else {
            this.router.navigateByUrl('/parties/rejoindre/' + partie.id);
        }
    }

    quitter(id: number) {
        this.partiesService.quitterPartie(id).subscribe({
            next: () => {
                console.log("Partie Quittée")
                this.parties.forEach(partie => {
                    if (partie.partieRejointId === id) {
                        partie.hasJoined = false;
                        partie.partieRejointId = null;
                    }
                });
            },
            error: (error) => {
                console.error("Erreur lors de la suppression :", error);
            }
        });
    }

    refreshParties(): void {
        this.partiesService.getParties().subscribe({
            next: (data) => {
                for (let partieR of data.parties) {
                    for (let partieRejoint of partieR.partieRejoints) {
                        partieRejoint.partieId = partieR.id
                    }
                    this.partiesRejoints.push(...partieR.partieRejoints)
                }
                this.parties.forEach(partie => {
                    const joinedPartie = this.partiesRejoints.find(
                        partieRejoint => partieRejoint.partieId === partie.id && partieRejoint.user.id === this.userId
                    );

                    partie.hasJoined = !!joinedPartie;
                    partie.partieRejointId = joinedPartie ? joinedPartie.id : null;
                });
            },
            error: (err) => {
                console.error('Erreur lors de la récupération des parties', err);
            }
        });
    }

}

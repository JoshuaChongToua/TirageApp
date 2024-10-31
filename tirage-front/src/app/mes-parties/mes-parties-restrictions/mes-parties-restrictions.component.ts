import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MesPartiesService } from '../services/mes-parties.service';
import { LoginService } from '../../login/services/login.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-mes-parties-restrictions',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule, FormsModule, RouterLink, RouterLinkActive],
    templateUrl: './mes-parties-restrictions.component.html',
    styleUrl: './mes-parties-restrictions.component.scss'
})
export class MesPartiesRestrictionsComponent implements OnInit {

    userId !: any
    currentUser!: Observable<any>
    users: any[] = []
    partieId !: any
    constructor(private route: ActivatedRoute, private mesPartiesServices: MesPartiesService, private loginService: LoginService, private fb: FormBuilder, private router:Router) {
        this.currentUser = this.loginService.userConnected$
    }

    restrictionForm !: FormGroup

    restrictions : any[] = []
    roleUser !: any

    ngOnInit(): void {
        const idParam = this.route.snapshot.paramMap.get('id') || "";
        this.partieId = parseInt(idParam);
        this.currentUser.subscribe(u => {
            if (u) {
                this.userId = u.id
            }
        })
        this.roleUser = this.mesPartiesServices.roleUser
        console.log(this.users)

        this.mesPartiesServices.getRestrictions(this.partieId).subscribe({
            next:(data) => {
                this.restrictions = data.restrictions
                console.log(this.restrictions)
            }
        })

        this.mesPartiesServices.getUsersPartie(this.partieId).subscribe({
            next:(data) => {
                this.users = data.users
                this.roleUser = data.role[0].role
                console.log(this.roleUser)
            }
        })

        this.restrictionForm = this.fb.group({
            joueur: [null, [Validators.required]],
            interdit: [null, [Validators.required]],
        });
    }


    sendRestritionForm() {
        if (this.restrictionForm.valid) {
            const restrictionData = {
                joueur: this.restrictionForm.value.joueur,
                interdit: this.restrictionForm.value.interdit
            };
            console.log(restrictionData)
            this.mesPartiesServices.addRestriction(this.partieId, restrictionData).subscribe({
                next: () => {
                    console.log('Restriction ajoutée avec succès');
                    this.mesPartiesServices.getRestrictions(this.partieId).subscribe({
                        next: (data) => {
                            this.restrictions = data.restrictions
                        }
                    })
                },
                error: (err) => {
                    console.error('Erreur lors de l ajout de la restriction', err);
                }
            });
        }
    }

    deleteRestriction(id: number, idRestriction: number) {
        this.mesPartiesServices.deleteRestriction(id, idRestriction).subscribe({
            next: () => {
                console.log("Restriction supprimée")
                this.mesPartiesServices.getRestrictions(this.partieId).subscribe({
                    next: (data) => {
                        this.restrictions = data.restrictions;
                    },
                    error: (err) => {
                        console.error('Erreur lors de la récupération des parties-view', err);
                    }
                });
            }
        })
    }

}

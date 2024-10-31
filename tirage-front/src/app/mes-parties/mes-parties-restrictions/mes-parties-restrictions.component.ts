import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MesPartiesService } from '../services/mes-parties.service';
import { LoginService } from '../../login/services/login.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-mes-parties-restrictions',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule, FormsModule],
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


    ngOnInit(): void {
        const idParam = this.route.snapshot.paramMap.get('id') || "";
        this.partieId = parseInt(idParam);
        this.currentUser.subscribe(u => {
            if (u) {
                this.userId = u.id
            }
        })
        this.users = this.mesPartiesServices.users
        console.log(this.users)

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
                    this.router.navigateByUrl('/mesParties/view/' + this.partieId)
                },
                error: (err) => {
                    console.error('Erreur lors de l ajout de la restriction', err);
                }
            });
        }
    }

}

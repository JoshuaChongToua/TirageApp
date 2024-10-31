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
    templateUrl: './mes-parties-souhaits.component.html',
    styleUrl: './mes-parties-souhaits.component.scss'
})
export class MesPartiesSouhaitsComponent implements OnInit {

    userId !: any
    currentUser!: Observable<any>
    users: any[] = []
    partieId !: any
    constructor(private route: ActivatedRoute, private mesPartiesServices: MesPartiesService, private loginService: LoginService, private fb: FormBuilder, private router: Router) {
        this.currentUser = this.loginService.userConnected$
    }

    souhaitForm !: FormGroup
    oldSouhaits : any[] = []
    souhaits : any[] = []
    newSouhait !: string

    ngOnInit(): void {
        const idParam = this.route.snapshot.paramMap.get('id') || "";
        this.partieId = parseInt(idParam);
        this.currentUser.subscribe(u => {
            if (u) {
                this.userId = u.id
            }
        })

        this.mesPartiesServices.getSouhaits(this.partieId, this.userId).subscribe({
            next: (data)=>{
                this.oldSouhaits = data.souhaits
                console.log(this.oldSouhaits)
                for (let souhait of this.oldSouhaits) {
                    if (Array.isArray(souhait.souhaits)) {
                        for (let valeur of souhait.souhaits) {
                            this.souhaits.push(valeur);
                        }
                    }
                }
                console.log(this.souhaits)
            },
            error: (err)=> {
                console.log(err)
            }
        })



        this.souhaitForm = this.fb.group({
            souhaits: [""]
        });
    }

    addListSouhait() {
        const newSouhait = this.souhaitForm.get('souhaits')?.value;
        if (newSouhait) {
            this.souhaits.push(newSouhait);
            this.souhaitForm.reset();
            console.log(this.souhaits)
        }
        if (this.souhaitForm.valid) {
            console.log(this.souhaits)
            this.mesPartiesServices.updateSouhaits(this.partieId, this.souhaits).subscribe({
                next: () => {
                    console.log('souhaits ajoutée avec succès');
                },
                error: (err) => {
                    console.error('Erreur lors de l ajout des souhaits', err);
                }
            });
        }
    }

    deleteSouhait(id: number) {
        this.souhaits.splice(id,1)
        if (this.souhaitForm.valid) {
            console.log(this.souhaits)
            this.mesPartiesServices.updateSouhaits(this.partieId, this.souhaits).subscribe({
                next: () => {
                    console.log('souhaits ajoutée avec succès');
                },
                error: (err) => {
                    console.error('Erreur lors de l ajout des souhaits', err);
                }
            });
        }
    }

}

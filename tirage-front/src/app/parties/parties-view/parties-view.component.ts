import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PartiesService } from '../services/parties.service';
import { LoginService } from '../../login/services/login.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-parties-view',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './parties-view.component.html',
    styleUrl: './parties-view.component.scss'
})
export class PartiesViewComponent {
    partieId: number | null = null;
    partie: any
    users: any[] = []
    partiesRejoints: any[] = []
    currentUser!: Observable<any>
    userId !: any

    constructor(private route: ActivatedRoute, private partiesService: PartiesService, private loginService: LoginService) {
        this.currentUser = this.loginService.userConnected$
    }

    ngOnInit(): void {
        const idParam = this.route.snapshot.paramMap.get('id') || "";
        this.partieId = parseInt(idParam);
        this.partiesService.viewPartie(this.partieId).subscribe({
            next: (data) => {
                console.log(data.parties)
                this.partiesRejoints.push(...data.parties);
                console.log(this.partiesRejoints)
                for (let partie of this.partiesRejoints) {
                    this.users.push(partie.user);
                }
                console.log(this.users)
            },
            error: (err) => {
                console.error('Erreur lors de la récupération des parties-view', err);
            }
        });
        this.currentUser.subscribe(u => {
            if (u) {
                this.userId = u.id
            }
        })
    }


}

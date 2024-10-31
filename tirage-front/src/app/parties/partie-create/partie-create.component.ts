import { Component } from '@angular/core';
import { LoginService } from '../../login/services/login.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importez ReactiveFormsModule ici
import { CommonModule } from '@angular/common';
import { PartiesService } from '../services/parties.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-partie-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Ajoutez ReactiveFormsModule ici
  templateUrl: './partie-create.component.html',
  styleUrl: './partie-create.component.scss'
})
export class PartieCreateComponent {
  userId !: any
  currentUser!: Observable<any>
  errorMessage: string | null = null;
  partyName !: string

  partieForm !: FormGroup


  constructor(private fb: FormBuilder, private loginService: LoginService, private partieService: PartiesService, private router: Router)
  {
    this.currentUser = this.loginService.userConnected$
  }

  ngOnInit(): void {
    this.partieForm = this.fb.group({
      name: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }


  sendCreateForm() {
    this.partieService.createPartie(this.partieForm.value).subscribe({
      next: (data) => {
        this.partyName = data.name
        this.router.navigateByUrl('/parties')
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des parties-view', err);
      }
    })
    console.log(this.partieForm.value)
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginService } from '../../login/services/login.service';
import { PartiesService } from '../services/parties.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-partie-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule, FormsModule], // Ajoutez ReactiveFormsModule ici
  templateUrl: './partie-edit.component.html',
  styleUrl: './partie-edit.component.scss'
})
export class PartieEditComponent {
  userId !: any
  currentUser!: Observable<any>
  errorMessage: string | null = null;
  partieId !: number
  isNoPassword = false;
  partieForm !: FormGroup



  constructor(private fb: FormBuilder, private loginService: LoginService, private partieService: PartiesService, private router: Router, private routeActivated: ActivatedRoute,) {
    this.currentUser = this.loginService.userConnected$
  }

  ngOnInit(): void {
    this.partieId = Number(this.routeActivated.snapshot.paramMap.get('id'));

    this.partieForm = this.fb.group({
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      no_password: [false]
    });
  }

  onCheckboxChange() {
    if (this.partieForm.get('no_password')?.value) {
      this.partieForm.get('password')?.setValue(null);
      this.partieForm.get('password')?.disable();
    } else {
      this.partieForm.get('password')?.enable();
    }
  }

  sendEditForm() {
    const formValue = this.partieForm.value;
    if (formValue.no_password) {
      formValue.password = null;
    }
    this.partieService.editPartie(this.partieId,this.partieForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/parties')
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des parties-view', err);
      }
    })
    console.log(this.partieForm.value)
  }
}

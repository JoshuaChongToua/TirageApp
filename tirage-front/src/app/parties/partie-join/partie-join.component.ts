// rejoindre-partie.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PartiesService } from '../services/parties.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-join-partie',
  templateUrl: './partie-join.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule, FormsModule],
})
export class PartieJoinComponent implements OnInit {
  passwordForm !: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  partieId!: number;
  motDePasse !: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private partiesService: PartiesService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
    });
    this.partieId = +this.route.snapshot.paramMap.get('id')!;
  }

  rejoindrePartie(): void {
    this.partiesService.rejoindrePartie(this.partieId, this.passwordForm.value).subscribe({
      next: () => {
        console.log("Partie rejointe avec succès");
        this.router.navigate(['/parties']);
      },
      error: err => {
        this.errorMessage = "Mot de passe incorrect";
        console.error(err);
      }
    });
  }
}

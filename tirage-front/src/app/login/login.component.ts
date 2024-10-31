import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importez ReactiveFormsModule ici
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  standalone: true, // Si vous utilisez un composant autonome
  imports: [CommonModule, ReactiveFormsModule], // Ajoutez ReactiveFormsModule ici
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  sendLoginForm() {
    this.loginService.sendCredentials(this.loginForm.value);
    console.log(this.loginForm.value)
  }


}

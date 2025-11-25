import { CommonModule } from '@angular/common';
import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, FormControl} from '@angular/forms';
import { LoginService } from './services/login.service';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


@Component({
  selector: 'app-login',
  standalone: true,
    imports: [CommonModule,
        ReactiveFormsModule,
        MatStepper,
        MatStep,
        MatFormField,
        MatStepLabel,
        MatInput,
        MatStepperNext,
        MatStepperPrevious,
        MatButtonModule,
    ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
    errorMessage: string | null = null;
    choice: WritableSignal<any> = signal('inscription')
    email: FormControl = new FormControl('');
    password: FormControl = new FormControl('');
    passwordControl: FormControl = new FormControl('');

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {

  }

  sendLoginForm() {
    this.loginService.sendCredentials(this.email.value, this.password.value);
  }

  changeChoice(choice: string) {
      if (this.choice() !== choice) {
          this.choice.set(choice);
      }
  }


}

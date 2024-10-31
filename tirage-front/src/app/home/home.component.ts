import { Component } from '@angular/core';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  user!: any

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {


  }
}

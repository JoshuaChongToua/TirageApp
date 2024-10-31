import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { LoginService } from './login/services/login.service';
import { User } from './login/interface/user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, NavbarComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private loginService: LoginService) { }

  title = 'tirage';
  isLogged = false
  userInfo: any = null;
  ngOnInit() {
    // S'abonner à l'état de connexion
    this.loginService.isLogged$.subscribe(isLogged => {
      this.isLogged = isLogged;
    });

    this.loginService.userConnected$.subscribe(userInfo => {
      this.userInfo = userInfo;
    });
  };



}



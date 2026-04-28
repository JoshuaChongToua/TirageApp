import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { LoginService } from './login/services/login.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MainComponent, NavbarComponent],
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



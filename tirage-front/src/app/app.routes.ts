import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard, isLogged} from './auth.guard';
import {MainPageComponent} from "./films-series/main-page/main-page.component";
import {FilmsSeriesComponent} from "./films-series/films-series.component";
import {SearchComponent} from "./films-series/search/search.component";
import {MyAccountComponent} from "./films-series/my-account/my-account.component";


export const routes: Routes = [
    { path: '', redirectTo: 'films-series', pathMatch: 'full' },
    { path: 'user', component: UsersComponent, canActivate:[isLogged()] },
    { path: 'login', component: LoginComponent },
    { path: 'films-series', component: FilmsSeriesComponent, canActivate:[isLogged()] },
    { path: 'main-page', component: MainPageComponent, canActivate:[isLogged()] },
    { path: 'search', component: SearchComponent, canActivate:[isLogged()] },
    { path: 'my-account', component: MyAccountComponent, canActivate:[isLogged()] },
    { path: '**', redirectTo: '' }
];


import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import {MainPageComponent} from "./films-series/main-page/main-page.component";
import {FilmsSeriesComponent} from "./films-series/films-series.component";
import {SearchComponent} from "./films-series/search/search.component";
import {MyAccountComponent} from "./films-series/my-account/my-account.component";


export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'user', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'films-series', component: FilmsSeriesComponent },
    { path: 'main-page', component: MainPageComponent },
    { path: 'search', component: SearchComponent },
    { path: 'my-account', component: MyAccountComponent },
    { path: '**', redirectTo: '' }
];


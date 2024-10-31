import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { VoituresComponent } from './voitures/voitures.component';
import { CategoriesComponent } from './categories/categories.component';
import { PartiesComponent } from './parties/parties.component';
import { MesPartiesComponent } from './mes-parties/mes-parties.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { PartiesViewComponent } from './parties/parties-view/parties-view.component';
import { PartieCreateComponent } from './parties/partie-create/partie-create.component';
import { PartieEditComponent } from './parties/partie-edit/partie-edit.component';
import { PartieJoinComponent } from './parties/partie-join/partie-join.component';
import { MesPartiesEditComponent } from './mes-parties/mes-parties-edit/mes-parties-edit.component';
import { MesPartiesViewComponent } from './mes-parties/mes-parties-view/mes-parties-view.component';
import { MesPartiesRestrictionsComponent } from './mes-parties/mes-parties-restrictions/mes-parties-restrictions.component';
import { AuthGuard } from './auth.guard';
// import { HomeComponent } from './home/home.component';
// import { VoituresComponent } from './voitures/voitures.component';
// import { CategoriesComponent } from './categories/categories.component';
// import { PartiesComponent } from './parties/parties.component';
// import { MesPartiesComponent } from './mes-parties/mes-parties.component';
// import { UsersComponent } from './users/users.component'; // Si la route /user est restreinte aux admins

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'voitures', component: VoituresComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'parties', component: PartiesComponent, canActivate: [AuthGuard] },
    { path: 'parties/create', component: PartieCreateComponent, canActivate: [AuthGuard] },
    { path: 'parties/:id/edit', component: PartieEditComponent, canActivate: [AuthGuard] },
    { path: 'parties/view/:id', component: PartiesViewComponent, canActivate: [AuthGuard] },
    { path: 'parties/rejoindre/:id', component: PartieJoinComponent, canActivate: [AuthGuard] },
    { path: 'mesParties', component: MesPartiesComponent, canActivate: [AuthGuard] },
    { path: 'mesParties/:id/edit', component: MesPartiesEditComponent, canActivate: [AuthGuard] },
    { path: 'mesParties/view/:id', component: MesPartiesViewComponent, canActivate: [AuthGuard] },
    { path: 'mesParties/:id/restriction', component: MesPartiesRestrictionsComponent, canActivate: [AuthGuard] },
    { path: 'user', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
];


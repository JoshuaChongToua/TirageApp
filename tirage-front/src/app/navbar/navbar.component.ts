import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, Router, NavigationEnd} from '@angular/router';
import {filter, map} from 'rxjs';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatExpansionModule,} from "@angular/material/expansion";
import {toSignal} from "@angular/core/rxjs-interop";
import {LolNavbarComponent} from "./lol-navbar/lol-navbar.component";
import {MovieNavbarComponent} from "./movie-navbar/movie-navbar.component";

@Component({
    selector: 'app-navbar',
    imports: [CommonModule, MatExpansionModule, LolNavbarComponent, MovieNavbarComponent],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.sass'
})
export class NavbarComponent {

    constructor(private router: Router) {

    }

    isLolMode = toSignal(
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map((event: NavigationEnd) => event.urlAfterRedirects.includes('/lol'))
        ),
        { initialValue: this.router.url.includes('/lol') }
    );
}

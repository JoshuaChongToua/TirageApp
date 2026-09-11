import { Component } from '@angular/core';
import {MatMenu, MatMenuItem} from "@angular/material/menu";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-lol-navbar',
    imports: [
        MatMenu,
        MatMenuItem,
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './lol-navbar.component.html',
  styleUrl: './lol-navbar.component.sass',
})
export class LolNavbarComponent {

}

import {Component, signal, WritableSignal} from '@angular/core';
import {NavbarService} from "../navbar/services/navbar.service";
import {ReactiveFormsModule} from "@angular/forms";
import {SearchComponent} from "./search/search.component";
import {NgClass} from "@angular/common";
import {SearchService} from "./search/services/search.service";
import {DemandeComponent} from "./demande/demande.component";
import {ListeAmisComponent} from "./liste-amis/liste-amis.component";

@Component({
  selector: 'app-amis',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        SearchComponent,
        NgClass,
        DemandeComponent,
        ListeAmisComponent
    ],
  templateUrl: './amis.component.html',
  styleUrl: './amis.component.sass'
})
export class AmisComponent {

    showType!: WritableSignal<any>
    selectedType: WritableSignal<'demande' | 'amis' | 'conversation' | 'search'> = signal('demande');
    constructor(private navbarService: NavbarService, private searchService: SearchService) {
        this.showType = this.navbarService.showType
    }

    ngOnInit(): void {
        this.showType.set(false)
    }

    selectType(type: 'demande' | 'amis' | 'conversation' | 'search'): void {
        if (type !== this.selectedType()) {
            this.selectedType.set(type)
        }
    }

    fakeDemande() {
        this.searchService.fakeDemande()
    }
}

import {Component, WritableSignal} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {SearchService} from "./services/search.service";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-search',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        MatTooltip
    ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.sass'
})
export class SearchComponent {

    users!: WritableSignal<any>

    constructor(private searchService: SearchService) {
        this.users = searchService.users
    }

    searchControl: FormControl = new FormControl('');


    search() {
        this.searchService.search(this.searchControl.value)
    }

    sendDemande(id: number) {
        this.searchService.sendDemande(id)
    }

    deleteDemande(id: number) {
        this.searchService.deleteDemande(id)
    }
}

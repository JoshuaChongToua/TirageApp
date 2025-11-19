import {Component, OnInit, WritableSignal} from '@angular/core';
import {SearchService} from "./services/search.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {ListeTitresComponent} from "../../shared/components/liste-titres/liste-titres.component";

@Component({
  selector: 'app-search',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        ListeTitresComponent,
    ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.sass'
})
export class SearchComponent implements OnInit {

    search: FormControl = new FormControl();
    titres!: WritableSignal<any>
    constructor(private searchService: SearchService) {
        this.titres = searchService.titres
    }

    ngOnInit() {
        this.search.valueChanges.subscribe((value) => {
            this.searchService.getMovieAndSeriesByName(value);
        })
    }

}

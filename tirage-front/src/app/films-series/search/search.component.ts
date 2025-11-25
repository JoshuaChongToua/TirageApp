import {Component, effect, OnInit, WritableSignal} from '@angular/core';
import {SearchService} from "./services/search.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {ListeTitresComponent} from "../../shared/components/liste-titres/liste-titres.component";
import {MainPageService} from "../main-page/services/main-page.service";
import {LoaderMovieComponent} from "../../shared/loader/loader-movie/loader-movie.component";

@Component({
  selector: 'app-search',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        ListeTitresComponent,
        LoaderMovieComponent,
    ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.sass'
})
export class SearchComponent implements OnInit {

    search: FormControl = new FormControl('');
    titres!: WritableSignal<any>
    titresLoader!: WritableSignal<any>
    constructor(private searchService: SearchService, private mainPageService: MainPageService) {
        this.titres = searchService.titres
        this.titresLoader = searchService.titresLoader

        effect(() => {
            if (this.mainPageService.selectedType() === "movie") {
                this.searchService.getMoviesByName(this.search.value);
            }
            if (this.mainPageService.selectedType() === "tv") {
                this.searchService.getSeriesByName(this.search.value);
            }
        }, {allowSignalWrites: true});
    }

    ngOnInit() {
        this.search.valueChanges.subscribe((value) => {
            if (this.mainPageService.selectedType() === "movie") {
                this.searchService.getMoviesByName(value);
            } else {
                this.searchService.getSeriesByName(value);
            }
        })
    }

    ngOnDestroy() {
        this.titres.set(null)
    }

}

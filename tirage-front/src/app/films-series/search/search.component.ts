import {Component, OnInit, WritableSignal} from '@angular/core';
import {SearchService} from "./services/search.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {DragScrollItemDirective} from "ngx-drag-scroll";
import {DetailComponent} from "../detail/detail.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-search',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        DragScrollItemDirective
    ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.sass'
})
export class SearchComponent implements OnInit {

    search: FormControl = new FormControl();
    titres!: WritableSignal<any>
    constructor(private searchService: SearchService, private dialog: MatDialog) {
        this.titres = searchService.titres
    }

    ngOnInit() {
        this.search.valueChanges.subscribe((value) => {
            this.searchService.getMovieAndSeriesByName(value);
        })
    }

    openDetail(event: any) {
        this.dialog.open(DetailComponent, {
            maxWidth: '1500px',
            maxHeight: '95vh',
            height: 'auto',
            data: {
                event: event,
            }
        });
    }

}

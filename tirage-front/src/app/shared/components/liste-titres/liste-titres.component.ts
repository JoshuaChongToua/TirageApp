import {Component, Input, WritableSignal} from '@angular/core';
import {DragScrollItemDirective} from "ngx-drag-scroll";
import {DetailComponent} from "../../../films-series/detail/detail.component";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {MainPageService} from "../../../films-series/main-page/services/main-page.service";

@Component({
  selector: 'app-liste-titres',
  standalone: true,
    imports: [
        DragScrollItemDirective,
        DatePipe
    ],
  templateUrl: './liste-titres.component.html',
  styleUrl: './liste-titres.component.sass'
})
export class ListeTitresComponent {

    @Input() titres: any

    notesAverage!: WritableSignal<any>;

    constructor(private dialog: MatDialog, private mainPageService: MainPageService) {
        this.notesAverage = this.mainPageService.notesAverage;
    }

    ngOnInit() {
        if (this.titres) {
            this.mainPageService.getNoteAverageList(this.titres.map((data: any) => data.id))
        }
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

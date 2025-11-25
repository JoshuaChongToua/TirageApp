import {Component, Input, WritableSignal} from '@angular/core';
import {DragScrollItemDirective} from "ngx-drag-scroll";
import {DetailComponent} from "../../../films-series/detail/detail.component";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {MainPageService} from "../../../films-series/main-page/services/main-page.service";
import {DetailService} from "../../../films-series/detail/services/detail.service";

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

    constructor(private dialog: MatDialog, private mainPageService: MainPageService, private detailService: DetailService) {
        this.notesAverage = this.mainPageService.notesAverage;
    }

    ngOnInit() {
        if (this.titres) {
            this.mainPageService.getNoteAverageList(this.titres.map((data: any) => data.id))
        }
    }

    openDetail(event: any) {
        this.detailService.getDetailIdMainPage(event).subscribe({
            next: (data: any) => {
                this.dialog.open(DetailComponent, {
                    width: data.backdrop_path ? '780px' : '1500px',
                    maxWidth: '95vw',
                    maxHeight: '95vh',
                    height: 'auto',
                    data: { event: event },
                    autoFocus: false
                });
            }
        })
    }

}

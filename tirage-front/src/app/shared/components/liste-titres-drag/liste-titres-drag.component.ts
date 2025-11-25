import {Component, Input, ViewEncapsulation, WritableSignal} from '@angular/core';
import {DetailComponent} from "../../../films-series/detail/detail.component";
import {MatDialog} from "@angular/material/dialog";
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import {MainPageService} from "../../../films-series/main-page/services/main-page.service";
import {DatePipe} from "@angular/common";
import {DetailService} from "../../../films-series/detail/services/detail.service";

@Component({
  selector: 'app-liste-titres-drag',
  standalone: true,
    imports: [DragScrollComponent, DragScrollItemDirective, DatePipe,],
  templateUrl: './liste-titres-drag.component.html',
  styleUrl: './liste-titres-drag.component.sass',
    encapsulation: ViewEncapsulation.None
})
export class ListeTitresDragComponent {

	@Input() titres: any;
	@Input() title: any;

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

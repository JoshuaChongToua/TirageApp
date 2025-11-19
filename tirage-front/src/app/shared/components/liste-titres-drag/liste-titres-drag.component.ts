import {Component, Input, ViewEncapsulation, WritableSignal} from '@angular/core';
import {DetailComponent} from "../../../films-series/detail/detail.component";
import {MatDialog} from "@angular/material/dialog";
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import {MainPageService} from "../../../films-series/main-page/services/main-page.service";
import {DatePipe} from "@angular/common";

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

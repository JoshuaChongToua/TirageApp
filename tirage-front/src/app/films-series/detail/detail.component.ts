import {Component, Inject, OnInit, WritableSignal} from '@angular/core';
import {DetailService} from "./services/detail.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatDialog} from "@angular/material/dialog";
import {AddNoteAvisComponent} from "./add-note-avis/add-note-avis.component";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.sass'
})
export class DetailComponent implements OnInit {

    event: any;
    eventDetail!: WritableSignal<any>

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private detailService: DetailService, private router: Router) {
        this.eventDetail = this.detailService.event
    }

    ngOnInit(): void {
        this.event = this.data.event;
        this.detailService.getDetailId(this.event.id)
    }

    closeModal() {
        this.dialog.closeAll()
    }

    getGenres() {
        return this.eventDetail()?.genres.map((genre:any) => genre.name)
    }

    addNoteAndAvis(titre: any) {
        this.dialog.open(AddNoteAvisComponent, {
            width: '750px',
            maxHeight: '95vh',
            height: '500px',
            data: {
                titre: titre,
            }
        });
    }

}

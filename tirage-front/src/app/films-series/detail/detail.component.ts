import {Component, Inject, OnInit, signal, WritableSignal} from '@angular/core';
import {DetailService} from "./services/detail.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatDialog} from "@angular/material/dialog";
import {AddNoteAvisComponent} from "./add-note-avis/add-note-avis.component";
import {AvisComponent} from "./avis/avis.component";
import {StarRatingComponent} from "../../shared/star-rating/star-rating.component";

@Component({
  selector: 'app-detail',
  standalone: true,
    imports: [
        AvisComponent,
        StarRatingComponent
    ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.sass'
})
export class DetailComponent implements OnInit {

    event: any;
    eventDetail!: WritableSignal<any>
    noteAverage!: WritableSignal<any>
    ongletToDisplay: WritableSignal<any> = signal('info')

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private detailService: DetailService) {
        this.eventDetail = this.detailService.event
        this.noteAverage = this.detailService.noteAverage
    }

    ngOnInit(): void {
        this.event = this.data.event;
        this.detailService.getDetailId(this.event.id)
        this.detailService.getNoteAverage(this.event.id)
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
            height: '400px',
            data: {
                titre: titre,
            }
        });
    }

    selectOnglet(name: string) {
        if (this.ongletToDisplay() !== name) {
            this.ongletToDisplay.set(name)
        }
    }

}

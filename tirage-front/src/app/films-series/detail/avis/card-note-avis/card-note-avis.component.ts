import { Component } from '@angular/core';
import {ICellRendererParams} from "ag-grid-community";
import {StarRatingComponent} from "../../../../shared/star-rating/star-rating.component";
import {DatePipe, NgClass} from "@angular/common";
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
  selector: 'app-card-note-avis',
  standalone: true,
    imports: [
        StarRatingComponent,
        DatePipe,
        NgClass
    ],
  templateUrl: './card-note-avis.component.html',
  styleUrl: './card-note-avis.component.sass'
})
export class CardNoteAvisComponent implements ICellRendererAngularComp {

    constructor() {
    }

    params!: ICellRendererParams;
    donnees!: any;
    showSpoil: boolean | null = null;
    private componentParent!: any;

    agInit(params: ICellRendererParams): void {
        this.params = params;
        this.donnees = params.data;
        setTimeout(() => this.updateHeight(), 0);
        this.componentParent = this.params.context.componentParent;
        if (this.donnees.spoiler) {
            this.showSpoil = false;
        }
    }

    refresh(params: ICellRendererParams): boolean {
        this.params = params;
        this.donnees = params.data;
        return true;
    }

    showSpoiler(): void {
        this.showSpoil = true
    }

    updateHeight(): void {
        const el = document.getElementById(`avis-${this.params.node.id}`);
        if (!el) return;
        const height = (this.componentParent.rowHeightCustom || 150) + el.offsetHeight;
        if (this.params.node.rowHeight !== height) {
            this.params.node.setRowHeight(height);
            this.params.api.onRowHeightChanged();
        }
    }
}

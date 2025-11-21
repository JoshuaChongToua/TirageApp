import {Component, effect, Input, OnInit, ViewEncapsulation, WritableSignal} from '@angular/core';
import {AvisService} from "./services/avis.service";
import {ColDef, GridApi, GridOptions, GridReadyEvent, IsFullWidthRowParams} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {CardNoteAvisComponent} from "./card-note-avis/card-note-avis.component";

@Component({
  selector: 'app-avis',
  standalone: true,
    imports: [
        AgGridAngular
    ],
  templateUrl: './avis.component.html',
  styleUrl: './avis.component.sass',
    encapsulation: ViewEncapsulation.None
})
export class AvisComponent implements OnInit {

    @Input() public titre: any

    constructor(private avisService: AvisService) {
        this.context = {
            componentParent: this
        }
        this.notesAvisData = avisService.notesAvisData;
        effect(() => {
            if (this.notesAvisData()) {
                this.addDataToAgGrid()
            }
        });
    }

    notesAvisData !: WritableSignal<any>
    context !: any

    gridNotesAvis!: GridApi<any>;
    fullWidthCellRenderer: any = CardNoteAvisComponent
    rowData: any[] = [];
    rowHeightCustom = 150

    gridOptions: GridOptions = {
        autoSizeStrategy: {
            type: 'fitGridWidth',
        },
        suppressCellFocus: true,
    }

    paginationPageSize: number = 20;

    colDefs: ColDef[] = [
        {
            field: "note", headerName: "Note", lockPosition: "left", headerTooltip: "Note", hide: true
        },
        {
            field: "user", headerName: "User", lockPosition: "left", headerTooltip: "User", hide: true
        },
        {
            field: "date", headerName: "Date", lockPosition: "left", headerTooltip: "Date", hide: true
        },
        {
            field: "avis", headerName: "Avis", lockPosition: "left", headerTooltip: "Avis", hide: true
        },
    ]

    ngOnInit() {
        this.avisService.getNoteAvis(this.titre)
    }

    addDataToAgGrid() {
        this.rowData = []
        for (const noteAvis of this.notesAvisData()) {
            this.rowData.push({
                note: noteAvis.note,
                user: noteAvis.user.name,
                date: noteAvis.updated_at ?? noteAvis.created_at,
                avis: noteAvis.avis,
                spoil: noteAvis.spoil
            })
        }
    }

    onGridReady(params: GridReadyEvent) {
        this.gridNotesAvis = params.api;
    }

    firstDataRendered(params: any) {
        params.api.sizeColumnsToFit();
    }

    isFullWidthRow: (params: IsFullWidthRowParams) => boolean = (
        params: IsFullWidthRowParams,
    ) => {
        return true;
    };

}

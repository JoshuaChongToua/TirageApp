import {Component, Inject, OnInit} from '@angular/core';
import {StarRatingComponent} from "../../../shared/star-rating/star-rating.component";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddNoteAvisService} from "./services/add-note-avis.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgClass} from "@angular/common";
import {ToolsService} from "../../../shared/services/tools/tools.service";
import {MatSlideToggle} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-add-note-avis',
  standalone: true,
    imports: [
        StarRatingComponent,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        NgClass,
        MatSlideToggle,
        FormsModule
    ],
  templateUrl: './add-note-avis.component.html',
  styleUrl: './add-note-avis.component.sass'
})
export class AddNoteAvisComponent implements OnInit {
    noteAvisForm!: FormGroup;
    constructor(private addNoteAvisService: AddNoteAvisService, @Inject(MAT_DIALOG_DATA) public data: any,  private dialogRef: MatDialogRef<AddNoteAvisComponent>, private toolService: ToolsService) {
        this.noteAvisForm = this.addNoteAvisService.noteAvisForm;
    }

    ngOnInit() {
        this.noteAvisForm.get('titreId')?.setValue(this.data.titre.id);
    }

    closeModal() {
        this.dialogRef.close()
    }

    addNoteAvis() {
        this.addNoteAvisService.addNoteAvis().subscribe({
            next: (res: any)=> {
                this.closeModal()
                this.toolService.openSnackBar('success', 'Merci de votre ajout');
            },
            error: err => {
                this.toolService.openSnackBar('error', 'Erreur los de l\'ajout de votre ajout');
            }
        })
    }

    ngOnDestroy() {
        this.noteAvisForm.reset();
    }

}

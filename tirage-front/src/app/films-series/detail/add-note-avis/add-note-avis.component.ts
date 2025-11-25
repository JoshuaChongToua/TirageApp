import {Component, Inject, OnInit, WritableSignal} from '@angular/core';
import {StarRatingComponent} from "../../../shared/star-rating/star-rating.component";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddNoteAvisService} from "./services/add-note-avis.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgClass} from "@angular/common";
import {ToolsService} from "../../../shared/services/tools/tools.service";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {DetailService} from "../services/detail.service";

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
    hasVoted!: WritableSignal<any>
    constructor(private addNoteAvisService: AddNoteAvisService, @Inject(MAT_DIALOG_DATA) public data: any,  private dialogRef: MatDialogRef<AddNoteAvisComponent>, private toolService: ToolsService, private detailService: DetailService) {
        this.noteAvisForm = this.addNoteAvisService.noteAvisForm;
    }

    ngOnInit() {
        this.noteAvisForm.get('titreId')?.patchValue(this.data.titre.id);
        if (this.data.hasVoted) {
            this.hasVoted = this.data.hasVoted
            this.noteAvisForm.get('note')?.patchValue(this.hasVoted().note);
            this.noteAvisForm.get('avis')?.patchValue(this.hasVoted().avis);
        }
		if (this.data.titre.release_date) {
			this.noteAvisForm.get('type')?.patchValue("movie")
		} else {
			this.noteAvisForm.get('type')?.patchValue("tv")
		}
    }

    closeModal() {
        this.dialogRef.close()
    }

    addNoteAvis() {
        this.addNoteAvisService.addNoteAvis().subscribe({
            next: (res: any)=> {
                this.detailService.reloadHasVoted.set(true)
                this.closeModal()
                this.toolService.openSnackBar('success', 'Merci de votre ajout');
            },
            error: err => {
                this.toolService.openSnackBar('error', 'Erreur lors de l\'ajout de votre ajout');
            }
        })
    }

    editNoteAndAvis() {
        this.addNoteAvisService.editNoteAndAvis().subscribe({
            next: (res: any)=> {
                this.closeModal()
                this.toolService.openSnackBar('success', 'Votre avis a bien été modifié');
                this.detailService.reloadHasVoted.set(true)
            },
            error: err => {
                this.toolService.openSnackBar('error', 'Erreur lors de l\'ajout de votre ajout');
            }
        })
    }

    ngOnDestroy() {
        this.noteAvisForm.reset({
            note: null,
            titreId: null,
            avis: null,
            spoil: false
        });
    }

}

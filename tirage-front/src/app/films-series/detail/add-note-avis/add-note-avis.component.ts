import {Component, Inject} from '@angular/core';
import {StarRatingComponent} from "../../../shared/star-rating/star-rating.component";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AddNoteAvisService} from "./services/add-note-avis.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-add-note-avis',
  standalone: true,
    imports: [
        StarRatingComponent,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule
    ],
  templateUrl: './add-note-avis.component.html',
  styleUrl: './add-note-avis.component.sass'
})
export class AddNoteAvisComponent {
    noteAvisForm!: FormGroup;

    constructor(private addNoteAvisService: AddNoteAvisService, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.noteAvisForm = this.addNoteAvisService.noteAvisForm;
    }

    ngOnInit() {
        this.noteAvisForm.get('titreId')?.setValue(this.data.titre.id);
    }

}

import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ToolsService} from "../../../../shared/services/tools/tools.service";
import {environment} from "../../../../../environment/environment.development";

@Injectable({
  providedIn: 'root'
})
export class AddNoteAvisService {

    noteAvisForm: FormGroup;

    constructor(private fb: FormBuilder, private http: HttpClient, private toolService: ToolsService ) {
        this.noteAvisForm = this.fb.group({
            note: [null, Validators.required],
            titreId: [null, Validators.required],
            avis: [null],
        });
    }

    addNoteAvis() {
        this.http.post(environment.apiURL + "/api/addNoteAndAvis", this.noteAvisForm.value).subscribe({
            next: (res: any)=> {
                this.toolService.openSnackBar('success', 'Merci de votre ajout');
            },
            error: err => {
                this.toolService.openSnackBar('error', 'Erreur los de l\'ajout de votre ajout');
            }
        })
    }

}

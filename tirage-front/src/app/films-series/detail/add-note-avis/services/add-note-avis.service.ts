import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environment/environment.development";

@Injectable({
  providedIn: 'root'
})
export class AddNoteAvisService {

    noteAvisForm: FormGroup;

    constructor(private fb: FormBuilder, private http: HttpClient) {
        this.noteAvisForm = this.fb.group({
            note: [null, Validators.required],
            titreId: [null, Validators.required],
            avis: [null],
            spoil: [null],
        });
    }

    addNoteAvis() {
        return this.http.post(environment.apiURL + "/api/addNoteAndAvis", this.noteAvisForm.value)
    }

}

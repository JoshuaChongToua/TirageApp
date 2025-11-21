import {Component, Input, WritableSignal} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {EpisodeService} from "./service/episode.service";

@Component({
  selector: 'app-episode',
  standalone: true,
    imports: [
        MatFormField,
        MatSelect,
        MatOption,
        MatLabel,
        ReactiveFormsModule
    ],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.sass'
})
export class EpisodeComponent {

    @Input() titreDetail: any

    episodesDetails!: WritableSignal<any>

    saisonSelectControl: FormControl = new FormControl(1);

    constructor(private episodeService: EpisodeService) {
        this.episodesDetails = episodeService.episodesDetails
    }

    ngOnInit() {
        this.episodeService.getSaisonDetail(this.titreDetail.id, this.saisonSelectControl.value)

        this.saisonSelectControl.valueChanges.subscribe(data => {
            this.episodeService.getSaisonDetail(this.titreDetail.id, this.saisonSelectControl.value)
        })
    }

    ngOnDestroy() {
        this.episodesDetails.set(null)
    }


}

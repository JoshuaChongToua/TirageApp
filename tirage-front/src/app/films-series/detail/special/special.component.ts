import {Component, effect, Input, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {SpecialService} from "./service/special.service";
import {DragScrollComponent, DragScrollItemDirective} from "ngx-drag-scroll";

@Component({
  selector: 'app-special',
  standalone: true,
    imports: [
        DragScrollComponent,
        DragScrollItemDirective
    ],
  templateUrl: './special.component.html',
  styleUrl: './special.component.sass'
})
export class SpecialComponent implements OnInit, OnDestroy {

    @Input() titre: any;

    videosYoutube: WritableSignal<any> = signal(null)

    constructor(private specialService: SpecialService, private _sanitizer: DomSanitizer) {
        effect(() => {
            if (this.specialService.videoYoutube()) {
                let list: any = []
                this.specialService.videoYoutube().forEach((video:any) => {
                    list.push(this._sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + video.key))
                })
                this.videosYoutube.set(list)
            }
        }, {allowSignalWrites: true});
    }

    ngOnInit() {
        this.specialService.getTrailerMovie(this.titre.id, this.titre.release_date ? 'movie' : 'tv')
    }

    ngOnDestroy() {
        this.videosYoutube.set(null)
    }
}

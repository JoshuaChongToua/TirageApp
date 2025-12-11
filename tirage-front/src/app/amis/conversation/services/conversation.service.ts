import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environment/environment.development";
import {ToolsService} from "../../../shared/services/tools/tools.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {forkJoin} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

    constructor(private http: HttpClient, private toolsService: ToolsService, private fb: FormBuilder) {
        this.messageForm = this.fb.group({
            conversationIds: this.conversationIds,
            titreId: new FormControl(null),
            typeTitre: new FormControl(null),
            message: this.message
        })
    }
    messageForm: FormGroup;
    message: FormControl = new FormControl(null, [Validators.required]);
    conversationIds: FormControl = new FormControl([], [Validators.required]);

    conversations: WritableSignal<any> = signal(null)
    view: WritableSignal<'allConversations' | 'singleConversation'> = signal('allConversations');
    messagesOfConversations: WritableSignal<any> = signal(null)
    scroll: WritableSignal<boolean> = signal(false)
    closeModal: WritableSignal<boolean> = signal(false)
    titres: WritableSignal<any> = signal(null)


    getConversation() {
        this.http.get(environment.apiURL + "/api/getConversationUser").subscribe({
            next: (data: any)=> {
                this.conversations.set(data)
            },
            error: (err:any)=> {
                console.error(err)
            }
        })
    }

    getMessagesConversation(conversationId: number) {
        this.http.get(environment.apiURL + "/api/getMessagesConversation/" + conversationId).subscribe({
            next: (data: any)=> {
                this.messagesOfConversations.set(data)
                this.scroll.set(true)
                this.getDetailId(data)
            },
            error: (err:any)=> {
                console.error(err)
            }
        })
    }

    createMessage(fromShare: boolean = false) {
        this.http.post(environment.apiURL + "/api/createMessage", this.messageForm.value).subscribe({
            next: (data: any)=> {
                if (!fromShare) {
                    this.getMessagesConversation(this.messageForm.get('conversationIds')?.value[0])
                } else {
                    this.closeModal.set(true)
                    this.toolsService.openSnackBar("success", "Message envoyé")
                }
                this.messageForm.reset({
                    conversationId: this.messageForm.get('conversationId')?.value
                })
            },
            error: (err:any)=> {
                this.toolsService.openSnackBar('error', 'Erreur lors de la création du message')
            }
        })
    }


    getDetailId(titres: any[]) {
        const requests = titres
            .filter(titre => titre.titre_id)
            .map(titre =>
                this.http.get(
                    `https://api.themoviedb.org/3/${titre.type_titre}/${titre.titre_id}?api_key=${environment.apiKey2}&language=fr-FR`
                )
            );

        if (requests.length === 0) {
            this.titres.set([]);
            return;
        }

        forkJoin(requests).subscribe({
            next: (results: any[]) => {
                this.titres.set(results);
            },
            error: (err) => console.error(err)
        });
    }


}

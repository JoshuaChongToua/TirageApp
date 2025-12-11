import {Component, effect, Inject, WritableSignal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToolsService} from "../../../shared/services/tools/tools.service";
import {ConversationService} from "../../../amis/conversation/services/conversation.service";
import {NgClass} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-conversation',
  standalone: true,
    imports: [
        NgClass,
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.sass'
})
export class ConversationComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private dialogRef: MatDialogRef<ConversationComponent>, private toolService: ToolsService, private conversationService: ConversationService) {
        this.conversations = conversationService.conversations
        this.messageToSend = this.conversationService.message
        this.conversationIds = this.conversationService.conversationIds

        effect(() => {
            if (this.conversationService.closeModal()) {
                this.closeModal()
                this.conversationService.closeModal.set(false)
            }
        }, {allowSignalWrites: true});
    }
    messageToSend!: FormControl
    conversationIds!: FormControl
    listConversationsId: any = []
    conversations!: WritableSignal<any>


    ngOnInit() {
        this.conversationService.getConversation()
    }

    closeModal() {
        this.dialogRef.close()
    }

    createMessage() {
        const type = this.data.titre.release_date ? "movie" : "tv"
        this.conversationIds.patchValue(this.listConversationsId)
        this.conversationService.messageForm.get('titreId')?.patchValue(this.data.titre.id)
        this.conversationService.messageForm.get('typeTitre')?.patchValue(type)
        this.conversationService.createMessage(true)
    }

    onEnter(event: any) {
        if (event.shiftKey) {
            return;
        }
        event.preventDefault();
        if (this.messageToSend.valid) {
            this.createMessage();
        }
    }

    selectConversation(conversationId: number) {
        this.listConversationsId = this.listConversationsId.includes(conversationId)
            ? this.listConversationsId.filter((id: any) => id !== conversationId)
            : [...this.listConversationsId, conversationId];
    }



}

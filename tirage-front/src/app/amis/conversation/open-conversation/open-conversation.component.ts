import {Component, effect, ElementRef, Input, ViewChild, WritableSignal} from '@angular/core';
import {ConversationService} from "../services/conversation.service";
import {NgClass} from "@angular/common";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {DetailComponent} from "../../../films-series/detail/detail.component";
import {DetailService} from "../../../films-series/detail/services/detail.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-open-conversation',
  standalone: true,
    imports: [
        NgClass,
        ReactiveFormsModule
    ],
  templateUrl: './open-conversation.component.html',
  styleUrl: './open-conversation.component.sass'
})
export class OpenConversationComponent {

    @Input() conversation!: any;
    @Input() userConnected!: any;
    @ViewChild('conversationContainer') conversationContainer!: ElementRef<HTMLDivElement>;

    constructor(private conversationService: ConversationService, private detailService: DetailService, private dialog: MatDialog) {
        this.view = this.conversationService.view;
        this.messageToSend = this.conversationService.message
        this.conversationIds = this.conversationService.conversationIds
        this.titres = this.conversationService.titres

        effect(() => {
            if (this.conversationService.messagesOfConversations()) {
                this.conversation.messages = this.conversationService.messagesOfConversations();
                this.conversationService.messagesOfConversations.set(null);
            }

            if (this.conversationService.scroll()) {
                setTimeout(() => {
                    this.scrollToBottom();
                    this.conversationService.scroll.set(false);
                }, 0);
            }
        }, {allowSignalWrites: true});
    }

    view!: WritableSignal<"allConversations" | "singleConversation">
    titres!: WritableSignal<any>
    messageToSend!: FormControl
    conversationIds!: FormControl

    ngOnInit() {
        this.conversationIds.patchValue([this.conversation.id])
        this.conversationService.messageForm.get('conversationId')?.patchValue(this.conversation.id)
        this.conversationService.getMessagesConversation(this.conversation.id)
    }

    createMessage() {
        this.conversationService.createMessage()

    }

    changeView() {
        this.view.set('allConversations')
    }

    ngAfterViewInit() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.conversationContainer.nativeElement.scrollTo({
            top: this.conversationContainer.nativeElement.scrollHeight,
            behavior: 'smooth'
        });
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

    getTitreById(titreId: number) {
        return this.titres()?.find((t: any) => t.id === titreId);
    }

    openDetail(event: any) {
        this.detailService.getDetailIdMainPage(event).subscribe({
            next: (data: any) => {
                this.dialog.open(DetailComponent, {
                    width: data.backdrop_path ? '780px' : '1500px',
                    maxWidth: '95vw',
                    maxHeight: '95vh',
                    height: 'auto',
                    data: { event: event },
                    autoFocus: false
                });
            }
        })
    }

    ngOnDestroy() {
        this.view.set('allConversations')
    }

}

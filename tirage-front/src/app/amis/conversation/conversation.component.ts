import {Component, WritableSignal} from '@angular/core';
import {ConversationService} from "./services/conversation.service";
import {OpenConversationComponent} from "./open-conversation/open-conversation.component";
import {Observable} from "rxjs";
import {LoginService} from "../../login/services/login.service";

@Component({
  selector: 'app-conversation',
  standalone: true,
    imports: [
        OpenConversationComponent
    ],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.sass'
})
export class ConversationComponent {

    constructor(private conversationService: ConversationService, private loginService: LoginService) {
        this.conversations = conversationService.conversations
        this.view = conversationService.view
        this.currentUser = this.loginService.userConnected$

    }
    currentUser!: Observable<any>
    user!: any

    view!: WritableSignal<'allConversations' | 'singleConversation'>;
    conversation!: WritableSignal<any>;

    conversations!: WritableSignal<any>

    ngOnInit() {
        if (!this.user) {
            this.currentUser.subscribe(u => {
                if (u) {
                    this.user = u
                }
            })
        }
        this.conversationService.getConversation()
    }

    changeView(conversation: any) {
        this.conversation = conversation
        this.view.set('singleConversation')
    }

    timeAgo(dateString: string): string {
        const date = new Date(dateString);
        const now = new Date();

        const diffMs = now.getTime() - date.getTime();
        const diffMin = Math.floor(diffMs / 60000);
        const diffH = Math.floor(diffMin / 60);
        const diffJ = Math.floor(diffH / 24);

        if (diffMin < 1) return "à l'instant";
        if (diffMin < 60) return `il y a ${diffMin} min`;
        if (diffH < 24) return `il y a ${diffH} h`;
        return `il y a ${diffJ} j`;
    }

}

import { Router, ActivatedRoute } from '@angular/router';
import { UserChatService } from './../services/userChat.service';
import { WebsocketService } from './../services/websocket.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {
  private username: String;
  private chatroom;
  private message: String;
  messageArray: Array<{user: String, message: String}> = [];
  private isTyping = false;

  constructor(
    private route: ActivatedRoute,
    private webSocketService: WebsocketService,
    private userServiceChat: UserChatService,
    private router: Router
  ) {
    this.webSocketService.newMessageReceived().subscribe(data => {
      this.messageArray.push(data);
      this.isTyping = false;
    });
    this.webSocketService.receivedTyping().subscribe(bool => {
      this.isTyping = bool.isTyping;
    });
  }

  ngOnInit() {
    this.username = this.route.snapshot.queryParamMap.get('name');
    const currentUser = this.userServiceChat.getLoggedInUser();
    if ( currentUser.username < this.username) {
      this.chatroom = currentUser.username.concat(this.username);
    } else {
      this.chatroom = this.username.concat(currentUser.username);
    }
    this.webSocketService.joinRoom({user: this.userServiceChat.getLoggedInUser().username, room: this.chatroom});
    this.userServiceChat.getChatRoomsChat(this.chatroom).subscribe(messages => {
      this.messageArray = messages.json();
    });
  }

  sendMessage() {
    this.webSocketService.sendMessage({room: this.chatroom, user: this.userServiceChat.getLoggedInUser().username, message: this.message});
    this.message = '';
  }

  typing() {
    this.webSocketService.typing({room: this.chatroom, user: this.userServiceChat.getLoggedInUser().username});
  }

}


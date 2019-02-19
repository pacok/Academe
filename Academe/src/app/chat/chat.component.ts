import { UserChatService } from '../services/userChat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  Users;
  constructor(private userServiceChat: UserChatService) { }

  ngOnInit() {
    this.userServiceChat.getUsers().subscribe(users => {
      this.Users = users.json();
    });
  }

  getUser() {
    return this.userServiceChat.getLoggedInUser().username;
  }
}

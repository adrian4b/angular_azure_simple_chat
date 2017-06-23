import { Component } from '@angular/core';
import { AzureConnectorService } from "app/services/azure-connector.service";
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Simple chat app with Azure functions';
  token: string = '';
  authentificated: boolean = false;
  userName: string = 'Someone else';
  chat: string = '';
  newMessage = '';
  timer = Observable.timer(2000, 5000);

  subscription;
  constructor(private acs: AzureConnectorService) {

  }

  register(user: string) {
    if (user) {
      this.authentificated = !this.authentificated;
      this.chat += user + ' logged in' + String.fromCharCode(13);

      this.userName = user;

      this.acs.retrieveToken(user);
      this.getMessages();
      this.subscription =  this.timer.subscribe(t => {
        this.getMessages()
      });
    }
  }

  getMessages() {
    this.acs.getMessages().subscribe(
      (msgs: any[]) => {
        this.chat = '';
        for (const msg of msgs) {
          console.log(msg);
          this.chat += msg.Dt + '::' + msg.Usr + '::' + msg.Msg + String.fromCharCode(13);
        }
      },
      (error) => console.log(error)
    );
  }
  
  logout() {
    this.chat = '';
    this.authentificated = false;
    this.userName = '';
    this.token = '';
    this.subscription.unsubscribe;
  }

  sendMessage(msg: string) {
    if (msg) {
      this.chat += this.userName + ' said:' + msg + String.fromCharCode(13);
      this.acs.sendMessage(msg).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
    this.newMessage = '';
  }
}

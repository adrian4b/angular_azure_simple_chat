import { Component } from '@angular/core';
import { AzureConnectorService } from "app/services/azure-connector.service";

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

  constructor(private acs: AzureConnectorService) { }

  register(user: string) {
    if (user) {
      this.authentificated = !this.authentificated;
      this.chat += user + ' logged in' + String.fromCharCode(13);

      this.userName = user;

      this.acs.retrieveToken(user);
    }
  }

  logout() {
    this.chat += this.userName + ' logged out' + String.fromCharCode(13);
    this.authentificated = false;
    this.userName = '';
    this.token = '';
  }

  addNewMessage(msg: string) {
    if (msg) {

      this.chat += this.userName + ' said:' + msg + String.fromCharCode(13);

    }
  }
}

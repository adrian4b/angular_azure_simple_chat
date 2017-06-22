import { Injectable } from '@angular/core';
import { Http,Response  } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AzureConnectorService {

  constructor(private http: Http) { }

  private _token: string;
  public get token(): string {
    return this._token;
  }

  public retrieveToken(userName: string): string {
    return 'test';
  }

  public sendMessage(msg: string) {

  }

  public logout(userName: string) {

  }

  public retrieveMessages(): string {
    return 'test';
  }

  public getMessages() {
    return this.http.get('https://azuresimplechat.azurewebsites.net/api/GetMessages?code=pc1XVevfT7C6BUiLjWqlKXIAKgUQn7m6okT1IFWCEDAtsWa6TU0FXw==')      
      .map(
        (response: Response) => {
          const data = response.json();          
          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw('Error !!!');
        }
      );



  }
}

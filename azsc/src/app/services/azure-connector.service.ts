import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AzureConnectorService {

  constructor(private http: Http) { }

  private _token: string;
  public get token(): string {
    return this._token;
  }

  private _userName: string;
  public get userName(): string {
    return this._userName;
  }


  public retrieveToken(userName: string): string {
    this._userName = userName;
    return 'test';
  }

  public sendMessage(msg: string) {

    var bdy = {
      usr : this._userName,
      msg : msg
    };
    console.log(bdy);
    return this.http.post('https://azuresimplechat.azurewebsites.net/api/SaveMessage?code=FnEHwchyqN7QGzXaxB5Jja84G1NboIOaeUJY6Tf0KC/725OxM9S3eA==',
    bdy);
  }

  public logout(userName: string) {
    this._userName = '';
    this._token = '';
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


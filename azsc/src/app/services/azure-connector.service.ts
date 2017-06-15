import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

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
}

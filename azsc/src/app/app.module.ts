import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AzureConnectorService } from "app/services/azure-connector.service";
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [AzureConnectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }

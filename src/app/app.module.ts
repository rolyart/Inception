import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';

@NgModule({
  declarations: [
    AppComponent,
    AudioPlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

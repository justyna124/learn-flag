import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GameComponent} from './game/game.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatGridListModule, MatInputModule,
} from '@angular/material';
import {FragWrapperComponent} from './frag-wrapper/frag-wrapper.component';
import {FormsModule} from '@angular/forms';
import {MathTasksComponent} from './math-tasks/math-tasks.component';
import {MatListModule} from "@angular/material/list";
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    FragWrapperComponent,
    MathTasksComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatChipsModule,
    MatGridListModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

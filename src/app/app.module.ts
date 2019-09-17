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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MathTasksComponent} from './math-tasks/math-tasks.component';
import {MatListModule} from "@angular/material/list";
import {HomeComponent} from './home/home.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {GetGeneratedTasksComponent} from './math-task-generator/get-generated-tasks/get-generated-tasks.component';
import {GenerateMathTasksComponent} from './math-task-generator/generate-math-tasks/generate-math-tasks.component';
import {ElasticSearchClientService} from "./elastic-search-client.service";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatStepperModule} from "@angular/material/stepper";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatIconModule} from "@angular/material/icon";
import { ChipsAutocompleteComponent } from './chips-autocomplete/chips-autocomplete.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    FragWrapperComponent,
    MathTasksComponent,
    HomeComponent,
    GetGeneratedTasksComponent,
    GenerateMathTasksComponent,
    ChipsAutocompleteComponent
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
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule
  ],
  providers: [
    ElasticSearchClientService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

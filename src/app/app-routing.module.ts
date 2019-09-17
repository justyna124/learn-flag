import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MathTasksComponent} from "./math-tasks/math-tasks.component";
import {GameComponent} from "./game/game.component";
import {HomeComponent} from "./home/home.component";
import {GenerateMathTasksComponent} from "./math-task-generator/generate-math-tasks/generate-math-tasks.component";
import {GetGeneratedTasksComponent} from "./math-task-generator/get-generated-tasks/get-generated-tasks.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'flag-tasks',
    component: GameComponent
  },
  {
    path: 'math-tasks',
    component: MathTasksComponent
  },
  {
    path: 'task-generate',
    component: GenerateMathTasksComponent
  },
  {
    path: 'tasks-generated',
    component: GetGeneratedTasksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

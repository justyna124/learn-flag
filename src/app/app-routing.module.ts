import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MathTasksComponent} from "./math-tasks/math-tasks.component";
import {GameComponent} from "./game/game.component";
import {HomeComponent} from "./home/home.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'math-tasks',
    component: MathTasksComponent
  },
  {
    path: 'flag-tasks',
    component: GameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

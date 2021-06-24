import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';
import { CategoryComponent } from './components/category/category.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { AppComponent } from './app.component';


const routes: Routes = [

  { path: 'quiz', component: QuizComponent },
  { path: 'quiz/:id', component: QuizComponent },

  { path: 'category', component: CategoryComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: AppComponent }

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

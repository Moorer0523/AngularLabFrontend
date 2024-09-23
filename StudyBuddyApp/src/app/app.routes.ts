import { Routes } from '@angular/router';
import { AddToQuestionComponent } from './components/add-to-question/add-to-question.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { ContainerQuestionComponent } from './components/container-question/container-question.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
// import { QuestionApiService } from './services/question-api.service';

export const routes: Routes = [

    {path: '', component: ContainerQuestionComponent},
    {path: 'add-question', component: AddToQuestionComponent},
    {path: 'favorites/:id', component: FavoritesComponent},

];

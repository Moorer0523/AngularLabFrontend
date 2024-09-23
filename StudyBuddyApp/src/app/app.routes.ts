import { Routes } from '@angular/router';
import { AddToQuestionComponent } from './components/add-to-question/add-to-question.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
// import { QuestionApiService } from './services/question-api.service';

export const routes: Routes = [
    {path: 'form', component: AddToQuestionComponent},
    {path: '', component: QuestionListComponent},
];

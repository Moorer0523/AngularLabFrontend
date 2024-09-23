import { Component, Input } from '@angular/core';
import { Question } from '../../models/question';
import { RouterModule } from '@angular/router';
import { QuestionListComponent } from "../question-list/question-list.component";
import { CommonModule } from '@angular/common';
import { QuestionApiService } from '../../services/question-api.service';

@Component({
  selector: 'app-container-question',
  standalone: true,
  imports: [RouterModule, CommonModule, QuestionListComponent],
  templateUrl: './container-question.component.html',
  styleUrl: './container-question.component.css'
})

export class ContainerQuestionComponent {


constructor(private questionAPI: QuestionApiService) {}

ngOnInit(): void {
  //used to pull all questions from API on creation of the component. Should be moved to the parent component once we have it established and then used to pass question objects down to the child components
  console.log('Loading Questions');
  this.loadQuestions();
}

//this array is used to store the results from the loadQuestions function.
questions: Question[] = [];
currentIndex: number = 0;

//Pulls all available questions from the API and loads them into the questions array
loadQuestions() {
  this.questionAPI.getQuestions().subscribe({
    next: (data) => {
      this.questions = data;
    },
    error: (error) => {
      console.log(error);
    },
    complete: () => {
      console.log('Loading questions complete');
    },
  });
}
}

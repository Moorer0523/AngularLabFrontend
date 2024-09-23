import { Component, inject, Input, OnInit } from '@angular/core';
import { Question } from '../../models/question';
import { CommonModule } from '@angular/common';
import { QuestionApiService } from '../../services/question-api.service';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css',
})
export class QuestionListComponent {
  //
  //
  //NOTE: CURRENT API IS ALL LISTED IN QUESTION LIST COMPONENT. ARRAY AND OTHER CALLS WILL NEED TO BE MOVED TO PARENT COMPONENT THEN CODED TO PASS THE ARRAY ELEMENTS DOWN TO THIS COMPONENT. SOME CALLS LIKE ADD AND DELETE MAY STAY
  //
  //

  //for testing purposes, need to remove later
  exampleQuestion: Question = {
    id: 1004,
    questionText: 'What currency is used in Japan?',
    answer: '0'
  };

  //Dependency Injection for QuestionApiService. Its the API injection for questionAPI

  constructor(private questionAPI: QuestionApiService) {}


  @Input() question:Question | null = null;
questions: any;


  //takes in an entire question object as a parameter and then rips out the IP to pass along to detete it from the DB
  deleteQuestion(question: Question) {
    if (question != null) {
      
      //checks for a true result from teh delete attempt. IF we get a successful delete attempt then we locally remove it from questions array to prevent an extra call to the DB
      if (this.questionAPI.deleteQuestion(question)) {
        const index = this.questions.indexOf(question, 0);
        this.questions.splice(index, 1);
      }
    }
  }


  //takes in a partial question object (everything but the ID), passes it
  addNewQuestion(question: Question) {
    this.questionAPI.postQuestion(question).subscribe({
      next: (data) => {
        this.questions.push(data);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Adding question complete');
        //upon completion of the push to DB, adds the question object to the questions array so a new complete pull of the question list isn't needed.
        this.questions.push(question);
      },
    });
  }

  toggleFlip(event: Event) {
    const card = (event.currentTarget as HTMLElement).querySelector('.flip-card-inner');
    if (card) {
      card.classList.toggle('flipped');
    }
  }

}

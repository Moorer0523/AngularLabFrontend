import { Component, inject, OnInit } from '@angular/core';
import { Question } from '../../models/question';
import { CommonModule } from '@angular/common';
import { QuestionServiceService } from '../../services/question-service.service';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css',
})
export class QuestionListComponent implements OnInit {
  //
  //
  //NOTE: CURRENT API IS ALL LISTED IN QUESTION LIST COMPONENT. ARRAY AND OTHER CALLS WILL NEED TO BE MOVED TO PARENT COMPONENT THEN CODED TO PASS THE ARRAY ELEMENTS DOWN TO THIS COMPONENT. SOME CALLS LIKE ADD AND DELETE MAY STAY
  //
  //

  //for testing purposes, need to remove later
  exampleQuestion: Question = {
    Id: 1004,
    QuestionText: 'What currency is used in Japan?',
    QuestionOptions: ['Yen'],
    Answers: ['0'],
    IsFavorite: true,
  };

  //Dependency Injection for QuestionServiceService. Its the API injection for questionAPI

  constructor(private questionAPI: QuestionServiceService) {}

  ngOnInit(): void {
    //used to pull all questions from API on creation of the component. Should be moved to the parent component once we have it established and then used to pass question objects down to the child components
    console.log('Loading Questions');
    this.loadQuestions();
  }

  //this array is used to store the results from the loadQuestions function.
  questions: Question[] = [];

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
}

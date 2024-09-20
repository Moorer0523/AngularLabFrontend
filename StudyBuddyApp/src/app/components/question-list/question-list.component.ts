import { Component, inject, OnInit } from '@angular/core';
import { Question } from '../../models/question';
import { CommonModule } from '@angular/common';
import { QuestionServiceService } from '../../services/question-service.service';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css'
})
export class QuestionListComponent implements OnInit {
  questions: Question[] = [];
  questionService = inject(QuestionServiceService)

  //for testing purposes, need to remove later
  exampleQuestion: Question = {Id: 1004,QuestionText : "What currency is used in Japan?", QuestionOptions:["Yen"], Answers: ["0"], IsFavorite: true }

  constructor(private questionAPI: QuestionServiceService) {}

  ngOnInit(): void {
    console.log("Loading Questions")
    this.loadQuestions()
  }

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
    })
  }

  deleteQuestion(question: Question) {
    if (question != null) {
      if (this.questionAPI.deleteQuestion(question)) {
        const index = this.questions.indexOf(question, 0);
        this.questions.splice(index, 1);
      }
    }
  }

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
  },
})
    this.questions.push(question)
    console.log("done")
  }
}
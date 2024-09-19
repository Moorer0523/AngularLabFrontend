import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/question';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css'
})
export class QuestionListComponent implements OnInit {
  questions: Question[] = [
    {
      Id: 1,
      QuestionText: 'What is your favorite color?',
      Answers: ['Blue', 'Red', 'Green', 'Yellow'],
      IsFavorite: false
    },
    {
      Id: 2,
      QuestionText: 'What is your favorite food?',
      Answers: ['Pizza', 'Burger', 'Pasta', 'Salad'],
      IsFavorite: false
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
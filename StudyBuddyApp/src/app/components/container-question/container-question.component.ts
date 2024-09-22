import { Component, Input } from '@angular/core';
import { Question } from '../../models/question';
import { RouterModule } from '@angular/router';
import { QuestionListComponent } from "../question-list/question-list.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-container-question',
  standalone: true,
  imports: [RouterModule, CommonModule, QuestionListComponent],
  templateUrl: './container-question.component.html',
  styleUrl: './container-question.component.css'
})

export class ContainerQuestionComponent {
  @Input() question:Question | null = null;
questions: any;
   
}

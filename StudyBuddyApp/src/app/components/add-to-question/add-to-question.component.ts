import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Question } from '../../models/question';

@Component({
  selector: 'app-add-to-question',
  standalone: true,
  imports: [],
  templateUrl: './add-to-question.component.html',
  styleUrl: './add-to-question.component.css'
})
export class AddToQuestionComponent implements OnInit {
  questionForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      questionText: [''],
      answer1: [''],
      answer2: [''],
      answer3: [''],
      answer4: ['']
    });
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      const formData: Question = {
        QuestionText: this.questionForm.value.questionText,
        IsFavorite: false,
        Answers: [
          this.questionForm.value.answer1,
          this.questionForm.value.answer2,
          this.questionForm.value.answer3,
          this.questionForm.value.answer4
        ].filter(answer => answer) // Filter out empty answers
        ,
        QuestionOptions: [] //what to do here??
      };

      this.http.post('https://your-api-endpoint.com/questions', formData).subscribe(response => {
        console.log('Question submitted successfully', response);
        this.questionForm.reset(); // Reset the form after submission
      }, error => {
        console.error('Error submitting question', error);
      });
    }
  }
}
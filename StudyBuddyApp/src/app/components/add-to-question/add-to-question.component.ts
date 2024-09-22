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
      answer1: '',
    });
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      const formData: Question = {
        QuestionText: this.questionForm.value.questionText,
        Answer: this.questionForm.value.answer1,
        //removed the [] and the multiple choices 
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
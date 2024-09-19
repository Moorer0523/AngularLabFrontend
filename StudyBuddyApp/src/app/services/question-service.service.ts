import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  status: string ="";
  errorMessage: string ="";


  constructor(private http : HttpClient) { }


  getQuestions(): Observable<Question>{
    return this.http.get<Question>(environment.apiUrl)
  }

  getQuestion(id : number): Observable<Question>{
    return this.http.get<Question>(environment.apiUrl + `Questions/${id}`)
  }

  putQuestion(question : Question): Observable<Question>{
    return this.http.put<Question>(environment.apiUrl + `Questions/${question.Id}`, question)
  }

  postQuestion(Question : Question): Observable<Omit<Question,"id">>{
    console.log(Question)
    return this.http.post<Question>(environment.apiUrl + 'Questions', Question)
  }

  deleteQuestion(Question : Question): boolean{
    console.log(environment.apiUrl + `Questions/${Question.Id}`)
    let response = false
    this.http.delete(environment.apiUrl + `Questions/${Question.Id}`).subscribe({
      next: data => {
          this.status = 'True';
          response = true
      },
      error: (error:HttpErrorResponse) => {
          this.errorMessage = error.message;
          if(error.status === 404)
          console.error('There was an error!', error);
      }
  });

    return response
  }
}

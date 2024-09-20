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


  getQuestions(): Observable<Question[]>{
    return this.http.get<Question[]>(environment.apiUrl+ `Question`)
  }

  getQuestion(id : number): Observable<Question>{
    return this.http.get<Question>(environment.apiUrl + `Question/${id}`)
  }

  putQuestion(question : Question): Observable<Question>{
    return this.http.put<Question>(environment.apiUrl + `Question/${question.Id}`, question)
  }

  postQuestion(question : Question): Observable<Omit<Question,"Id">>{
    console.log(question)
    return this.http.post<Question>(environment.apiUrl + 'Question', question)
  }

  deleteQuestion(Question : Question): boolean{
    console.log(environment.apiUrl + `Question/${Question.Id}`)
    let response = false
    this.http.delete(environment.apiUrl + `Question/${Question.Id}`).subscribe({
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
  console.log("delete response: " + response)
    return response
  }
}

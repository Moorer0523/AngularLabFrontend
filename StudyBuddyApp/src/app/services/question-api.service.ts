import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionApiService {

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
    return this.http.put<Question>(environment.apiUrl + `Question/${question.id}`, question)
  }

  postQuestion(question : Question): Observable<Omit<Question,"Id">>{
    console.log(question)
    return this.http.post<Question>(environment.apiUrl + 'Question', question)
  }

  //Specifically changed this function to return a boolean as a method of checking to see if the delete attempt was successful or not. 
  deleteQuestion(Question : Question): boolean{
    let response = false
    this.http.delete(environment.apiUrl + `Question/${Question.id}`).subscribe({
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

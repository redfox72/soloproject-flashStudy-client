import { Injectable } from '@angular/core';
import { Question } from '../model/question';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private url = 'http://localhost:4000/questions/bulk';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService) { }


  getQuestionsByQuiz(questionIds: string[]): Observable<Question[]> {

    return this.http.post<Question[]>(this.url, {questions: questionIds}, { headers: new HttpHeaders({
       'Content-Type': 'application/json',
        Authorization: `Bearer: ${this.authService.getToken().value}`
       }
    ) })
      .pipe(tap(_ => console.log('fetched Question')),
        catchError(this.handleError<Question[]>('getQuestions', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}

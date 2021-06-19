import { Injectable } from '@angular/core';
import { Quiz } from '../model/quiz';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap, map, share, filter, } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';


@Injectable({
  providedIn: 'root'
})
export class QuizService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private url = 'http://localhost:4000/quizzes';

  private quizzCache: Quiz[] = [];
  private observableCache: Observable<Quiz[]>;


  constructor(
    private http: HttpClient,
    private authService: AuthenticationService) { }


  getQuizzes(): Observable<Quiz[]> {
    console.log('**** Fetching quizzess ****');
    this.observableCache = this.http.get<Quiz[]>(this.url, {
      headers: new HttpHeaders({Authorization: `Bearer ${this.authService.getToken().value}`})
    }).pipe(
      map((rawData) => this.mapCachedQuizzes(rawData)),
      catchError(this.handleError<Quiz[]>(`getQuizzes`)),
      share());
    return this.observableCache;
  }

  getQuizzesByCategory(catID: string): Observable<Quiz[]> {
    return this.getQuizzes().pipe(map(quizzes => quizzes.filter(quiz => quiz.catID === catID)));
  }


  getQuiz(id: string): Observable<Quiz> {
    return this.getQuizzes().pipe(map(quizzes => quizzes.filter(quiz => quiz._id === id)[0]));
  }


  private mapCachedQuizzes(body: Quiz[]) {
    this.observableCache = null;
    this.quizzCache = body;
    return this.quizzCache;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map, share} from 'rxjs/operators';

import { Category } from '../model/category';
import { AuthenticationService } from '../authentication.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private url = 'http://localhost:4000/categories';

  private cache: Category[] = [];
  private observableCache: Observable<Category[]>;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService) { }


  getCategories(): Observable<Category[]> {
    this.observableCache = this.http.get<Category[]>(this.url, {
      headers: new HttpHeaders({Authorization: `Bearer ${this.authService.getToken().value}`})
    }).pipe(
      map((rawData) => this.mapCachedCategories(rawData)),
      catchError(this.handleError<Category[]>(`getQuizzes`)),
      share());
    return this.observableCache;
  }

  getCategory(id: string): Observable<Category> {
    return this.getCategories().pipe(map(categories => categories.filter(cat => cat._id === id, 10)[0]));
  }

  private mapCachedCategories(body: Category[]) {
    this.observableCache = null;
    this.cache = body;
    return this.cache;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

}

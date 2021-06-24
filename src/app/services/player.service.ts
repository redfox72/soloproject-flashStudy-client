import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Player } from '../model/player';
import { AuthenticationService } from '../authentication.service';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private url = 'http://localhost:4000/players';
  private updateUrl = 'http://localhost:4000/player/completed';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService) { }


  getPlayer(id: string): Observable<Player> {
    const url = `${this.url}/${id}`;
    return this.http.get<Player>(url, {
      headers: new HttpHeaders({Authorization: `Bearer: ${this.authService.getToken().value}`})
    }).pipe(
      catchError(this.handleError<Player>(`getPlayer id=${id}`))
    );
  }

  /** PUT:  */
  updatePlayer(player: Player): Observable<any> {
    return this.http.put(this.updateUrl, player, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' , Authorization: `Bearer: ${this.authService.getToken().value}`})
    }).pipe(
      catchError(this.handleError<any>('updatePlayer'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

}

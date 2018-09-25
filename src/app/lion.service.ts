import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Lion} from './lion';
// import { LIONS } from './lions';
import {MessageService} from './message.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class LionService {
  private lionsUrl = 'api/lions';  // URL to web api
  constructor(
    private messageService: MessageService,
    private http: HttpClient) {
  }


  /** GET heroes from the server */
  getLions(): Observable<Lion[]> {
    return this.http.get<Lion[]>(this.lionsUrl)
      .pipe(
        tap(lions => this.log('fetched lions')),
        catchError(this.handleError('getLions', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getLionNo404<Data>(id: number): Observable<Lion> {
    const url = `${this.lionsUrl}/?id=${id}`;
    return this.http.get<Lion[]>(url)
      .pipe(
        map(lions => lions[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} lion id=${id}`);
        }),
        catchError(this.handleError<Lion>(`getLion id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getLion(id: number): Observable<Lion> {
    const url = `${this.lionsUrl}/${id}`;
    return this.http.get<Lion>(url).pipe(
      tap(_ => this.log(`fetched lion id=${id}`)),
      catchError(this.handleError<Lion>(`getLion id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchLions(term: string): Observable<Lion[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Lion[]>(`${this.lionsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found lions matching "${term}"`)),
      catchError(this.handleError<Lion[]>('searchLions', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addLion(lion: Lion): Observable<Lion> {
    return this.http.post<Lion>(this.lionsUrl, lion, httpOptions).pipe(
      tap((lion: Lion) => this.log(`added lion w/ id=${lion.id}`)),
      catchError(this.handleError<Lion>('addLion'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteLion(lion: Lion | number): Observable<Lion> {
    const id = typeof lion === 'number' ? lion : lion.id;
    const url = `${this.lionsUrl}/${id}`;

    return this.http.delete<Lion>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Lion>('deleteLion'))
    );
  }

  /** PUT: update the hero on the server */
  updateLion(lion: Lion): Observable<any> {
    return this.http.put(this.lionsUrl, lion, httpOptions).pipe(
      tap(_ => this.log(`updated lion id=${lion.id}`)),
      catchError(this.handleError<any>('updateLion'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`LionService: ${message}`);
  }
}

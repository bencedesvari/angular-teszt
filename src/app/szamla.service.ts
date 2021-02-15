import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Szamla } from "./szamla";
import { MessageService } from "./message.service";

@Injectable({ providedIn: "root" })
export class SzamlaService {
  private szamlakUrl = "api/szamlak"; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET heroes from the server */
  getSzamlak(): Observable<Szamla[]> {
    return this.http.get<Szamla[]>(this.szamlakUrl).pipe(
      tap(_ => this.log("fetched szamlak")),
      catchError(this.handleError<Szamla[]>("getSzamlak", []))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getSzamlaNo404<Data>(id: number): Observable<Szamla> {
    const url = `${this.szamlakUrl}/?id=${id}`;
    return this.http.get<Szamla[]>(url).pipe(
      map(szamlak => szamlak[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} szamla id=${id}`);
      }),
      catchError(this.handleError<Szamla>(`getSzamla id=${id}`))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getSzamla(id: number): Observable<Szamla> {
    const url = `${this.szamlakUrl}/${id}`;
    return this.http.get<Szamla>(url).pipe(
      tap(_ => this.log(`fetched szamla id=${id}`)),
      catchError(this.handleError<Szamla>(`getSzamlak id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addSzamla(szamla: Szamla): Observable<Szamla> {
    return this.http
      .post<Szamla>(this.szamlakUrl, szamla, this.httpOptions)
      .pipe(
        tap((newSzamla: Szamla) =>
          this.log(`added szamla w/ id=${newSzamla.id}`)
        ),
        catchError(this.handleError<Szamla>("addSzamla"))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteSzamla(szamla: Szamla | number): Observable<Szamla> {
    const id = typeof szamla === "number" ? szamla : szamla.id;
    const url = `${this.szamlakUrl}/${id}`;

    return this.http.delete<Szamla>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted szamla id=${id}`)),
      catchError(this.handleError<Szamla>("deleteSzamla"))
    );
  }

  /** PUT: update the hero on the server */
  updateSzamla(szamla: Szamla): Observable<any> {
    return this.http.put(this.szamlakUrl, szamla, this.httpOptions).pipe(
      tap(_ => this.log(`updated szamla id=${szamla.id}`)),
      catchError(this.handleError<any>("updateHSzamla"))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
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
    this.messageService.add(`SzamlaService: ${message}`);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

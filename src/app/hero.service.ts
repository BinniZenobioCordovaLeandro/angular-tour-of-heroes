import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {MessageService} from './message.service';

const httpOptions= {
  headers: new HttpHeaders({'Content-type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  private heroesUrl = 'api/heroes'; // Url to web api;

  constructor(public messageService:MessageService, private http:HttpClient) { }

  // getHeroes():Observable<Hero[]>{
  //   // TODO: send the message_after_fetching the heroes
  //   this.messageService.add('HeroService: fetched heroes');
  //   return of(HEROES);
  // }

  //** Get heroes from the server */
  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(heroes => this.log("fethed heroes")), //fethed heroes : heroes capturados.
      catchError(this.handleError('getHeroes',[]))
    );
  }


  /** GET hero by id. Will 404 if id not found */
  getHero(id:number):Observable<Hero>{
    const url =`${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=$(id)`))
    );
    // vechio CODICE :
    // // TODO: send the message_after_fetching the hero
    // this.messageService.add(`HeroService: fetched hero id=${id}`); // ASCII per ` è "alt + 96"
    // return of(HEROES.find(hero => hero.id === id));
  }

  searchHeroes(term : String): Observable<Hero[]>{
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
        tap(_ => this.log(`found Heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }


  /* add a new hero to the server */
  addHero(hero : Hero):Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero : Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=$(hero.id)`)),
      catchError(this.handleError<any>(`updateHero`))
    );
  }

  // deleteHero : delete a hero from the server.
  deleteHero(hero : Hero | number):Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  private log(message:string){
    this.messageService.add(`HeroService : ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result? : T){
    return (error: any): Observable<T> => {
      // invia il errore a un registro remoto di errori.
      console.error(error);

      // trasformà un messaggio di errore per essere più facile da llegere per il utente.
      this.log(`$(operation) errore : $(error, message)`);

      // torna un risultato vuoto.
      return of (result as T);
    }
  }
}

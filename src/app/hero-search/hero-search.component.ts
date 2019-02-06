import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})

export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();


  constructor(private heroService : HeroService) { }

  // pone un termino de busqueda dentro de la secuencia observable.
  search(term : string):void{
    this.searchTerms.next(term);
  }

  ngOnInit():void {
    this.heroes$ = this.searchTerms.pipe(
      // espera 300 milesimas de segundo para considerar el termino de busqueda.
      debounceTime(300),

      // ignora el nuevo termino si es igual al anterior.
      distinctUntilChanged(),

      //cambia a una nueva busqueda cada vez que cambia el termino.
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

}

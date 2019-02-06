// import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

// @Injectable({
//   providedIn: 'root'
// })
export class InMemoryDataService implements InMemoryDbService{
  createDb(){
    const heroes =[
      {id : 11, name : 'Frezer'},
      {id : 12, name : 'Narcso'},
      {id : 13, name : 'Chapo'},
      {id : 14, name : 'Sergio'},
      {id : 15, name : 'Martìn Vizcarra'},
      {id : 16, name : 'Zavala'},
      {id : 17, name : 'Victor'},
      {id : 18, name : 'Fujimori'},
      {id : 19, name : 'Pedro Pablo'},
      {id : 20, name : 'Mercedes'},
      {id : 21, name : 'Keiko'}
    ];
    return {heroes};
  }
  // constructor() { }
}

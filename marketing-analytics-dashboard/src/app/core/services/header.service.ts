import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public headerTitleSubject$: BehaviorSubject<string> = new BehaviorSubject<string>('Measured Dashboard');
  constructor() { }

  /**
   * Used to set title in the header based on the page activated
   * @param {string} title 
   */
  public setHeaderTitle(title: string) {
    this.headerTitleSubject$.next(title);
  }
}

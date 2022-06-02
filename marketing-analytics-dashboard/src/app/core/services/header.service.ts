import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public headerTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('Measured Dashboard');
  constructor() { }

  public setHeaderTitle(title: string) {
    this.headerTitleSubject.next(title);
  }
}

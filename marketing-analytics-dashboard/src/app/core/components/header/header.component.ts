import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  public title!: string;
  public headerTitleListener!: Subscription;

  constructor(
    private headerService: HeaderService
  ) {
    this.subscribeToHeaderTitleChange();
  }

  /**
   * Add listener to Header Title change
   */
  private subscribeToHeaderTitleChange() {
    this.headerTitleListener = this.headerService.headerTitleSubject$.subscribe(title => this.title = title);
  }

  ngOnDestroy(): void {
    if (this.headerTitleListener) {
      this.headerTitleListener.unsubscribe();
    }
  }

}

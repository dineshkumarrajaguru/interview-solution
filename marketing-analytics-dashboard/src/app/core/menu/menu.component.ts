import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { faGrip, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';

type MenuItem = {
  icon: IconDefinition,
  link: string,
  label: string
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  public menuItems: MenuItem[] = [{
    icon: faGrip,
    link: '/reports',
    label: 'Reports'
  }];

  public selectedMenu!: any;

  constructor(
    private router: Router
  ) {
    // Listen to router event (NavigationEnd) and get the url path accessed
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.setSelectedMenu(event.urlAfterRedirects);
      })
  }

  /**
   * Set the selected menu based on the navigated url
   * @param {string} navigatedUrl 
   */
  private setSelectedMenu(navigatedUrl: string) {
    this.selectedMenu = this.menuItems.find((menuItem) => menuItem.link === navigatedUrl);
  }

}

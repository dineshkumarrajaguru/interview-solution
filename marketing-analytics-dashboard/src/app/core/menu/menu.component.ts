import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { faGrip } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public menuItems = [{
    icon: faGrip,
    link: '/reports',
    label: 'Reports'
  }];

  public selectedMenu!: any;

  constructor(
    private router: Router
  ) {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.setSelectedMenu(event.urlAfterRedirects);
      })
  }

  ngOnInit(): void {
  }

  private setSelectedMenu(navigatedUrl: string) {
    this.selectedMenu = this.menuItems.find((menuItem) => menuItem.link === navigatedUrl);
  }

}

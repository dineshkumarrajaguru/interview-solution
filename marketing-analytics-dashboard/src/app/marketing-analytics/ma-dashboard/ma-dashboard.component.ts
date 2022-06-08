import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';
import { MarketingAnalyticsService } from '../services/marketing-analytics.service';

@Component({
  templateUrl: './ma-dashboard.component.html',
  styleUrls: ['./ma-dashboard.component.scss']
})
export class MaDashboardComponent implements OnInit {


  constructor(
    private marketingAnalyticsService: MarketingAnalyticsService,
    private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.setDisplayName();
  }

  /**
   * Extract display name from Layout Response and set the header title
   */
  private setDisplayName() {
    const DISPLAY_NAME = this.marketingAnalyticsService.getDisplayName();
    this.headerService.setHeaderTitle(DISPLAY_NAME);
  }

}

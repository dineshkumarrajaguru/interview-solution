import { Component, OnInit } from '@angular/core';
import { MarketingAnalyticsService } from '../services/marketing-analytics.service';

@Component({
  templateUrl: './ma-dashboard.component.html',
  styleUrls: ['./ma-dashboard.component.scss']
})
export class MaDashboardComponent implements OnInit {

  constructor(private marketingAnalyticsService: MarketingAnalyticsService) { }

  ngOnInit(): void {
    this.marketingAnalyticsService.processAnalyticsLayoutAndData();
  }

}

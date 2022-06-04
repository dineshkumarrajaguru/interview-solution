import { Component, OnInit } from '@angular/core';
import { MarketingAnalyticsService } from '../services/marketing-analytics.service';

@Component({
  templateUrl: './ma-dashboard.component.html',
  styleUrls: ['./ma-dashboard.component.scss']
})
export class MaDashboardComponent implements OnInit {

  public formattedDashboardData;

  constructor(private marketingAnalyticsService: MarketingAnalyticsService) {
    this.formattedDashboardData = this.marketingAnalyticsService.getProcessedAnalyticsData();
  }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { LayoutResponse } from 'src/assets/data/dashboard-mock-response';
import { FormattedDashboardData, MarketingAnalyticsService } from '../services/marketing-analytics.service';

@Component({
  selector: 'app-mad-layout-list',
  templateUrl: './mad-layout-list.component.html',
  styleUrls: ['./mad-layout-list.component.scss']
})
export class MadLayoutListComponent implements OnInit {

  @Input()
  public layoutListData!: FormattedDashboardData;

  public layoutList: LayoutResponse;
  
  constructor(
    private marketingAnalyticsService: MarketingAnalyticsService
  ) {
    this.layoutList = this.marketingAnalyticsService.fetchAnalyticsLayout();
  }

  ngOnInit(): void {
  }

}

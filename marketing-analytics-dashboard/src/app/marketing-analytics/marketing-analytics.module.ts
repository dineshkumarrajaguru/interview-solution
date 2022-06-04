import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';

import { MarketingAnalyticsRoutingModule } from './marketing-analytics-routing.module';
import { MaDashboardComponent } from './ma-dashboard/ma-dashboard.component';
import { MarketingAnalyticsService } from './services/marketing-analytics.service';


@NgModule({
  declarations: [
    MaDashboardComponent
  ],
  imports: [
    CommonModule,
    MarketingAnalyticsRoutingModule
  ],
  providers: [
    DatePipe,
    CurrencyPipe,
    PercentPipe,
    DecimalPipe,
    MarketingAnalyticsService
  ]
})
export class MarketingAnalyticsModule { }

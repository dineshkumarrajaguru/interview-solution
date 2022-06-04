import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';

import { MarketingAnalyticsRoutingModule } from './marketing-analytics-routing.module';
import { MaDashboardComponent } from './ma-dashboard/ma-dashboard.component';
import { MarketingAnalyticsService } from './services/marketing-analytics.service';
import { MadLayoutListComponent } from './mad-layout-list/mad-layout-list.component';
import { MadDataPointItemComponent } from './mad-data-point-item/mad-data-point-item.component';


@NgModule({
  declarations: [
    MaDashboardComponent,
    MadLayoutListComponent,
    MadDataPointItemComponent
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

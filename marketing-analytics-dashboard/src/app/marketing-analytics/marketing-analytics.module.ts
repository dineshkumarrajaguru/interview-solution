import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';


import { MarketingAnalyticsRoutingModule } from './marketing-analytics-routing.module';
import { MaDashboardComponent } from './ma-dashboard/ma-dashboard.component';
import { MarketingAnalyticsService } from './services/marketing-analytics.service';
import { MadLayoutListComponent } from './mad-layout-list/mad-layout-list.component';
import { MadDataPointItemComponent } from './mad-data-point-item/mad-data-point-item.component';
import { MadDataSetItemComponent } from './mad-data-set-item/mad-data-set-item.component';


@NgModule({
  declarations: [
    MaDashboardComponent,
    MadLayoutListComponent,
    MadDataPointItemComponent,
    MadDataSetItemComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
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

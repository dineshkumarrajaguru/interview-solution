import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Layout, MarketingAnalyticsService } from '../services/marketing-analytics.service';

@Component({
  selector: 'app-mad-data-point-item',
  templateUrl: './mad-data-point-item.component.html',
  styleUrls: ['./mad-data-point-item.component.scss']
})
export class MadDataPointItemComponent implements OnChanges {

  @Input()
  layoutDetail!: any; // TBD: Include proper type

  constructor(private marketingAnalyticsService: MarketingAnalyticsService) {

  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['layoutDetail'].currentValue) {
      this.marketingAnalyticsService.processDataPointLayout(changes['layoutDetail'].currentValue);
    }
  }

}

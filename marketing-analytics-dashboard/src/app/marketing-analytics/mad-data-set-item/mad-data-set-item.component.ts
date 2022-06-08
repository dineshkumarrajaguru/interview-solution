import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ElementGroup } from 'src/assets/data/dashboard-mock-response';

import { MarketingAnalyticsService } from '../services/marketing-analytics.service';

@Component({
  selector: 'app-mad-data-set-item',
  templateUrl: './mad-data-set-item.component.html',
  styleUrls: ['./mad-data-set-item.component.scss']
})
export class MadDataSetItemComponent implements OnChanges {

  @Input()
  layoutDetail!: ElementGroup;

  public columnDefs: ColDef[] = [];

  public rowData: Array<any> = [];

  public defaultColDef: ColDef;

  private gridApi!: GridApi;


  constructor(
    private marketingAnalyticsService: MarketingAnalyticsService
  ) {
    this.defaultColDef = {
      editable: false,
      sortable: true,
      resizable: true,
      suppressMenu: true,
    };
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['layoutDetail'].currentValue) {
      const PROCESSED_ANALYTICS_DATA = this.marketingAnalyticsService.processDataSetLayout(changes['layoutDetail'].currentValue);
      this.columnDefs = PROCESSED_ANALYTICS_DATA.columnDef;
      this.rowData = PROCESSED_ANALYTICS_DATA.rowDef;
    }
  }



}

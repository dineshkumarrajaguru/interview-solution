import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { backendDataResponse, ElementGroup, FieldDefinition, FullDataResponse, LayoutResponse, newLayoutResponse, Element, DatasetFields, DataResponse } from 'src/assets/data/dashboard-mock-response';


@Injectable()
export class MarketingAnalyticsService {

  private layoutData!: LayoutResponse;
  private analyticsData!: FullDataResponse;

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private percentPipe: PercentPipe,
    private decimalPipe: DecimalPipe
  ) { }

  public fetchAnalyticsLayout(): LayoutResponse {
    return newLayoutResponse;
  }

  private fetchAnalyticsData(): FullDataResponse {
    return backendDataResponse;
  }

  public getDisplayName(): string {
    this.layoutData = this.layoutData ?? this.fetchAnalyticsLayout();
    return this.layoutData.displayName;
  }


  public processDataPointLayout(dataPointLayoutDetail: ElementGroup) {
    dataPointLayoutDetail.elements.forEach((element: Element) => {
      element.value = this.extractDataPoint(element.name);
      element.label = this.getFieldDefinitionValue(element.name, 'label');
    });
  }

  public processDataSetLayout(dataSetLayoutDetail: ElementGroup) {
    const COLUMN_DEFS: ColDef[] = [];
    let dataList: DataResponse[] = [];
    dataSetLayoutDetail.elements.forEach((element: Element) => {
      dataList = this.extractDataSet(element.name) ?? [];
      element.fields?.forEach((field: DatasetFields) => {
        const SELECTED_FIELD_DEFINITION = this.getFieldDefinition(field.name);
        const COLUMN_DEF: ColDef = {
          field: field.name, headerName: SELECTED_FIELD_DEFINITION.label, aggFunc: this.getAggregateFunction(SELECTED_FIELD_DEFINITION.aggFn), tooltipField: field.name
        };
        if (SELECTED_FIELD_DEFINITION.format === 'currency') {
          COLUMN_DEF.valueFormatter = (data) => this.currencyPipe.transform(data.value, 'USD', 'symbol', SELECTED_FIELD_DEFINITION.digitsInfo) || '';
        } else if (SELECTED_FIELD_DEFINITION.format === 'percent') {
          COLUMN_DEF.valueFormatter = (data) => this.percentPipe.transform(+data.value, SELECTED_FIELD_DEFINITION.digitsInfo) || '';
        } else if (SELECTED_FIELD_DEFINITION.format === 'number') {
          COLUMN_DEF.valueFormatter = (data) => this.decimalPipe.transform(+data.value, SELECTED_FIELD_DEFINITION.digitsInfo) || '';
        }
        COLUMN_DEFS.push(COLUMN_DEF);
      });
    });

    return { columnDef: COLUMN_DEFS, rowDef: dataList };
  }

  private extractDataSet(elementName: string) {
    this.analyticsData = this.analyticsData ?? this.fetchAnalyticsData();
    return this.analyticsData.dataSets.find(dataSet => dataSet.name === elementName)?.data;
  }

  private extractDataPoint(elementName: string): string | number {
    this.analyticsData = this.analyticsData ?? this.fetchAnalyticsData();
    const DATA_POINTS = this.analyticsData.dataPoints ?? {};
    const FORMATTED_DATA_POINT = this.formatDataPoint(elementName, DATA_POINTS[elementName]);
    return FORMATTED_DATA_POINT ?? '-';
  }

  private formatDataPoint(elementName: string, dataPoint: string | number) {
    const SELECTED_FIELD_DEFINITION: FieldDefinition = this.getFieldDefinition(elementName);
    const DIGITS_INFO = SELECTED_FIELD_DEFINITION['digitsInfo' as keyof FieldDefinition] ?? undefined;
    let formattedData: string | number | null;
    switch (SELECTED_FIELD_DEFINITION.format) {
      case 'datetime':
        formattedData = this.datePipe.transform(dataPoint);
        break;
      case 'currency':
        formattedData = this.currencyPipe.transform(dataPoint, 'USD', 'symbol', DIGITS_INFO);
        break;
      case 'percent':
        formattedData = this.percentPipe.transform(dataPoint, DIGITS_INFO);
        break;
      case 'number':
        formattedData = this.decimalPipe.transform(dataPoint, DIGITS_INFO);
        break;
      default:
        formattedData = dataPoint;
        break;
    }
    return formattedData || dataPoint;
  }

  private getFieldDefinition(elementName: string): FieldDefinition {
    this.layoutData = this.layoutData ?? this.fetchAnalyticsLayout();
    const FIELD_DEFINITIONS = this.layoutData.fieldDefinitions || {};
    return FIELD_DEFINITIONS[elementName];
  }

  private getFieldDefinitionValue(elementName: string, fieldSeekingFor: string) {
    const SELECTED_FIELD_DEFINITION: FieldDefinition = this.getFieldDefinition(elementName);
    return SELECTED_FIELD_DEFINITION[fieldSeekingFor as keyof FieldDefinition] ?? '';
  }

  private getAggregateFunction(aggregateFunction: string): string | null {
    let agGridAggregateFunction: string | null = null;
    switch (aggregateFunction) {
      case 'sum':
        agGridAggregateFunction = 'sum';
        break;
      case 'average':
        agGridAggregateFunction = 'avg';
        break;
    }
    return agGridAggregateFunction;
  }
}

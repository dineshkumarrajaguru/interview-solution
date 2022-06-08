import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { backendDataResponse, ElementGroup, FieldDefinition, FullDataResponse, LayoutResponse, newLayoutResponse, Element, DatasetFields, DataResponse } from 'src/assets/data/dashboard-mock-response';

type ProcessedDataSet = {
  columnDef: ColDef[];
  rowDef: DataResponse[];
}
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

  /**
   * Returns the imported Analytics Layout response
   * @returns {LayoutResponse} Layout response
   */
  public fetchAnalyticsLayout(): LayoutResponse {
    return newLayoutResponse;
  }

  /**
   * Returns the imported Data response
   * @returns {FullDataResponse} Data response
   */
  private fetchAnalyticsData(): FullDataResponse {
    return backendDataResponse;
  }

  /**
   * Extracts display name from the layout response
   * @returns {string} display name of the layout
   */

  public getDisplayName(): string {
    this.layoutData = this.layoutData ?? this.fetchAnalyticsLayout();
    return this.layoutData.displayName;
  }

  /**
   * To extract value and label of data points from data point response (Uses pass by reference, so modifies the input)
   * @param {ElementGroup} dataPointLayoutDetail 
   */
  public processDataPointLayout(dataPointLayoutDetail: ElementGroup) {
    dataPointLayoutDetail.elements.forEach((element: Element) => {
      element.value = this.extractDataPoint(element.name);
      element.label = this.getFieldDefinitionValue(element.name, 'label');
    });
  }

  /**
   * To get Column definitions and Row sets to be used by AG-GRID
   * @param {ElementGroup} dataSetLayoutDetail 
   * @returns {ProcessedDataSet} Column definitions and Row definitions
   */
  public processDataSetLayout(dataSetLayoutDetail: ElementGroup): ProcessedDataSet {
    const COLUMN_DEFS: ColDef[] = [];
    let dataList: DataResponse[] = [];

    dataSetLayoutDetail.elements.forEach((element: Element) => {
      dataList = this.extractDataSet(element.name) ?? [];
      element.fields?.forEach((field: DatasetFields) => {
        const SELECTED_FIELD_DEFINITION = this.getFieldDefinition(field.name);
        const COLUMN_DEF: ColDef = {
          field: field.name, headerName: SELECTED_FIELD_DEFINITION.label, aggFunc: this.getAggregateFunction(SELECTED_FIELD_DEFINITION.aggFn), tooltipField: field.name
        };

        // Attaching value formatter functions for each column based on field definition format
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

  /**
   * Extract data set based on element name
   * @param {string} elementName 
   * @returns {DataResponse[]} data set matching the element name
   */
  private extractDataSet(elementName: string): DataResponse[] {
    this.analyticsData = this.analyticsData ?? this.fetchAnalyticsData();
    return this.analyticsData.dataSets.find(dataSet => dataSet.name === elementName)?.data ?? [];
  }

  /**
   * Extract and format the data point value
   * @param {string} elementName 
   * @returns {string | number} formatted data point value
   */
  private extractDataPoint(elementName: string): string | number {
    this.analyticsData = this.analyticsData ?? this.fetchAnalyticsData();

    const DATA_POINTS = this.analyticsData.dataPoints ?? {};
    const FORMATTED_DATA_POINT = this.formatDataPoint(elementName, DATA_POINTS[elementName]);

    return FORMATTED_DATA_POINT ?? '-';
  }

  /**
   * Formats the provided data point based on the field definition values of the element name
   * @param {string} elementName 
   * @param {string | number} dataPoint 
   * @returns {string | number | null} formatted data value
   */
  private formatDataPoint(elementName: string, dataPoint: string | number): string | number | null {
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

  /**
   * Extract field definition corresponding to the field name
   * @param {string} elementName 
   * @returns {FieldDefinition} field definition matching the element name
   */
  private getFieldDefinition(elementName: string): FieldDefinition {
    this.layoutData = this.layoutData ?? this.fetchAnalyticsLayout();

    const FIELD_DEFINITIONS = this.layoutData.fieldDefinitions || {};
    return FIELD_DEFINITIONS[elementName];
  }

  /**
   * Extract field definition value matching the element name and field required
   * @param {string} elementName 
   * @param {string} fieldSeekingFor 
   * @returns {string} value of the field definition properties like label, format, type, aggregate function
   */
  private getFieldDefinitionValue(elementName: string, fieldSeekingFor: string): string {
    const SELECTED_FIELD_DEFINITION: FieldDefinition = this.getFieldDefinition(elementName);
    return SELECTED_FIELD_DEFINITION[fieldSeekingFor as keyof FieldDefinition] ?? '';
  }

  /**
   * Transformation function to get AG-GRID supported aggregate function names
   * @param {string} aggregateFunction 
   * @returns {string} Aggregate function name supported by AG-GRID
   */
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

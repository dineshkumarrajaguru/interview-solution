import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { backendDataResponse, FieldDefinition, FullDataResponse, LayoutResponse, newLayoutResponse } from 'src/assets/data/dashboard-mock-response';


export interface FormattedDashboardData {
  displayName: string;
  layouts: Layout[]
}
export interface Layout {
  name: string;
  type: string;
  label: string;
  width: number;
  elements: Array<Element>;
}

interface Element {
  name: string;
  type: string;
  label: string;
  width: number;
  value?: string | number;
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

  private fetchAnalyticsLayout(): LayoutResponse {
    return newLayoutResponse;
  }

  private fetchAnalyticsData(): FullDataResponse {
    return backendDataResponse;
  }

  public getProcessedAnalyticsData() {
    this.layoutData = this.fetchAnalyticsLayout();
    this.analyticsData = this.fetchAnalyticsData();

    this.layoutData.layout.forEach((layout) => {
      if (layout.type === 'DATA_POINT') {
        layout.elements.map((element: any) => {
          element.value = this.extractDataPoint(element.name);
          element.label = this.getFieldDefinitionValue(element.name, 'label');
        });
      }
    });

    const PROCESSED_ANALYTICS_DATA: FormattedDashboardData = {
      displayName: this.layoutData.displayName,
      layouts: this.layoutData.layout as Layout[]
    }
    return PROCESSED_ANALYTICS_DATA;
  }

  private extractDataPoint(elementName: string): string | number {
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
    return formattedData;
  }

  private getFieldDefinition(elementName: string): FieldDefinition {
    const FIELD_DEFINITIONS = this.layoutData.fieldDefinitions || {};
    return FIELD_DEFINITIONS[elementName];
  }

  private getFieldDefinitionValue(elementName: string, fieldSeekingFor: string) {
    const SELECTED_FIELD_DEFINITION: FieldDefinition = this.getFieldDefinition(elementName);
    return SELECTED_FIELD_DEFINITION[fieldSeekingFor as keyof FieldDefinition] ?? '';
  }
}

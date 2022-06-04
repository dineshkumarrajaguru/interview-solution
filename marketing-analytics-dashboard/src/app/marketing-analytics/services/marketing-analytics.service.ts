import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { backendDataResponse, FieldDefinition, FullDataResponse, LayoutResponse, newLayoutResponse } from 'src/assets/data/dashboard-mock-response';
import { MarketingAnalyticsModule } from '../marketing-analytics.module';


interface FormattedDashboardData {
  displayName: string;
  layouts: Array<Layout>
}
interface Layout {
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

  public processAnalyticsLayoutAndData() {
    this.layoutData = this.fetchAnalyticsLayout();
    this.analyticsData = this.fetchAnalyticsData();
    console.log('Layout Data:', this.layoutData); // TBD: Remove console.logs
    console.log('Analytics Data:', this.analyticsData);

    const DATA_POINT_LAYOUTS = this.layoutData.layout.filter(layout => layout.type === 'DATA_POINT');
    DATA_POINT_LAYOUTS.map((dataPointLayout) => {
      dataPointLayout.elements.map((element: any) => {
        element.value = this.extractDataPoint(element.name);
      });
    });
    console.warn('DATA_POINT_LAYOUTS:', DATA_POINT_LAYOUTS);
  }

  private extractDataPoint(elementName: string): string | number {
    const DATA_POINTS = this.analyticsData.dataPoints ?? {};
    const FORMATTED_DATA_POINT = this.formatDataPoint(elementName, DATA_POINTS[elementName]);
    return FORMATTED_DATA_POINT ?? '-';
  }

  private formatDataPoint(elementName: string, dataPoint: string | number) {
    const SELECTED_FIELD_DEFINITION: FieldDefinition = this.getFieldDefinition(elementName);
    let formattedData: string | number | null;
    switch (SELECTED_FIELD_DEFINITION.format) {
      case 'datetime':
        formattedData = this.datePipe.transform(dataPoint);
        break;
      case 'currency':
        formattedData = this.currencyPipe.transform(dataPoint, 'USD', 'symbol', SELECTED_FIELD_DEFINITION['digitsInfo' as keyof FieldDefinition]);
        break;
      case 'percent':
        formattedData = this.percentPipe.transform(dataPoint, SELECTED_FIELD_DEFINITION['digitsInfo' as keyof FieldDefinition]);
        break;
      case 'number':
        formattedData = this.decimalPipe.transform(dataPoint, SELECTED_FIELD_DEFINITION['digitsInfo' as keyof FieldDefinition]);
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
    // TBD: Get rid of this method if nothing useful
    const FIELD_DEFINITIONS = this.layoutData.fieldDefinitions;
    const SELECTED_FIELD_DEFINITION: FieldDefinition = FIELD_DEFINITIONS[elementName];
    return SELECTED_FIELD_DEFINITION[fieldSeekingFor as keyof FieldDefinition];
  }
}

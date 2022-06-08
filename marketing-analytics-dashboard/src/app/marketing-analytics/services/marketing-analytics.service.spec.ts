import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { MarketingAnalyticsService } from './marketing-analytics.service';
import { FullDataResponse, DataResponse, LayoutResponse, ElementGroup } from 'src/assets/data/dashboard-mock-response'
describe('MarketingAnalyticsService', () => {
  let service: MarketingAnalyticsService;
  let datePipe: DatePipe;
  let currencyPipe: CurrencyPipe;
  let decimalPipe: DecimalPipe;
  let percentPipe: PercentPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MarketingAnalyticsService,
        DatePipe,
        CurrencyPipe,
        DecimalPipe,
        PercentPipe
      ]
    });
    service = TestBed.inject(MarketingAnalyticsService);
    datePipe = TestBed.inject(DatePipe);
    currencyPipe = TestBed.inject(CurrencyPipe);
    decimalPipe = TestBed.inject(DecimalPipe);
    percentPipe = TestBed.inject(PercentPipe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch layout', ()=>{
    const layoutData = service.fetchAnalyticsLayout();
    expect(layoutData).toBeDefined();
  });

  it('should fetch analytics data', ()=>{
    const analyticsData = service['fetchAnalyticsData']();
    expect(analyticsData).toBeDefined();
  });


  it('should return display name by fetching layout data', ()=>{
    expect(service['layoutData']).toBeUndefined();
    const layoutData = service['fetchAnalyticsLayout']();
    expect(service.getDisplayName()).toEqual(layoutData.displayName); 
  });


  it('should extract data set', ()=>{
    const elementName: string = 'summary';
    expect(service['extractDataSet'](elementName)).toBeDefined();
  });

  it('should extract data point', ()=>{
    const elementName: string = 'mediaSpend';
    expect(service['extractDataPoint'](elementName)).toEqual('$701,158');
  });

  it('should return empty array since no matching element found',()=>{
    const elementName: string = 'unavailable';
    expect(service['extractDataSet'](elementName)).toEqual([]);
  });

  it('should format data point as currency', ()=>{
    const elementName: string = 'baselineSales';
    const dataPoint: string | number = 2195074.5655774996;
    expect(service['formatDataPoint'](elementName, dataPoint)).toEqual('$2,195,075');
  });

  it('should format data point as percent', ()=>{
    const elementName: string = 'percOrdersI';
    const dataPoint: string | number = 0.0014576818246469572;
    expect(service['formatDataPoint'](elementName, dataPoint)).toEqual('0.15%');
  });

  it('should format data point as number', ()=>{
    const elementName: string = 'totalOrders';
    const dataPoint: string | number = 49215;
    expect(service['formatDataPoint'](elementName, dataPoint)).toEqual('49,215');
  });

  it('should get correct field definition', ()=>{
    const elementName: string = 'percSalesI';
    expect(service['getFieldDefinition'](elementName)).toBeDefined();
  });

  it('should get empty object if no matching field definition exist', ()=>{
    const elementName: string = 'percSalesIFake';
    expect(service['getFieldDefinition'](elementName)).toBeUndefined();
  });

  it('should extract correct field definition value like label', ()=>{
    const elementName: string = 'percSalesI';
    const fieldSeekingFor: string = 'label';
    expect(service['getFieldDefinitionValue'](elementName, fieldSeekingFor)).toEqual('% Sales (i)');
  });

  it('should return empty string if valid field definition is not available', ()=>{
    const elementName: string = 'percSalesI';
    const fieldSeekingFor: string = 'labelFake';
    expect(service['getFieldDefinitionValue'](elementName, fieldSeekingFor)).toEqual('');
  });

  it('should return aggregate function string supported by AG-Grid', ()=>{
    const averageAggregateFunction: string = 'average';
    expect(service['getAggregateFunction'](averageAggregateFunction)).toEqual('avg');
    const sumAggregateFunction: string = 'sum';
    expect(service['getAggregateFunction'](sumAggregateFunction)).toEqual('sum');
  });

  it('should return colum and row definitions', ()=>{
    const layoutData = service['fetchAnalyticsLayout']();
    const dataSetLayout = layoutData.layout.find((layout)=> layout.type === 'DATA_SET') as ElementGroup;
    expect(service['processDataSetLayout'](dataSetLayout)).toBeDefined();
  });

});

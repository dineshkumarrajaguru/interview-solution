import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderService } from 'src/app/core/services/header.service';
import { MarketingAnalyticsModule } from '../marketing-analytics.module';
import { MarketingAnalyticsService } from '../services/marketing-analytics.service';

import { MaDashboardComponent } from './ma-dashboard.component';

describe('MaDashboardComponent', () => {
  let component: MaDashboardComponent;
  let fixture: ComponentFixture<MaDashboardComponent>;
  let marketingAnalyticsService: MarketingAnalyticsService;
  let headerService: HeaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaDashboardComponent],
      imports: [MarketingAnalyticsModule],
      providers: [
        MarketingAnalyticsService,
        HeaderService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaDashboardComponent);
    component = fixture.componentInstance;

    marketingAnalyticsService = TestBed.inject(MarketingAnalyticsService);
    headerService = TestBed.inject(HeaderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

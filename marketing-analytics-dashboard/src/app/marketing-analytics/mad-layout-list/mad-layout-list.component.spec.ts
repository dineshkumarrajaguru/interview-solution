import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketingAnalyticsModule } from '../marketing-analytics.module';
import { MarketingAnalyticsService } from '../services/marketing-analytics.service';

import { MadLayoutListComponent } from './mad-layout-list.component';

describe('MadLayoutListComponent', () => {
  let component: MadLayoutListComponent;
  let fixture: ComponentFixture<MadLayoutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MadLayoutListComponent],
      imports: [MarketingAnalyticsModule],
      providers: [MarketingAnalyticsService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MadLayoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketingAnalyticsModule } from '../marketing-analytics.module';
import { MarketingAnalyticsService } from '../services/marketing-analytics.service';

import { MadDataSetItemComponent } from './mad-data-set-item.component';

describe('MadDataSetItemComponent', () => {
  let component: MadDataSetItemComponent;
  let fixture: ComponentFixture<MadDataSetItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MadDataSetItemComponent],
      imports: [MarketingAnalyticsModule],
      providers: [MarketingAnalyticsService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MadDataSetItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

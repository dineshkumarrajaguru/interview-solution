import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaDashboardComponent } from './ma-dashboard.component';

describe('MaDashboardComponent', () => {
  let component: MaDashboardComponent;
  let fixture: ComponentFixture<MaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MadDataPointItemComponent } from './mad-data-point-item.component';

describe('MadDataPointItemComponent', () => {
  let component: MadDataPointItemComponent;
  let fixture: ComponentFixture<MadDataPointItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MadDataPointItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MadDataPointItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

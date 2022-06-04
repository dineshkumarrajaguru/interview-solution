import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MadLayoutListComponent } from './mad-layout-list.component';

describe('MadLayoutListComponent', () => {
  let component: MadLayoutListComponent;
  let fixture: ComponentFixture<MadLayoutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MadLayoutListComponent ]
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

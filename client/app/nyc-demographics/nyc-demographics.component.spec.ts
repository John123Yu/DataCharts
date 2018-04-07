import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NycDemographicsComponent } from './nyc-demographics.component';

describe('NycDemographicsComponent', () => {
  let component: NycDemographicsComponent;
  let fixture: ComponentFixture<NycDemographicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NycDemographicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NycDemographicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

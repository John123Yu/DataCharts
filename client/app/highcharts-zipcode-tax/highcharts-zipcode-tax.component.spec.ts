import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartsZipcodeTaxComponent } from './highcharts-zipcode-tax.component';

describe('HighchartsZipcodeTaxComponent', () => {
  let component: HighchartsZipcodeTaxComponent;
  let fixture: ComponentFixture<HighchartsZipcodeTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighchartsZipcodeTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighchartsZipcodeTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

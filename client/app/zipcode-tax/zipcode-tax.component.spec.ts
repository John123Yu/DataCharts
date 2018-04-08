import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipcodeTaxComponent } from './zipcode-tax.component';

describe('ZipcodeTaxComponent', () => {
  let component: ZipcodeTaxComponent;
  let fixture: ComponentFixture<ZipcodeTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZipcodeTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipcodeTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

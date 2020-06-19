import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodesDetailComponent } from './codes-detail.component';

describe('CodesDetailComponent', () => {
  let component: CodesDetailComponent;
  let fixture: ComponentFixture<CodesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

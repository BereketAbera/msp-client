import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAdComponent } from './add-new-ad.component';

describe('AddNewAdComponent', () => {
  let component: AddNewAdComponent;
  let fixture: ComponentFixture<AddNewAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssistantsComponent } from './add-assistants.component';

describe('AddAssistantsComponent', () => {
  let component: AddAssistantsComponent;
  let fixture: ComponentFixture<AddAssistantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssistantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssistantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

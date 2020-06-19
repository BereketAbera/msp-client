import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfigsModalComponent } from './edit-configs-modal.component';

describe('EditConfigsModalComponent', () => {
  let component: EditConfigsModalComponent;
  let fixture: ComponentFixture<EditConfigsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConfigsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConfigsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSuccessNotifierComponent } from './save-success-notifier.component';

describe('SaveSuccessNotifierComponent', () => {
  let component: SaveSuccessNotifierComponent;
  let fixture: ComponentFixture<SaveSuccessNotifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveSuccessNotifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveSuccessNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

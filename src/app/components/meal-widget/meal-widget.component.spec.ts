import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MealWidgetComponent } from './meal-widget.component';

describe('MealWidgetComponent', () => {
  let component: MealWidgetComponent;
  let fixture: ComponentFixture<MealWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MealWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

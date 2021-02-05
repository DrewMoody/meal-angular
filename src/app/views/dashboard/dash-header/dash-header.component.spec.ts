import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashHeaderComponent } from './dash-header.component';

describe('DashHeaderComponent', () => {
  let component: DashHeaderComponent;
  let fixture: ComponentFixture<DashHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

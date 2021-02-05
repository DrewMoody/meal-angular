import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StdLayoutComponent } from './std-layout.component';

describe('StdLayoutComponent', () => {
  let component: StdLayoutComponent;
  let fixture: ComponentFixture<StdLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StdLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StdLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

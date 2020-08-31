import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StdLayoutComponent } from './std-layout.component';

describe('StdLayoutComponent', () => {
  let component: StdLayoutComponent;
  let fixture: ComponentFixture<StdLayoutComponent>;

  beforeEach(async(() => {
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

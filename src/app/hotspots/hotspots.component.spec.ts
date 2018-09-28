import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotspotsComponent } from './hotspots.component';

describe('HotspotsComponent', () => {
  let component: HotspotsComponent;
  let fixture: ComponentFixture<HotspotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotspotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotspotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThereComponent } from './there.component';

describe('ThereComponent', () => {
  let component: ThereComponent;
  let fixture: ComponentFixture<ThereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

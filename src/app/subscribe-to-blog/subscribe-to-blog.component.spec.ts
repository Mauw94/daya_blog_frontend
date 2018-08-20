import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeToBlogComponent } from './subscribe-to-blog.component';

describe('SubscribeToBlogComponent', () => {
  let component: SubscribeToBlogComponent;
  let fixture: ComponentFixture<SubscribeToBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeToBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeToBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

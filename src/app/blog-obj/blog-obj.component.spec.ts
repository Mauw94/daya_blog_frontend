import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogObjComponent } from './blog-obj.component';

describe('BlogObjComponent', () => {
  let component: BlogObjComponent;
  let fixture: ComponentFixture<BlogObjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogObjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogObjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

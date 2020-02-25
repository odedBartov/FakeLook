import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollFeedComponent } from './scroll-feed.component';

describe('ScrollFeedComponent', () => {
  let component: ScrollFeedComponent;
  let fixture: ComponentFixture<ScrollFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

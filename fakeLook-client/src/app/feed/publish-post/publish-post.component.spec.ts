import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishPostComponent } from './publish-post.component';

describe('PublishPostComponent', () => {
  let component: PublishPostComponent;
  let fixture: ComponentFixture<PublishPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

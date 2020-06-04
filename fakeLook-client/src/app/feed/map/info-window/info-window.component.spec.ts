import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { InfoWindowComponent } from './info-window.component';
import { PostsService } from "../../services/posts.service"
import { NavigatorService } from 'src/app/shared/navigator.service';
import { SocketIoModule } from 'ngx-socket-io';

describe('InfoWindowComponent', () => {
  let component: InfoWindowComponent;
  let fixture: ComponentFixture<InfoWindowComponent>;
  let navigatorService: NavigatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientModule, RouterModule.forRoot([]), FormsModule, SocketIoModule.forRoot({url: ''})],
        declarations: [InfoWindowComponent],
        providers: [PostsService, NavigatorService]
    })

    fixture = TestBed.createComponent(InfoWindowComponent);
    component = fixture.componentInstance;
});


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

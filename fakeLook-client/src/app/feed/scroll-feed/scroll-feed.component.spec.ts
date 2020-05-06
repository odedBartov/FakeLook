import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollFeedComponent } from './scroll-feed.component';
import { PostsService } from '../services/posts.service';
import { NavigatorService } from 'src/app/shared/navigator.service';
import { SocketIoModule } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('ScrollFeedComponent', () => {
    let component: ScrollFeedComponent;
    let fixture: ComponentFixture<ScrollFeedComponent>;
    let postService: PostsService
    let navigatorService: NavigatorService


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:[HttpClientModule, RouterModule.forRoot([]), FormsModule, SocketIoModule.forRoot({ url: '' })],
            declarations: [ScrollFeedComponent],
            providers:[PostsService,NavigatorService]
        })
        fixture = TestBed.createComponent(ScrollFeedComponent);
        component = fixture.componentInstance;
        postService = TestBed.get(PostsService)
        navigatorService = TestBed.get(NavigatorService)
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

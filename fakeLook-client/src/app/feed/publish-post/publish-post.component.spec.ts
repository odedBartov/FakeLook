import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishPostComponent } from './publish-post.component';
import { PostsService } from '../services/posts.service';
import { NavigatorService } from 'src/app/shared/navigator.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, Socket } from 'ngx-socket-io';
import { from, observable, Observable } from 'rxjs';

describe('PublishPostComponent', () => {
    let component: PublishPostComponent;
    let fixture: ComponentFixture<PublishPostComponent>;
    let postService: PostsService
    let navigatorService: NavigatorService

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, RouterModule.forRoot([]), FormsModule, SocketIoModule.forRoot({ url: '' })],
            declarations: [PublishPostComponent],
            providers: [PostsService, NavigatorService]
        })
        fixture = TestBed.createComponent(PublishPostComponent);
        component = fixture.componentInstance;
        postService = TestBed.get(PostsService)
        navigatorService = TestBed.get(NavigatorService)
    });

    it('should update field of uploadedImage', () => {
        let event = {
            target: {
                files: ["rabi@.jpg"]
            }
        }
        component.fileUploaded(event)
        expect(component.uploadedImage).toBe("rabi@.jpg")
    })

    it('should upload post successfully', () => {
        /*     component.post.image_tags = "rabbi,770"
            component.post.location = { lat: 34, lon: 35 }
            component.post.text = "Miss to Rebbe"
            component.post.user_tags = "mushky,oded"
            component.uploadedImage = "rabbi770.jpeg" */
        let isEmmited = false
        let alertMsg
        let navigated = false

        spyOn(postService, 'publishPost').and.returnValue(from([undefined]))
        spyOn(component, 'emitNewPost').and.callFake(() => {
            isEmmited = true
        })
        spyOn(window, 'alert').and.callFake((msg) => {
            alertMsg = msg
        })
        spyOn(navigatorService, 'navigateToFeed').and.callFake(() => {
            navigated = true
        })

        component.upload()

        expect(isEmmited).toBeTruthy()
        expect(alertMsg).toBe('Your post uploaded successfuly!')
        expect(navigated).toBeTruthy()
    })

    it('should not publish post and alert an error', () => {
        let alertError
        spyOn(window, 'alert').and.callFake((err) => {
            alertError = err
        })
        spyOn(postService, 'publishPost').and.returnValue(new Observable(() => {
            throw new HttpErrorResponse({
                error: { message: "Post is not uploaded successfully", status: 400 }
            });

        }))

        component.upload()
        expect(alertError).not.toBeUndefined()
    })
});

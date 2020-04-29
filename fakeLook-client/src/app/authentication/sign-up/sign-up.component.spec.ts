import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { HttpService } from '../services/http-service.service';
import { NavigatorService } from 'src/app/shared/navigator.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { from, Observable } from 'rxjs';

describe('SignUpComponent', () => {
    let component: SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;
    let httpService: HttpService;
    let navigatorService: NavigatorService
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, RouterModule.forRoot([]), FormsModule],
            declarations: [SignUpComponent],
            providers: [HttpService, NavigatorService]
        })
        fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        httpService = TestBed.get(HttpService)
        navigatorService = TestBed.get(NavigatorService)
    });

    it('should alert for try to signup without email or password or username', () => {
        component.userName = ''
        component.password = ''
        component.email = ''
        let alertMessage: string;
        spyOn(window, 'alert').and.callFake((str) => {
            alertMessage = str;
        })
        component.signUp();

        expect(alertMessage).toBe("Fill  all the fields!");
    });

    it('should alert for creation of new user successfully', () => {
        component.userName = 'mushky'
        component.password = '22'
        component.email = 'mush@gmail.com'

        let alertMessage: string;
        let navigationMessage: string;

        spyOn(httpService, 'SignUp').and.returnValue(from([undefined]))
        spyOn(window, 'alert').and.callFake((str) => {
            alertMessage = str;
        })
        spyOn(navigatorService, 'navigateToLogin').and.callFake(() => {
            navigationMessage = "navigate to login"
        })
        component.signUp();

        expect(alertMessage).toBe("New user created successfuly");
        expect(navigationMessage).not.toBeUndefined()
    });

    it('should alert for try to signup with exist username', () => {
        component.userName = 'mushky'
        component.password = '22'
        component.email = 'mush@gmail.com'
        
        let alertMessage: string;
        spyOn(httpService, 'SignUp').and.returnValue(new Observable(() => {
            throw new HttpErrorResponse({
                error: { message: "Username is already exist", status: 400 }
            });
        }))
        spyOn(window, 'alert').and.callFake((str) => {
            alertMessage = str;
        })
        component.signUp();

        expect(alertMessage).not.toBeUndefined()
    });
});

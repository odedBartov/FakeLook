import { TestBed, ComponentFixture } from '@angular/core/testing';
import { from, Observable } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http'
import { LoginComponent } from './login.component';
import { HttpService } from "../services/http-service.service";
import { NavigatorService } from "../../shared/navigator.service";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';


describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let httpService: HttpService;
    let navigatorService: NavigatorService;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, RouterModule.forRoot([]), FormsModule],
            declarations: [LoginComponent],
            providers: [HttpService, NavigatorService]
        })
        
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        httpService = TestBed.get(HttpService)
        navigatorService = TestBed.get(NavigatorService)
    })

    it("should alert for try to login without userName and password", () => {
        component.userName = '';
        component.password = '';

        let alertMessage: string;
        spyOn(window, 'alert').and.callFake((str) => {
            alertMessage = str;
        })
        component.login();

        expect(alertMessage).toBe(component.noUsernameOrPassword);
    });

    it("should success to login", () => {
        component.userName = 'oded';
        component.password = '12';
        let navigationMessage: string;

        spyOn(httpService, 'Login').and.returnValue(from([undefined]))
        spyOn(navigatorService, 'navigateToFeed').and.callFake(() => {
            navigationMessage = "navigated to feed";
        })
        component.login();
        expect(navigationMessage).toBe("navigated to feed")
    })

    it("should login with wrong userName or password and throw error", () => {
        component.userName = 'wrong';
        component.password = 'wrong';
        let alertMessage: string;

        spyOn(httpService, 'Login').and.returnValue(new Observable(() => {
            throw new HttpErrorResponse({
                error: {message: "Wrong username or password", status: 400}
            });
        }))
        spyOn(window, 'alert').and.callFake((str) => {
            alertMessage = str;
        })

        component.login();

        expect(alertMessage).not.toBeUndefined()
    })
});

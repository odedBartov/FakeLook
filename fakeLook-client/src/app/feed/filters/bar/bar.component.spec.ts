import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from "@angular/router";

import { BarComponent } from './bar.component';
import { NavigatorService } from "../../../shared/navigator.service"

describe('BarComponent', () => {
    let component: BarComponent;
    let fixture: ComponentFixture<BarComponent>;
    let navigatorService: NavigatorService;
    let successNavigate: boolean = false;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterModule.forRoot([])],
            declarations: [BarComponent],
            providers: [NavigatorService]
        })

        fixture = TestBed.createComponent(BarComponent);
        component = fixture.componentInstance;
        navigatorService = TestBed.get(NavigatorService);
        successNavigate = false;
    });

    it("should navigate to publish post page", () => {
        spyOn(navigatorService, 'navigateToPublishPost').and.callFake(() => {
            successNavigate = true;
        })

        navigatorService.navigateToPublishPost();

        expect(successNavigate).toBeTruthy();
    });

    it("should navigate to friends page", () => {
        spyOn(navigatorService, 'navigateToFriends').and.callFake(() => {
            successNavigate = true;
        })

        navigatorService.navigateToFriends();

        expect(successNavigate).toBeTruthy();
    })

    it("should navigate to scroll feed page", () => {
        spyOn(navigatorService, 'navigateToScrollFeed').and.callFake(() => {
            successNavigate = true;
        })

        navigatorService.navigateToScrollFeed();

        expect(successNavigate).toBeTruthy();
    })
});

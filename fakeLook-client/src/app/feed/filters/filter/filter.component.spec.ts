import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';

import { FilterComponent } from './filter.component';
import { PostsService } from "../../services/posts.service"
import { FilterModel } from './models/filterModel';

describe('FilterComponent', () => {
    let component: FilterComponent;
    let fixture: ComponentFixture<FilterComponent>;
    let postsService: PostsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, RouterModule.forRoot([]), FormsModule],
            declarations: [FilterComponent],
            providers: [PostsService]
        })

        fixture = TestBed.createComponent(FilterComponent);
        component = fixture.componentInstance;
        postsService = TestBed.get(PostsService)
    });

    it('should update posts filter', () => {
        let newFilter: FilterModel;
        spyOn(postsService, 'UpdatePosts').and.callFake((filter) => {
            newFilter = filter;
        })

        component.submitChanges();

        expect(newFilter).not.toBeUndefined()
    });
});

import { Component, OnInit } from '@angular/core';
import { PostsService } from "../../services/posts.service"
import { FilterModel } from "./models/filterModel"
import { filter } from 'minimatch';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filter: FilterModel;  
  // dateFrom: Date;
  // dateTo: Date;
  // radius: number;
  // imageTags: string;
  // taggedUsers: string;
  // group: string;

  constructor(private postService: PostsService) { 
    this.filter = new FilterModel();
  }

  ngOnInit() {
    this.submitChanges();
  }

  submitChanges(){
    this.postService.UpdatePosts(this.filter)
  }
}

import { Component, OnInit } from '@angular/core';
import { PostsService } from "../../services/posts.service"
import { FilterModel } from "./models/filterModel"

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filter: FilterModel;  

  constructor(private postService: PostsService) { 
    this.filter = new FilterModel();
  }

  ngOnInit() {
  }

  submitChanges(){
    this.postService.UpdatePosts(this.filter)
  }
}

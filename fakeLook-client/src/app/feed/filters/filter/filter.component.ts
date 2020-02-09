import { Component, OnInit } from '@angular/core';
import { PostsService } from "../../services/posts.service"

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private postService: PostsService) { }

  ngOnInit() {
    this.postService.UpdatePosts({});
  }

}

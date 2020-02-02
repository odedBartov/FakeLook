import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publish-post',
  templateUrl: './publish-post.component.html',
  styleUrls: ['./publish-post.component.css']
})
export class PublishPostComponent implements OnInit {
  uploadedImage;
  date = new Date();
  dateString = `${this.date.getFullYear()}/${this.date.getMonth()+1}/${this.date.getDate()}`
  taggedFriends = '';
  imageTags = '';

  constructor() { }

  ngOnInit() {
  }

  fileUploaded(event){
    debugger;
    this.uploadedImage = event.target.files[0]
  }
}

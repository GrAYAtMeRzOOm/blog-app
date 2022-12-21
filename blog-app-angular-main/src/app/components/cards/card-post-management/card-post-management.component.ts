import { Component, OnInit } from "@angular/core";
import {PostService} from '../../service/blog/post.service';
import {DefaultResponse} from '../../model/DefaultResponse';

@Component({
  selector: "app-card-post-management",
  templateUrl: "./card-post-management.component.html",
})
export class CardPostManagementComponent implements OnInit {
  private postService:PostService;
  constructor(postService:PostService) {
    this.postService=postService;
  }

  ngOnInit(): void {}

  file: File = null;

  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
  }
  submit(post_title,post_title2,post_description){
    let formdata = new FormData();

    formdata.set("post_title",post_title);
    formdata.set("post_title2",post_title2);
    formdata.set("post_description",post_description);
    formdata.set("post_image",this.file);
    const res = this.postService.createPost(formdata);
    res.subscribe((data: DefaultResponse)=>{
      if(data.status!==200){
        alert('Error in Post :'+post_title);
      }else {
        alert('Post Published Successfully');
      }
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {PostService} from '../../components/service/blog/post.service';
import {PostModel} from '../../components/model/PostModel';
import {CustomUrlSerializer} from '../../components/util/CustomUrlSerializer';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  providers: [PostService,CustomUrlSerializer]
})
export class BlogComponent implements OnInit {
  private postservice: PostService;

  constructor(postservice: PostService,
              public domSanitizer: DomSanitizer ) {
    this.postservice = postservice;
    this.loadPosts();
  }

  ngOnInit(): void {
  }

  public posts: PostModel[];

  loadPosts() {
    this.postservice.getAllPosts().subscribe((posts: PostModel[]) =>{
      this.posts = posts;
    });
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PostModel} from '../../model/PostModel';
import {DefaultResponse} from '../../model/DefaultResponse';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpclient: HttpClient) {
  }

  public getAllPosts() {
    console.log('getAllPosts invoked');
    return this.httpclient.get<PostModel[]>('http://localhost:3000/api/blog',this.getHeaders());
  }
  public createPost(blogpost:FormData){
    console.log('createPost invoked');
    console.log(blogpost);
    return this.httpclient.post<DefaultResponse>('http://localhost:3000/api/blog',blogpost,this.getHeaders());
  }
  public getPostById(id){
    console.log('createPost invoked');
    return this.httpclient.get<PostModel>('http://localhost:3000/api/blog/'+id,this.getHeaders());
  }
  public deletePost(id){
    console.log('createPost invoked');
    return this.httpclient.delete<DefaultResponse>('http://localhost:3000/api/blog/'+id,this.getHeaders());
  }
  getHeaders() {
    let headers = new HttpHeaders({
      'x-access-token': sessionStorage.getItem('token')});
    console.log("token accessed"+sessionStorage.getItem('token'));
    return { headers: headers };
  }
}

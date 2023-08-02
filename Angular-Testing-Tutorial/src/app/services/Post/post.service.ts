import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  
  getPosts(): Observable<Post[]> { 
    return this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts`);
  }

  deletePost(post: Post): Observable<Object> {
    console.log(post);
    return this.http.delete(`https://jsonplaceholder.typicode.com/post/${post.id}`);
  }
  
}

import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from '../posts/post';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators' 
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKENDURL = environment.apiUrl + "/posts/";

@Injectable({
  providedIn: 'root'
})
export class PostListService implements OnChanges {
  private posts: Post[] = []
  private postUpdaated = new Subject<{posts: Post[], postCount: Number}>();
  
  constructor(private http: HttpClient, private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  getPosts(pageSize: Number, currentPage: Number ) {
    // return [...this.posts];
    const queryParams = `?pagesize=${pageSize}&page=${currentPage}`;
    this.http.get<{ message: string, posts: any, maxPosts: Number }>(BACKENDURL+ queryParams)
    .pipe(map((PostData)=>{
      return {posts: PostData.posts.map((post)=>{
        return {
          title : post.title,
          content: post.content,
          description: post.description,
          id: post._id,
          imagePath: post.imagePath,
          creator: post.creator
        }
      }),
      maxPosts: PostData.maxPosts
    }
    }))
    .subscribe((transformedPostData) => {
      console.log(transformedPostData)
      this.posts = transformedPostData.posts;
      this.postUpdaated.next({posts: [...this.posts], postCount : transformedPostData.maxPosts});
    }
    )
  }

  getPostUpdatedListener() {
    return this.postUpdaated.asObservable();
  }
s
  getPost(id: string){
    // return {...this.posts.find(p => p.id === id)}
    return this.http.get<{id: string, title: string, content: string, description: string, imagePath: string, creator: string}>(BACKENDURL + id);
  }

  addPosts(title: string, content: string, description: string, image: File) {
    // const post: Post = {
    //   title: title,
    //   content: content,
    //   description: description
    // };
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("description", description);
    postData.append("image", image, title);

    this.http.post<{message: String, post: Post}>(BACKENDURL, postData).subscribe((responce)=>{
      // // const id =  responce.postId;
      // // post.id = id
      // const post = {
      //   id : responce.post.id,
      //   title: title,
      //   content: content,
      //   description: description,
      //   imagePath: responce.post.imagePath
      // }
      // this.posts.push(post);
      // this.postUpdaated.next([...this.posts]);
      // console.log(responce);
      alert(responce.message)
      this.router.navigate(["/"]);
    });
  }

  updatePost(id: string, title: string, content: string, description: string, image: string | File){
    let postData : Post | FormData;
    if(typeof(image) === 'object'){
      postData = new FormData();
      postData.append('id', id);
      postData.append("title", title)
      postData.append("content", content)
      postData.append("description", description)
      postData.append("image", image)

    }else{
      postData = {
        id: id,
        title: title,
        content: content,
        description: description,
        imagePath: image,
        creator: null
      }
    }

    this.http.put(BACKENDURL + id, postData).subscribe((result: any)=>{
      // // Below Code in this Scope is optional to update the post
      // const updatedPosts = [...this.posts];
      // const OldPostIndex = updatedPosts.findIndex(p => p.id === id);
      // const post = {
      //   id: id,
      //   title: title,
      //   content: content,
      //   description: description,
      //   imagePath: 'result.imagePath'
      // }
      // updatedPosts[OldPostIndex] = post;
      // this.posts = updatedPosts;
      // this.postUpdaated.next([...this.posts])
      // console.log(result.message)
      alert(result.message)
      this.router.navigate(["/"]);
    })
  }

  deletePost(postId: string){
    return this.http.delete(BACKENDURL + postId);
    // this.http.delete("http://localhost:3000/api/posts/" + postId).subscribe(()=>{
    //   const updatedPosts = this.posts.filter(post => post.id !== postId);
    //   this.posts = updatedPosts;
    //   this.postUpdaated.next([...this.posts]);
    // })
  }

}

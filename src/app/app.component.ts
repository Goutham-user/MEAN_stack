import { Component } from '@angular/core';

// interface
import { Post } from './posts/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedPosts: Post[] = [];

  onPostAdded(post){
    this.storedPosts.push(post);
  }
}

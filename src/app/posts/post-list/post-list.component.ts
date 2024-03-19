import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { PostListService } from "src/app/services/post-list.service";
import { Subscription  } from "rxjs";

// interface
import { Post } from '../post'
import { PageEvent } from "@angular/material/paginator";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})

export class PostList implements OnInit, OnDestroy{
    private postSub :Subscription;
    private userAuthSubs : Subscription;
    isUserAuthenticated: boolean = false;
    posts: Post [] =[]
    isLoading = true;
    totalPosts= 0;
    postsPerPage= 5;
    currentPage = 1;
    pageSizeOptions =[ 1,2,5,10];
    userId: string;

    constructor(public postListService: PostListService, private authService: AuthService){}


    ngOnInit(){
        this.postListService.getPosts(this.postsPerPage, this.currentPage);
        this.userId = this.authService.getUserId();
        this.postSub = this.postListService.getPostUpdatedListener().subscribe((postsData: { posts: Post[], postCount : number}) => {
            this.isLoading= false;
            console.log(postsData)
            this.totalPosts= postsData.postCount;
            this.posts = postsData.posts;
        });

        // this.isUserAuthenticated = this.authService.getIsAuth();
        this.userAuthSubs = this.authService.getAuthStatus().subscribe((isAuthenticated)=>{
            this.isUserAuthenticated = isAuthenticated;
            this.userId = this.authService.getUserId();
            // console.log(this.isUserAuthenticated)
        });
    }

    onChagedPage(pageData: PageEvent){
        this.isLoading = true;
        this.postsPerPage = pageData.pageSize;
        this.currentPage = pageData.pageIndex + 1;
        // this.totalPosts = pageData.length;
        this.postListService.getPosts(this.postsPerPage, this.currentPage);
    }

    onDelete(postId: string){
        this.isLoading = true;
        this.postListService.deletePost(postId).subscribe(()=>{
            this.postListService.getPosts(this.postsPerPage, this.currentPage)
        })
    }

    ngOnDestroy(): void {
        this.postSub.unsubscribe();
        this.userAuthSubs.unsubscribe();
    }


}
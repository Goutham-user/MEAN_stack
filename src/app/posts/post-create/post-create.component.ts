import { Component, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";


// interface
import { Post } from '../post'


@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent{
    enteredTitle='';
    enteredDesc='';
    enteredPosts='';

    @Output() postCreated = new EventEmitter<Post>();

    onAddPost(form: NgForm){
        if(form.invalid){
            return;
        }
        const post: Post = {
            title: form.value.title,
            desc: form.value.desc,
            content: form.value.content
        }
        console.log(post)
        this.postCreated.emit(post)
    }
}
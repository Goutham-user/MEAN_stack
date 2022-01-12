import { Component, Input } from "@angular/core";

// interface
import { Post } from '../post'

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})

export class PostList{
    // hard coded data
    // posts= [
    //     {title:'First Post', desc: 'This is first post desc', content: 'This is first post\'s contnnt'},
    //     {title:'Secnd Post', desc: 'This is Second post desc', content: 'This is Second post\'s contnnt'},
    //     {title:'Third Post', desc: 'This is Third post desc', content: 'This is Third post\'s contnnt'},
    //     {title:'Forth Post', desc: 'This is Forth post desc', content: 'This is Forth post\'s contnnt'},
    // ]
    // data from DB
    @Input() posts: Post [] =[]
}
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { PostListService } from "src/app/services/post-list.service";
import { Post } from "../post";
import { mimeType } from "./mime-type.validatir"

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
    postId: string;
    post : Post;
    public mode: string ='create';
    isLoading = false;
    form: FormGroup;
    imagePreview: string;

    constructor(public posstService: PostListService, private route: ActivatedRoute){}

    ngOnInit(){
        this.form = new FormGroup({
            title: new FormControl('', {validators: [Validators.required]}),
            content: new FormControl('', { validators : [Validators.required]}),
            description: new FormControl(''),
            image: new FormControl('', {validators: [Validators.required], asyncValidators: [mimeType]})
        });
        this.route.paramMap.subscribe((paramMap: ParamMap)=>{
            if(paramMap.has('postId')){
                this.postId = paramMap.get('postId');
                this.mode = 'edit';
                this.isLoading = true;
                this.posstService.getPost(this.postId).subscribe((postData)=>{
                    this.isLoading = false;
                    this.form.setValue({
                        title: postData?.title,
                        content: postData?.content,
                        description: postData?.description,
                        image: postData?.imagePath || '',
                        creator: postData.creator
                    })
                })
            }else{
                this.mode = 'create';
                this.postId = null;
            }
        })
    }

    onFileUpload(event: Event){
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({image: file});
        this.form.get('image').updateValueAndValidity();
        const reader =  new FileReader();
        reader.onload = () =>{
            this.imagePreview = reader.result as string;
        }
        reader.readAsDataURL(file);
    }

    onSavePost(){
        console.log(this.form.value.title, this.form.value.content, this.form.value.description)
        if(this.form.invalid){
            return;
        }
        this.isLoading = true;
        if(this.mode === 'create'){
            this.posstService.addPosts(this.form.value.title, this.form.value.content, this.form.value.description, this.form.value.image);
            this.isLoading = false;    
        }
        else{
            this.posstService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.description, this.form.value.image);
            this.isLoading = false;
        }
        this.form.reset();
    }
}
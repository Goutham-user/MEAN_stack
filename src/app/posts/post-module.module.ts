import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "../angular-material.module";
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostList } from "./post-list/post-list.component";


@NgModule({
    declarations: [
        PostCreateComponent,
        PostList,
    ],
    imports:[
        AngularMaterialModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ]
})
export class PostModule {}
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
  import { MatButtonModule } from '@angular/material/button'
  import{ MatCardModule} from '@angular/material/card'
  import{ MatToolbarModule } from '@angular/material/toolbar';
  import {MatExpansionModule} from '@angular/material/expansion';

// components
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import{ HeaderComponent } from './header/header.component'
import { PostList } from './posts/post-list/post-list.component';

@NgModule({

  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostList
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
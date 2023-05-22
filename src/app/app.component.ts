import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { PostModule } from './post/post.module';
import { PostService } from './post.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  showLoading: boolean = false;
  updateForm: FormGroup;

  constructor(private http: HttpClient, private postServ: PostService) {}

  ngOnInit() {
    this.fetchPost();
    this.updateForm = new FormGroup({
      'id': new FormControl(''),
      'title': new FormControl(''),
      'content': new FormControl('')
    })
  }

  onCreatePost(postData: PostModule) {
    // Send Http request
    this.postServ.createPost(postData)
  }

  onUpdatePost(postData: PostModule) {
    this.postServ.updatePost(postData);
  }

  onFetchPosts() {
    this.fetchPost();
  }

  onClearPosts() {
    // Send Http request
  }

  updForm(id: string, title: string, content: string){
    this.updateForm.patchValue({
      'id': id, 
      'title': title, 
      'content': content
    });
  }

  private fetchPost(){
    this.showLoading = true;
    this.postServ.fetchPost().subscribe(
      posts => {
        this.showLoading = false;
        this.loadedPosts = posts;
      }
    )
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModule } from './post/post.module';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  endPoint: string = 'https://training-angular-294de-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postUrl: string = this.endPoint + 'post.json';

  constructor(private http: HttpClient) { }

  createPost(postData: PostModule){
    this.http.post<{name: string}>(this.postUrl, postData).subscribe(
      (data) => {
        console.log(data);
      }
    )
  }

  updatePost(postData: PostModule) {
    var id = postData.id;
    var dataUser = postData;
    const data= {
      [id]: {
        'title': dataUser.title,
        'content': dataUser.content
      }
    }

    this.http.patch(this.postUrl, data).subscribe(
      (data) => {
        console.log(data);
      }
    )
  }

  fetchPost(){
    return this.http.get<{[key: string]: PostModule}>(this.postUrl)
    .pipe(
      map(response => {
        const postArray: PostModule[] = [];
        for(const key in response){
          if(response.hasOwnProperty(key)) {
            postArray.push({...response[key], id: key})
          }
        }
        return postArray;
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from './constants';
import { BlogModel } from '../models/blog';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  bloglist = [];

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<BlogModel[]> {
    return this.http.get(Constants.getAPiUrl() + 'blogs').pipe(map(res => this.parseData(res)));
  }

  saveBlog(blog: any) {
    return this.http.post(Constants.getAPiUrl() + 'blogs', blog).pipe(map((res: Response) => {
      if (res) {
        if (res.status === 200) {
          return 'Succes';
        }
      } else {
        return 'An error occured';
      }
    }));
  }

  uploadImage(formDate: FormData) {
    return this.http.post(Constants.getAPiUrl() + 'blogimage', formDate);
  }

  parseData(json: any): BlogModel[] {
    return Object.keys(json).map(key => {
      const blog = new BlogModel(
        json[key].content,
        json[key].date,
        json[key].title,
        Constants.getAPiUrl() + 'uploads/' + json[key].image
      );
      return blog;
    });
  }

}

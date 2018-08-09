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
    return this.http.get(Constants.getLocalHostURL() + 'blogs').pipe(map(res => this.parseData(res)));
  }

  saveBlog(blog: any) {
    return this.http.post(Constants.getLocalHostURL() + 'blogs', blog);
  }

  parseData(json: any): BlogModel[] {
    return Object.keys(json).map(key => {
      const blog = new BlogModel(
        json[key].content,
        json[key].date
      );
      return blog;
    });
  }

}

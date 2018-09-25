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

  getLastThreeBlogs(): Observable<BlogModel[]> {
    return this.http.get(Constants.getAPiUrl() + 'lastthree').pipe(map(res => this.parseData(res)));
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

  updateBlog(blog: any) {
    return this.http.post(Constants.getAPiUrl() + 'updateblog', blog).pipe(map(res =>
      console.log(res)));
  }

  getBlogById(id: any): Observable<BlogModel> {
    return this.http.get(Constants.getAPiUrl() + 'blogs/' + id).pipe(map(res =>
      this.parseSingleObjectData(res)));
  }

  // need to get rid of the console.logs in this file and the edit.blog.component for the delete blog
  deleteBlogById(id: any) {
    return this.http.get(Constants.getAPiUrl() + 'deleteblog/' + id).pipe(map(res =>
      console.log(res)));
  }

  parseData(json: any): BlogModel[] {
    return Object.keys(json).map(key => {
      const blog = new BlogModel(
        json[key]._id,
        json[key].content,
        json[key].date,
        json[key].title,
        json[key].image
      );
      return blog;
    });
  }

  parseSingleObjectData(json: any): BlogModel {
    const blog = new BlogModel(
      json['_id']._id,
      json['content'].content,
      json['date'].date,
      json['title'].title,
      json['title'].image
    );
    blog.id = json['_id'];
    blog.content = json['content'];
    blog.date = json['date'];
    blog.title = json['title'];
    blog.image = json['image'];
    return blog;
  }

}

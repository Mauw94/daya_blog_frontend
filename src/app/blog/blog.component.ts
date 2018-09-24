import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { BlogModel } from '../models/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogList: BlogModel[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.fetchBlogList();
  }

  fetchBlogList(): void {
    this.blogService.getBlogs().subscribe((data) => {
      if (data != null) {
        this.blogList = data;
        this.blogList.reverse();
      }
    });
  }

}

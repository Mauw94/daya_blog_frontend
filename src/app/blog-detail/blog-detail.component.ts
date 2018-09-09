import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { BlogModel } from '../models/blog';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  blog: BlogModel;

  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  getBlog(): void {
    this.blogService.getBlogById(this.route.snapshot.paramMap.get('id')).subscribe((data) => {
      if (data != null) {
        this.blog = data;
      }
    });
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { BlogModel } from '../models/blog';
import { AuthService } from '../services/auth.service';
import { Constants } from '../services/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-obj',
  templateUrl: './blog-obj.component.html',
  styleUrls: ['./blog-obj.component.css']
})
export class BlogObjComponent implements OnInit {

  @Input() blog: BlogModel;
  loggedIn = false;
  showmore = false;
  image: string = null;
  images: string[] = [];

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.showmore = false;
    this.checkLoginStatus();
    this.getFirstImage();
    this.getImageURLs();
  }

  editBlog(): void {
    this.router.navigate(['/editblog', this.blog.id]);
  }

  blogDetails(): void {
    this.router.navigate(['/blogdetail', this.blog.id]);
  }

  getFirstImage(): void {
    this.image = Constants.getFileUploadLocation() + this.blog.image[0];
  }

  getImageURLs(): void {
    for (let i = 0; i < this.blog.image.length; i++) {
      this.images.push(Constants.getFileUploadLocation() + this.blog.image[i]);
    }
  }

  showMore(): void {
    this.showmore = true;
  }
  hide(): void {
    this.showmore = false;
  }

  checkLoginStatus(): void {
    if (this.auth.isLoggedIn()) {
      this.loggedIn = true;
    }
  }

}

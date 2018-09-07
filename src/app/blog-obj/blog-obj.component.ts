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
  image: string = null;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.checkLoginStatus();
    this.getFirstImage();
  }

  editBlog(): void {
    this.router.navigate(['/editblog', this.blog.id]);
  }

  getFirstImage(): void {
    this.image = Constants.getFileUploadLocation() + this.blog.image[0];
  }

  checkLoginStatus(): void {
    if (this.auth.isLoggedIn()) {
      this.loggedIn = true;
    }
  }

}

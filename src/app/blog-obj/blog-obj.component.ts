import { Component, OnInit, Input } from '@angular/core';
import { BlogModel } from '../models/blog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-blog-obj',
  templateUrl: './blog-obj.component.html',
  styleUrls: ['./blog-obj.component.css']
})
export class BlogObjComponent implements OnInit {

  @Input() blog: BlogModel;
  loggedIn = false;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    if (this.auth.isLoggedIn()) {
      this.loggedIn = true;
    }
  }

}

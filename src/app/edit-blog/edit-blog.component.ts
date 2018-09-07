import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { BlogModel } from '../models/blog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Constants } from '../services/constants';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  blog: BlogModel;
  form: FormGroup;
  images: String[] = [];
  loading = false;

  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      'content': new FormControl(null, [Validators.required]),
      'date': new FormControl(null, [Validators.required]),
      'title': new FormControl(null, [Validators.required])
    });
    this.loading = true;
    this.getBlog();
  }

  getBlog(): void {
    this.blogService.getBlogById(this.route.snapshot.paramMap.get('id'))
      .subscribe((data) => {
        if (data != null) {
          this.blog = data;
          this.loading = false;
        }
        for (let i = 0; i < this.blog.image.length; i++) {
          this.images.push(Constants.getFileUploadLocation() + this.blog.image[i]);
        }
      });
  }

}

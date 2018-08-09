import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { BlogModel } from '../models/blog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {

  form: FormGroup;

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'content': new FormControl(null, [Validators.required]),
      'date': new FormControl(null, [Validators.required])
    });
  }

  submit(form): void {
    const blog: BlogModel = new BlogModel(
      form.value.content,
      form.value.date
    );
    this.blogService.saveBlog(blog).subscribe(result => {
      console.log('saved');
    });
  }
}

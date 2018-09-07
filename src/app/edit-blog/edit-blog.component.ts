import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { BlogModel } from '../models/blog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Constants } from '../services/constants';
import { FileUploader } from 'ng2-file-upload';

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
  uploaded = false;
  submitted = false;
  deleted = false;
  data: string = null;
  uploader: FileUploader = new FileUploader({ url: Constants.getFileUploadUri() });
  fileToUpload: File = null;

  constructor(private blogService: BlogService, private route: ActivatedRoute) {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      const image = JSON.parse(response);
      this.blog.image.push(image['uploadname']);
      if (this.blog.image != null) {
        this.uploaded = true;
        this.updateBlogImages();
      }
    };
  }

  ngOnInit() {
    this.submitted = false;
    this.uploaded = false;
    this.deleted = false;
    this.form = new FormGroup({
      'content': new FormControl(null, [Validators.required]),
      'date': new FormControl(null, [Validators.required]),
      'title': new FormControl(null, [Validators.required])
    });
    this.loading = true;
    this.getBlog();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  updateBlogImages(): void {
    const blog: BlogModel = new BlogModel(
      this.blog.id,
      this.blog.content,
      this.blog.date,
      this.blog.title,
      this.blog.image
    );
    this.blogService.updateBlog(blog).subscribe((data) => {
      this.uploaded = true;
    });
    if (this.deleted) {
      location.reload();
    }
  }

  updateBlogContent(form): void {
    if (form.value.content && form.value.date && form.value.title != null) {
      const blog: BlogModel = new BlogModel(
        this.blog.id,
        form.value.content,
        form.value.date,
        form.value.title,
        this.blog.image
      );
      this.blogService.updateBlog(blog).subscribe((data) => {
        this.submitted = true;
      });
    }
    location.reload();
  }

  deleteImage(img: any): void {
    if (confirm('Are you sure you want to delete this image?')) {
      const image = img.substring(30, img.length);
      this.blog.image.splice(this.blog.image.indexOf(image), 1);
      this.deleted = true;
      this.updateBlogImages();
    } else {
      return;
    }
  }

  getBlog(): void {
    this.blogService.getBlogById(this.route.snapshot.paramMap.get('id'))
      .subscribe((data) => {
        if (data != null) {
          this.blog = data;
          this.loading = false;
        }
        this.getImageURLs();
        this.setFormValues();
      });
  }

  setFormValues(): void {
    this.form.controls.date.setValue(this.blog.date);
    this.form.controls.title.setValue(this.blog.title);
    this.form.controls.content.setValue(this.blog.content);
  }

  getImageURLs(): void {
    for (let i = 0; i < this.blog.image.length; i++) {
      this.images.push(Constants.getFileUploadLocation() + this.blog.image[i]);
    }
  }
}

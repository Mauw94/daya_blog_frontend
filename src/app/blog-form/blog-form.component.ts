import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { BlogModel } from '../models/blog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { Constants } from '../services/constants';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {

  form: FormGroup;
  submitted: boolean;
  data: any = null;
  error: String = '';
  uploader: FileUploader = new FileUploader({ url: Constants.getFileUploadUri() });
  fileToUpload: File = null;
  fileName: string = null;
  imagepath: string = null;
  attachmentList: any = [];
  uploaded = false;

  constructor(private blogService: BlogService) {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      let image = JSON.parse(response);
      this.fileName = image['uploadname'];
      if (this.fileName != null) {
        this.uploaded = true;
        this.imagepath = Constants.getAPiUrl() + 'uploads/' + this.fileName;
      }
      this.attachmentList.push(JSON.parse(response));
    };
  }

  ngOnInit() {
    this.submitted = false;
    this.form = new FormGroup({
      'content': new FormControl(null, [Validators.required]),
      'date': new FormControl(null, [Validators.required]),
      'title': new FormControl(null, [Validators.required])
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  submit(form): void {
    if (this.fileName == null) {
      if (confirm('No image has been uploaded, are you sure you want to post this blog?')) {
        this.postBlog(form);
      } else {
        return;
      }
    }
    this.error = null;
    this.postBlog(form);
  }

  private postBlog(form) {
    if (form.value.content && form.value.date && form.value.title != null) {
      const blog: BlogModel = new BlogModel(
        form.value.content,
        form.value.date,
        form.value.title,
        this.fileName
      );
      this.blogService.saveBlog(blog).subscribe(
        (data) => this.data = data);
      this.submitted = true;
    } else {
      this.error = 'Fill in all the fields!';
    }
    form.reset();
  }
}


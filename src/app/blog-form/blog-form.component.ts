import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { BlogModel } from '../models/blog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';

const uri = 'http://localhost:3000/file/upload';

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
  uploader: FileUploader = new FileUploader({ url: uri });
  fileToUpload: File = null;
  fileName: string = null;
  attachmentList: any = [];

  constructor(private blogService: BlogService) {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      const file = JSON.parse(response);
      this.fileName = file['uploadname'];
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

  submitFile(fileForm) {
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    /* api call here
    this.productService.addProductImage(formData).subscribe(data => {
      this.imageName = data['fileName'];
    }, error => {
      console.log(error);
    });
    */
  }

  submit(form): void {
    const blog: BlogModel = new BlogModel(
      form.value.content,
      form.value.date,
      form.value.title
    );
    this.blogService.saveBlog(blog).subscribe(
      (data) => this.data = data,
      (err) => this.error = err);
    this.submitted = true;
    form.reset();
  }
}


import { Component, OnInit, Input } from '@angular/core';
import { BlogModel } from '../models/blog';

@Component({
  selector: 'app-blog-obj',
  templateUrl: './blog-obj.component.html',
  styleUrls: ['./blog-obj.component.css']
})
export class BlogObjComponent implements OnInit {

  @Input() blog: BlogModel;
  constructor() { }

  ngOnInit() {
  }

}

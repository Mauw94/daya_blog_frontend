import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogService } from '../services/blog.service';
import { BlogModel } from '../models/blog';
import { Constants } from '../services/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  slideIndex = 0;
  slideIndexHotspot = 0;
  slideInterval;
  blogList: BlogModel[] = [];
  blogOne: BlogModel;
  blogTwo: BlogModel;
  blogThree: BlogModel;
  blogOneImage: string = null;
  blogTwoImage: string = null;
  blogThreeImage: string = null;

  constructor(private blogService: BlogService) {
  }

  ngOnInit() {
    // this needs some serious fixing, pls send a God.
    this.lastThreeBlogs();
    setTimeout(() => {
      this.slideIndex = 1;
      this.slideIndexHotspot = 0;
      this.showSlides(this.slideIndex);
      this.hotspotSlideShow();
      this.slideInterval = setInterval(() => {
        this.hotspotSlideShow();
      }, 2000);
    }, 2000);

  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  plusSlides(i): void {
    this.showSlides(this.slideIndex += i);
    console.log('clicked next slide');
  }

  currentSlide(n): void {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n): void {
    const slides = document.getElementsByClassName('mySlides');
    const dots = document.getElementsByClassName('dot');
    if (n > slides.length) { this.slideIndex = 1; }
    if (n < 1) { this.slideIndex = slides.length; }

    // tslint:disable-next-line:no-shadowed-variable
    for (let i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = 'none';
    }
    // tslint:disable-next-line:no-shadowed-variable
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    (slides[this.slideIndex - 1] as HTMLElement).style.display = 'block';
    dots[this.slideIndex - 1].className += ' active';
  }

  hotspotSlideShow() {
    const slides = document.getElementsByClassName('hotspotSlide');
    for (let i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = 'none';
    }
    this.slideIndexHotspot++;
    if (this.slideIndexHotspot > slides.length) { this.slideIndexHotspot = 1; }
    (slides[this.slideIndexHotspot - 1] as HTMLElement).style.display = 'block';
  }

  lastThreeBlogs() {
    this.blogService.getBlogs().subscribe((data) => {
      if (data != null) {
        const len = data.length;
        this.blogOne = data[len - 1];
        this.blogTwo = data[len - 2];
        this.blogThree = data[len - 3];
        this.blogOneImage = Constants.getFileUploadLocation() + data[len - 1].image[0];
        this.blogTwoImage = Constants.getFileUploadLocation() + data[len - 2].image[0];
        this.blogThreeImage = Constants.getFileUploadLocation() + data[len - 3].image[0];
      }
    });
  }
}

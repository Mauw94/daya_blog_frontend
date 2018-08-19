import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  slideIndex = 0;
  slideIndexHotspot = 0;
  slideInterval;
  constructor() {
  }

  ngOnInit() {
    this.slideIndex = 1;
    this.slideIndexHotspot = 0;
    this.showSlides(this.slideIndex);
    this.hotspotSlideShow();
    this.slideInterval = setInterval(() => {
      this.hotspotSlideShow();
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
}

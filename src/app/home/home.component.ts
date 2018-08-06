import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slideIndex = 0;
  constructor() {
  }

  ngOnInit() {
    this.slideIndex = 1;
    this.showSlides(this.slideIndex);
    console.log(this.slideIndex);
  }

  plusSlides(i): void {
    this.showSlides(this.slideIndex += i);
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
}

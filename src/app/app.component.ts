import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor() { }

  ngOnInit() {
    this.changeActiveClass();
  }

  changeActiveClass(): void {
    const navbar = document.getElementById('nav-bar');
    const items = navbar.getElementsByClassName('nav-item');

    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener('click', function () {
        const current = document.getElementsByClassName(' active');
        current[0].className = current[0].className.replace(' active', '');
        this.className += ' active';
      });
    }
  }
}

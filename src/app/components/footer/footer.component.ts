import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      const root = document.documentElement;

      if (savedTheme === 'dark') {
        root.classList.add('dark-mode');
      } else if (savedTheme === 'light') {
        root.classList.add('light-mode');
      }
    }
  }

  toggleTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const root = document.documentElement;
      const newTheme = root.classList.contains('dark-mode') ? 'light' : 'dark';

      // Toggle classes and save theme to localStorage
      root.classList.toggle('dark-mode', newTheme === 'dark');
      root.classList.toggle('light-mode', newTheme === 'light');
      localStorage.setItem('theme', newTheme);
    }
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  HeaderComponent, FooterComponent],
  template: `
  <div class="layout">
    <app-header />
    <main class="main-content">
      <router-outlet />
    </main>
    <app-footer />
  </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'test-app';
}

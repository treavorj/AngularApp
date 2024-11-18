import { Component, signal } from '@angular/core';
import { TerminalComponent } from '../components/terminal/terminal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TerminalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  message = signal('I bet you are here to find out more about Treavor');
}

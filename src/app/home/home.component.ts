import { Component, signal } from '@angular/core';
import { GreetingComponent } from '../components/greeting/greeting.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GreetingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  message = signal('I bet you are here to find out more about Treavor');

  keyUpHandler(event: KeyboardEvent) {
    console.log(`user typed ${event.key} in the input`);
  }
}

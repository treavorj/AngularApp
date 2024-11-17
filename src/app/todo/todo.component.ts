import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, TodoItemComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  newTodo: string = '';
  showArchived = signal<boolean>(false);

  constructor(public todoService: TodoService) {}

  addTodo() {
    this.todoService.addTodo(this.newTodo);
    this.newTodo = '';
  }

  toggleArchivedView() {
    this.showArchived.update((val) => !val);
  }
}

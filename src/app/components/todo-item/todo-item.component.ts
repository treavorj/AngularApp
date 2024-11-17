import { Component, input } from '@angular/core';
import { Todo } from '../../model/todo.type';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  todo = input.required<Todo>();
  constructor(private todoService: TodoService) {}

  markComplete(id: number) {
    this.todoService.toggleComplete(id);
  }

  archive(id: number) {
    this.todoService.toggleArchive(id);
  }

  delete(id: number) {
    this.todoService.deleteTodo(id);
  }
}

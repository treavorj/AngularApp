import { Injectable, signal } from '@angular/core';
import { Todo } from '../model/todo.type';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  TodoActive = signal<Todo[]>([
    {
      title: 'Realize the greatness of Treavor',
      id: 0,
      userId: 1,
      completed: true,
    },
    {
      title: "Appreciate Treavor's Confidence",
      id: 2,
      userId: 1,
      completed: true,
    },
    {
      title: 'Hire Treavor',
      id: 3,
      userId: 1,
      completed: false,
    },
  ]);
  TodoArchive = signal<Todo[]>([
    {
      title: 'Look at this website',
      id: 4,
      userId: 1,
      completed: true,
    },
  ]);

  addTodo(title: string, userId: number = 0) {
    let maxActiveId = this.TodoActive().reduce(
      (max, todo) => Math.max(max, todo.id),
      0
    );
    let maxArchiveId = this.TodoArchive().reduce(
      (max, todo) => Math.max(max, todo.id),
      0
    );
    const maxId = Math.max(maxActiveId, maxArchiveId);
    const newTodo: Todo = {
      userId: userId,
      id: maxId + 1,
      title: title,
      completed: false,
    };
    this.TodoActive.update((todos) => [...todos, newTodo]);
  }

  deleteTodo(id: number) {
    this.TodoActive.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  toggleComplete(id: number) {
    this.TodoActive.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  toggleArchive(id: number) {
    const todoActive = this.TodoActive().find((todo) => todo.id === id);
    if (!todoActive) {
      const todo = this.TodoArchive().find((todo) => todo.id === id);
      if (todo) {
        this.unarchiveTodo(todo);
      } else {
        console.log('unable to find todo with id: ', id);
      }
    } else {
      this.archiveTodo(todoActive);
    }
  }

  archiveTodo(todo: Todo) {
    this.TodoArchive.update((archiveTodos) => [...archiveTodos, todo]);
    this.TodoActive.update((todos) =>
      todos.filter((activeTodo) => activeTodo.id !== todo.id)
    );
  }

  unarchiveTodo(todo: Todo) {
    this.TodoActive.update((activeTodos) => [...activeTodos, todo]);
    this.TodoArchive.update((todos) =>
      todos.filter((archiveTodo) => archiveTodo.id !== todo.id)
    );
  }
}

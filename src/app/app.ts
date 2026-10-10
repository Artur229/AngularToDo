import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { TodoForm } from './components/todo-form/todo-form';
import { TodoItem } from './components/todo-item/todo-item';
import { TodoList } from './components/todo-list/todo-list';
import { TodoModal } from './components/todo-modal/todo-modal';

@Component({
  imports: [Header, TodoForm, TodoItem, TodoList, TodoModal],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('AngularToDo');
  isModalOpen = signal(false);

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
}
}


import { Component, inject, signal } from '@angular/core';
import { Header } from './components/header/header';
import { TodoForm } from './components/todo-form/todo-form';
import { TodoList } from './components/todo-list/todo-list';
import { TodoModal } from './components/todo-modal/todo-modal';
import { Task } from './models/task.model';
import { TaskService } from './services/task';

@Component({
  imports: [Header, TodoForm, TodoList, TodoModal],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly taskService = inject(TaskService);

  protected readonly title = signal('AngularToDo');
  readonly isModalOpen = signal(false);
  readonly selectedTask = signal<Task | null>(null);
  readonly newTaskTitle = signal('');
  readonly tasks = this.taskService.tasks;

  openAddModal(title: string) {
    this.selectedTask.set(null);
    this.newTaskTitle.set(title);
    this.isModalOpen.set(true);
  }

  openEditModal(task: Task) {
    this.selectedTask.set(task);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedTask.set(null);
    this.newTaskTitle.set('');
  }

  saveTask(updatedTask: Task) {
    if (this.selectedTask()) {
      this.taskService.updateTask(updatedTask);
    } else {
      this.taskService.addTask(updatedTask);
    }

    this.closeModal();
  }

  toggleTask(taskId: number) {
    this.taskService.toggleTask(taskId);
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId);
  }
}


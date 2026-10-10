import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly tasks = signal<Task[]>([
    {
      id: 1,
      title: 'Learn Angular components',
      description: 'Understand standalone components, inputs and outputs.',
      priority: 'high',
      completed: true,
    },
    {
      id: 2,
      title: 'Build a Todo App',
      description: 'Connect the UI to working task state.',
      priority: 'medium',
      completed: false,
    },
    {
      id: 3,
      title: 'Learn Angular signals',
      description: 'Use signals for reactive application state.',
      priority: 'low',
      completed: false,
    },
  ]);

  addTask(task: Task) {
    this.tasks.update((tasks) => [...tasks, task]);
  }

  updateTask(updatedTask: Task) {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  }

  deleteTask(id: number) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  toggleTask(id: number) {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task,
      ),
    );
  }
}

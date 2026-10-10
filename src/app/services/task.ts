import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskPriority } from '../models/task.model';

type ApiTodo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';

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

  loadTasks() {
    this.http.get<ApiTodo[]>(this.apiUrl).subscribe({
      next: (todos) => {
        const priorities: TaskPriority[] = ['high', 'medium', 'low'];

        this.tasks.set(
          todos.slice(0, 20).map((todo, index) => ({
            id: todo.id,
            title: todo.title,
            description: '',
            completed: todo.completed,
            priority: priorities[index % priorities.length],
          })),
        );
      },
      error: (error) => console.error('Load failed:', error),
    });
  }

  addTask(task: Task) {
    this.tasks.update((tasks) => [...tasks, task]);

    this.http
      .post<ApiTodo>(this.apiUrl, {
        title: task.title,
        completed: task.completed,
        userId: 1,
      })
      .subscribe({
        error: (error) => console.error('Create failed:', error),
      });
  }

  updateTask(updatedTask: Task) {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );

    if (this.isApiTask(updatedTask.id)) {
      this.http
        .patch<ApiTodo>(`${this.apiUrl}/${updatedTask.id}`, {
          title: updatedTask.title,
          completed: updatedTask.completed,
        })
        .subscribe({
          error: (error) => console.error('Update failed:', error),
        });
    }
  }

  deleteTask(id: number) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));

    if (this.isApiTask(id)) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        error: (error) => console.error('Delete failed:', error),
      });
    }
  }

  toggleTask(id: number) {
    const currentTask = this.tasks().find((task) => task.id === id);

    if (!currentTask) {
      return;
    }

    this.updateTask({
      ...currentTask,
      completed: !currentTask.completed,
    });
  }

  private isApiTask(id: number) {
    return id >= 1 && id <= 200;
  }
}

import { Component, computed, input, output, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { TodoItem } from '../todo-item/todo-item';

@Component({
  imports: [TodoItem],
  selector: 'app-todo-list',
  styleUrl: './todo-list.css',
  templateUrl: './todo-list.html',
})
export class TodoList {
  readonly tasks = input.required<readonly Task[]>();
  readonly editTask = output<Task>();
  readonly toggleTask = output<number>();
  readonly deleteTask = output<number>();

  readonly remainingCount = computed(
    () => this.tasks().filter((task) => !task.completed).length,
  );
  readonly filter = signal<'all' | 'completed' | 'active'>('all');
  readonly sortByPriority = signal(false);

  visibleTasks = computed(() => {
    let tasks = [...this.tasks()];

    if (this.filter() === 'completed') {
      tasks = tasks.filter((task) => task.completed);
    }

    if (this.filter() === 'active') {
      tasks = tasks.filter((task) => !task.completed);
    }

    if (this.sortByPriority()) {
      const order = { high: 0, medium: 1, low: 2 };

      tasks.sort((a, b) => order[a.priority] - order[b.priority]);
    }

    return tasks;
  });
}

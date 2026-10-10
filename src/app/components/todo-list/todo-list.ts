import { Component, computed, input, output } from '@angular/core';
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
}

import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  imports: [],
  selector: 'app-todo-item',
  styleUrl: './todo-item.css',
  templateUrl: './todo-item.html',
})
export class TodoItem {
  readonly task = input.required<Task>();
  readonly edit = output<Task>();
  readonly toggle = output<number>();
  readonly remove = output<number>();
}

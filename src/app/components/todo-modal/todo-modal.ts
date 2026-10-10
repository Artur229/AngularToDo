import { Component, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskPriority } from '../../models/task.model';

@Component({
  imports: [FormsModule],
  selector: 'app-todo-modal',
  styleUrl: './todo-modal.css',
  templateUrl: './todo-modal.html',
})
export class TodoModal {
  readonly task = input<Task | null>(null);
  readonly initialTitle = input('');
  readonly close = output<void>();
  readonly save = output<Task>();

  title = '';
  description = '';
  priority: TaskPriority = 'medium';
  completed = false;
  isEditing = false;

  constructor() {
    effect(() => {
      const task = this.task();
      const initialTitle = this.initialTitle();

      this.title = task?.title ?? initialTitle;
      this.description = task?.description ?? '';
      this.priority = task?.priority ?? 'medium';
      this.completed = task?.completed ?? false;
      this.isEditing = task === null;
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveTask() {
    const title = this.title.trim();

    if (!this.isEditing || !title) {
      return;
    }

    this.save.emit({
      id: this.task()?.id ?? Date.now(),
      title,
      description: this.description.trim(),
      priority: this.priority,
      completed: this.completed,
    });
  }

  closeModal() {
    this.close.emit();
  }
}

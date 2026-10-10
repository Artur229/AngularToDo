import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-todo-form',
  styleUrl: './todo-form.css',
  templateUrl: './todo-form.html',
})
export class TodoForm {
  readonly addTask = output<string>();
  title = '';

  submitTask() {
    const title = this.title.trim();
    this.addTask.emit(title);
    this.title = '';
  }
}

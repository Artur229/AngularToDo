import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the main components with the modal closed', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.querySelector('app-todo-form')).toBeTruthy();
    expect(compiled.querySelector('app-todo-list')).toBeTruthy();
    expect(compiled.querySelector('app-todo-item')).toBeTruthy();
    expect(compiled.querySelector('app-todo-modal')).toBeFalsy();
  });

  it('should open the modal from the Add form', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector(
      'input[name="new-task"]',
    ) as HTMLInputElement;
    const form = fixture.nativeElement.querySelector(
      'form.todo-form',
    ) as HTMLFormElement;

    input.value = 'New task';
    input.dispatchEvent(new Event('input'));
    form.dispatchEvent(new Event('submit'));
    await fixture.whenStable();

    const modal = fixture.nativeElement.querySelector('app-todo-modal');
    const modalTitle = modal?.querySelector(
      'input[name="title"]',
    ) as HTMLInputElement;

    expect(modal).toBeTruthy();
    expect(modalTitle.value).toBe('New task');
  });
});

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.shell.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gapsi-e-commerce');
}

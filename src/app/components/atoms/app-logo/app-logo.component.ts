import { Component, input } from '@angular/core';

@Component({
  selector: 'app-app-logo',
  standalone: true,
  templateUrl: './app-logo.component.html',
  styleUrl: './app-logo.component.css',
})
export class AppLogo {
  public readonly src = input<string>('/assets/logos/gapsi-logo.svg');
  public readonly alt = input<string>('Gapsi');
  public readonly height = input<number>(28);
}

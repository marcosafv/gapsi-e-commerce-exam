import { Component, input } from '@angular/core';
import { AppLogo } from '../../atoms/app-logo/app-logo.component';
import { Navbar } from '../navbar/navbar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AppLogo, Navbar],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class Header {
  public readonly title = input<string>('e-Commerce Gapsi');
  public readonly logoSrc = input<string>('/assets/logos/logo.png');
}

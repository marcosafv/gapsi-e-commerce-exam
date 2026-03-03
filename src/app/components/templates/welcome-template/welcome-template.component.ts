import { Component, input } from '@angular/core';
import { Header } from '../../organisms/header/header.component';
import { WelcomeCard } from '../../molecules/welcome-card/welcome-card.component';

@Component({
  selector: 'app-welcome-template',
  standalone: true,
  imports: [Header, WelcomeCard],
  templateUrl: './welcome-template.component.html',
  styleUrl: './welcome-template.component.css',
})
export class WelcomeTemplate {
  public readonly candidateName = input<string>('Candidato 01');
  public readonly appVersion = input<string>('v0.0.0');
}

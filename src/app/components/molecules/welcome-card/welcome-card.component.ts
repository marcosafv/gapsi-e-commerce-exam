import { Component, input } from '@angular/core';
import { CandidateAvatar } from '../../atoms/candidate-avatar/candidate-avatar.component';

@Component({
  selector: 'app-welcome-card',
  standalone: true,
  imports: [CandidateAvatar],
  templateUrl: './welcome-card.component.html',
  styleUrl: './welcome-card.component.css',
})
export class WelcomeCard {
  public readonly candidateName = input<string>('Candidato 01');
  public readonly appVersion = input<string>('v0.0.0');
  public readonly candidateImageSrc = input<string>('/assets/images/candidate.jpg');
}

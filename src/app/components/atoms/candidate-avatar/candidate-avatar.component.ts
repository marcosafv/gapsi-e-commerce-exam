import { Component, input } from '@angular/core';

const DEFAULT_AVATAR_DATA_URI =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#111827"/>
          <stop offset="1" stop-color="#374151"/>
        </linearGradient>
      </defs>
      <circle cx="128" cy="128" r="128" fill="url(#g)"/>
      <circle cx="128" cy="104" r="44" fill="#ffffff" opacity="0.18"/>
      <path d="M64 208c8-40 40-64 64-64s56 24 64 64" fill="#ffffff" opacity="0.18"/>
    </svg>`
  );

@Component({
  selector: 'app-candidate-avatar',
  standalone: true,
  templateUrl: './candidate-avatar.component.html',
  styleUrl: './candidate-avatar.component.css',
})
export class CandidateAvatar {
  public readonly src = input<string>('/assets/images/candidate.jpg');
  public readonly alt = input<string>('Candidate');
  public readonly size = input<number>(128);

  protected onImgError(event: Event): void {
    const img = event.target as HTMLImageElement | null;
    if (!img) return;
    if (img.src === DEFAULT_AVATAR_DATA_URI) return;
    img.src = DEFAULT_AVATAR_DATA_URI;
  }
}

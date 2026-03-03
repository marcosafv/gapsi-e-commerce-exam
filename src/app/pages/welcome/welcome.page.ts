import { Component, inject, OnInit, signal } from '@angular/core'; // 1. Importamos signal y OnInit
import { WelcomeTemplate } from '../../components/templates/welcome-template/welcome-template.component';
import { VisitorService } from '../../core/services/visitor.service';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [WelcomeTemplate],
  templateUrl: './welcome.page.html',
})
export class WelcomePage implements OnInit { // 2. Implementamos OnInit
  private readonly visitorService = inject(VisitorService);

  // 3. Usamos Signals para el estado
  protected candidateName = signal<string>('Cargando...');
  protected appVersion = signal<string>('');

  ngOnInit(): void {
    this.loadVisitorData();
  }

  private loadVisitorData(): void {
    this.visitorService.createVisitor().subscribe({
        next: (result) => {
          const data = result.data;
          if (!data) return;
          this.candidateName.set(data.welcome ?? '');
          this.appVersion.set(data.version ?? '');
        },
        error: () => {
          this.candidateName.set('Hola, Candidato 01');
          this.appVersion.set('v.0.0.1');
        },
      });
  }
}

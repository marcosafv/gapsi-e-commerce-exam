import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.generated';
import { CreateVisitorWrapper } from '../../shared/models/visitor.model';

@Injectable({ providedIn: 'root' })
export class VisitorService {
  private readonly http = inject(HttpClient);

  public createVisitor(): Observable<CreateVisitorWrapper> {
    return this.http.post<CreateVisitorWrapper>(`${environment.apiBaseUrl}visitors`, {});
  }
}

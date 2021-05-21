import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ServerStatusService {
  constructor(private api: ApiService) {}

  getStatus(): Observable<{ status: string }> {
    return this.api.get('status');
  }
}

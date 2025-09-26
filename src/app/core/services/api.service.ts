import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiBaseUrl;
  private endpoints = environment.api;

  get loginUrl(): string {
    return `${this.baseUrl}${this.endpoints.login}`;
  }

  get usersUrl(): string {
    return `${this.baseUrl}${this.endpoints.users}`;
  }

  get contractsUrl(): string {
    return `${this.baseUrl}${this.endpoints.contracts}`;
  }
}


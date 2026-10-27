import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * HTTP integration boundary.
 *
 * Business pages should depend on this service instead of using HttpClient
 * directly. Endpoint methods will be added in the next implementation commit.
 */
@Injectable({ providedIn: 'root' })
export class CheckoutApiService {

  private readonly baseUrl = 'http://localhost:8080/operations';

  constructor(private readonly http: HttpClient) {
  }
}

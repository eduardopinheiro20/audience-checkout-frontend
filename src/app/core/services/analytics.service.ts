import { Injectable } from '@angular/core';

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
}

/**
 * Analytics abstraction.
 *
 * The initial implementation logs events locally.
 * A GA/GTM adapter can be introduced later without coupling pages to a vendor.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  track(event: AnalyticsEvent): void {
    console.info('[analytics]', event.name, event.properties ?? {});
  }
}

import { Injectable, computed, signal } from '@angular/core';
import {
  CheckoutResultState,
  PreCheckoutResponse
} from '../../../core/models/checkout.models';

/**
 * Feature-scoped state boundary.
 *
 * Signals keep state explicit and easy to read.
 * Persistence/rehydration will be added when implementing the required
 * direct-URL/refresh behavior.
 */
@Injectable({ providedIn: 'root' })
export class CheckoutStateService {

  private readonly cartSignal = signal<PreCheckoutResponse | null>(null);
  private readonly resultSignal = signal<CheckoutResultState | null>(null);

  readonly cart = this.cartSignal.asReadonly();
  readonly result = this.resultSignal.asReadonly();

  readonly hasCart = computed(() => this.cartSignal() !== null);
  readonly hasResult = computed(() => this.resultSignal() !== null);

  setCart(cart: PreCheckoutResponse): void {
    this.cartSignal.set(cart);
  }

  setResult(result: CheckoutResultState): void {
    this.resultSignal.set(result);
  }

  reset(): void {
    this.cartSignal.set(null);
    this.resultSignal.set(null);
  }
}

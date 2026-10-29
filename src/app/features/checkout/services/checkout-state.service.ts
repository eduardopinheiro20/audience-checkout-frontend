import { Injectable, computed, signal } from '@angular/core';
import {
  ApiErrorResponse,
  CheckoutResponse,
  PaymentMethodResponse,
  PreCheckoutResponse,
  ProductResponse
} from '../../../core/api/checkout-api.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutStateService {

  private readonly cartIdSignal = signal<string | null>(null);
  private readonly productsSignal = signal<ProductResponse[]>([]);
  private readonly paymentMethodsSignal = signal<PaymentMethodResponse[]>([]);
  private readonly selectedPaymentMethodSignal = signal<string | null>(null);
  private readonly hasResultSignal = signal(false);
  private readonly checkoutResultSignal = signal<CheckoutResponse | null>(null);
  private readonly checkoutErrorSignal =
  signal<ApiErrorResponse | null>(null);

readonly checkoutError =
  this.checkoutErrorSignal.asReadonly();

  readonly hasResult = this.hasResultSignal.asReadonly();
  readonly cartId = this.cartIdSignal.asReadonly();
  readonly products = this.productsSignal.asReadonly();
  readonly paymentMethods = this.paymentMethodsSignal.asReadonly();
  readonly selectedPaymentMethod = this.selectedPaymentMethodSignal.asReadonly();
  readonly checkoutResult = this.checkoutResultSignal.asReadonly();

  readonly hasCheckoutData = computed(
    () =>
      this.cartIdSignal() !== null &&
      this.productsSignal().length > 0
  );

  readonly totalAmount = computed(() =>
    this.productsSignal()
      .reduce(
        (total, product) => total + product.price,
        0
      )
  );

  setPreCheckout(response: PreCheckoutResponse): void {
    this.cartIdSignal.set(response.cartId);
    this.productsSignal.set(response.products);
    this.paymentMethodsSignal.set(response.paymentMethods);
  }

  setCheckoutResult(result: CheckoutResponse): void {
  this.checkoutResultSignal.set(result);
  this.checkoutErrorSignal.set(null);
  this.hasResultSignal.set(true);
  }

  setCheckoutError(error: ApiErrorResponse): void {
    this.checkoutErrorSignal.set(error);
    this.checkoutResultSignal.set(null);
    this.hasResultSignal.set(true);
  }

  selectPaymentMethod(paymentMethod: string | null): void {
    this.selectedPaymentMethodSignal.set(paymentMethod);
  }

  clear(): void {
    this.cartIdSignal.set(null);
    this.productsSignal.set([]);
    this.paymentMethodsSignal.set([]);
    this.selectedPaymentMethodSignal.set(null);
    this.hasResultSignal.set(false);
    this.checkoutResultSignal.set(null);
    this.checkoutErrorSignal.set(null);
  }

  markResult(): void {
    this.hasResultSignal.set(true);
  }
}
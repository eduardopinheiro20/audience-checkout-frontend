import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProductSelectionRequest {
  slug: string;
}

export interface PreCheckoutRequest {
  products: ProductSelectionRequest[];
}

export interface ProductResponse {
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
}

export interface PaymentMethodResponse {
  name: string;
}

export interface PreCheckoutResponse {
  cartId: string;
  products: ProductResponse[];
  paymentMethods: PaymentMethodResponse[];
}

export interface CardRequest {
  holderName: string;
  number: string;
  expiry: string;
  cvv: string;
}

export interface PaymentMethodRequest {
  name: string;
  card: CardRequest | null;
}

export interface CheckoutRequest {
  cartId: string;
  paymentMethod: PaymentMethodRequest;
}

export interface CheckoutPaymentResponse {
  method: string;
  lastDigits: string | null;
  pixCode: string | null;
  amount: number;
  currency: string;
}

export interface CheckoutProductResponse {
  slug: string;
  name: string;
  price: number;
}

export interface CheckoutResponse {
  cartId: string;
  status: string;
  paidAt: string;
  payment: CheckoutPaymentResponse;
  products: CheckoutProductResponse[];
}

@Injectable({
  providedIn: 'root'
})
export class CheckoutApiService {

  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:8080';

  preCheckout(
    request: PreCheckoutRequest
  ): Observable<PreCheckoutResponse> {
    return this.http.post<PreCheckoutResponse>(
      `${this.baseUrl}/operations/pre-checkout`,
      request
    );
  }

  checkout(
    request: CheckoutRequest
  ): Observable<CheckoutResponse> {
    return this.http.post<CheckoutResponse>(
      `${this.baseUrl}/operations/checkout`,
      request
    );
  }

}

export interface ErrorButtonResponse {
  label: string;
  url: string;
}

export interface FrontendErrorResponse {
  code: string;
  title: string;
  description: string;
  primaryButton: ErrorButtonResponse;
  secondaryButton: ErrorButtonResponse | null;
}

export interface ApiErrorResponse {
  displayType: string;
  errorCode: string;
  cartId: string | null;
  frontendError: FrontendErrorResponse;
}

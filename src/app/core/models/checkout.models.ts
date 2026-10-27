export interface Product {
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
}

export interface PaymentMethod {
  name: string;
}

export interface PreCheckoutResponse {
  cartId: string;
  products: Product[];
  paymentMethods: PaymentMethod[];
}

export type CheckoutResultType = 'SUCCESS' | 'ERROR';

export interface CheckoutResultState {
  type: CheckoutResultType;
  cartId: string;
}

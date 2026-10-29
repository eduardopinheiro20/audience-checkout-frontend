import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-processing',
  standalone: true,
  imports: [
    TranslatePipe,
    CurrencyPipe
  ],
  templateUrl: './payment-processing.component.html'
})
export class PaymentProcessingComponent {

  readonly cartId = input.required<string>();
  readonly productName = input.required<string>();
  readonly paymentMethod = input.required<string>();
  readonly amount = input.required<number>();
  readonly currency = input.required<string>();

  getOrderReference(): string {
    return this.cartId()
      .replaceAll('-', '')
      .substring(0, 8)
      .toUpperCase();
  }
}
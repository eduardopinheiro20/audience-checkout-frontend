import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

import { CheckoutStateService } from '../../services/checkout-state.service';
import { CheckoutStepperComponent } from '../payment/components/checkout-stepper/checkout-stepper.component';
import { CheckoutNavbarComponent } from '../payment/components/checkout-navbar/checkout-navbar.component';

@Component({
  selector: 'app-success-page',
  standalone: true,
  imports: [
    CheckoutNavbarComponent,
    TranslatePipe,
    DatePipe,
    CurrencyPipe,
    CheckoutStepperComponent
  ],
  templateUrl: './success-page.component.html',
  styleUrl: './success-page.component.scss'
})
export class SuccessPageComponent {

  readonly checkoutState = inject(CheckoutStateService);

  accessMySpace(): void {
    console.log('Access my space');
  }

  viewReceipt(): void {
    console.log('View receipt');
  }

  getOrderReference(cartId: string): string {
    return cartId
      .replaceAll('-', '')
      .substring(0, 8)
      .toUpperCase();
  }

  getNextRenewalDate(paidAt: string): Date {
    const renewalDate = new Date(paidAt);

    renewalDate.setMonth(
      renewalDate.getMonth() + 1
    );

    return renewalDate;
  }
}
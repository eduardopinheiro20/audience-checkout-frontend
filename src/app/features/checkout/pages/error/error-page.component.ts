import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { CheckoutStateService } from '../../services/checkout-state.service';
import { CheckoutStepperComponent } from '../payment/components/checkout-stepper/checkout-stepper.component';
import { CheckoutNavbarComponent } from '../payment/components/checkout-navbar/checkout-navbar.component';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [
    TranslatePipe,
    CurrencyPipe,
    CheckoutStepperComponent,
    CheckoutNavbarComponent
  ],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent {

  private readonly router = inject(Router);

  readonly checkoutState = inject(CheckoutStateService);

  tryAgain(): void {
    this.router.navigate(['/checkout/payment']);
  }

  changePaymentMethod(): void {
    this.checkoutState.selectPaymentMethod(null);

    this.router.navigate(['/checkout/payment']);
  }

  getOrderReference(cartId: string): string {
    return cartId
      .replaceAll('-', '')
      .substring(0, 8)
      .toUpperCase();
  }
}
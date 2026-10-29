import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  CurrencyPipe
} from '@angular/common';

import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {CheckoutStateService} from '../../services/checkout-state.service';
import {CardPaymentFormComponent} from './components/card-payment-form.component';
import {PixPaymentComponent} from './components/pix-payment/pix-payment.component';
import {PaymentProcessingComponent} from './components/payment-processing/payment-processing.component';
import {CheckoutStepperComponent} from './components/checkout-stepper/checkout-stepper.component';
import {CheckoutApiService} from '../../../../core/api/checkout-api.service';
import type {
  ApiErrorResponse,
  CheckoutRequest
} from '../../../../core/api/checkout-api.service';
import { CheckoutNavbarComponent } from './components/checkout-navbar/checkout-navbar.component';


@Component({
  selector: 'app-payment-page',
  standalone: true,

  imports: [
    CheckoutNavbarComponent,
    ReactiveFormsModule,
    CardPaymentFormComponent,
    PixPaymentComponent,
    PaymentProcessingComponent,
    CheckoutStepperComponent,
    TranslatePipe,
    CurrencyPipe

  ],

  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.scss'
})
export class PaymentPageComponent implements OnInit {

  private readonly checkoutApi =
    inject(CheckoutApiService);

  private readonly formBuilder =
    inject(FormBuilder);

  private readonly router =
    inject(Router);


  readonly checkoutState =
    inject(CheckoutStateService);

  readonly processing =
    signal(false);

  readonly loading =
    signal(true);

  readonly errorMessage =
    signal<string | null>(null);


  readonly cardForm =
    this.formBuilder.nonNullable.group({

      holderName: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      number: [
        '',
        [
          Validators.required,
          Validators.pattern(
             /^\d{4} \d{4} \d{4} \d{4}$/
          )
        ]
      ],

      expiry: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(0[1-9]|1[0-2])\/\d{2}$/
          )
        ]
      ],

      cvv: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[0-9]{3,4}$/
          )
        ]
      ]

    });


  ngOnInit(): void {
    this.loadCheckout();
  }


  selectPaymentMethod(
    paymentMethod: string
  ): void {

    this.checkoutState
      .selectPaymentMethod(paymentMethod);

    if (!this.isCardPayment()) {
      this.cardForm.reset();
    }

  }


  isCardPayment(): boolean {

    const paymentMethod =
      this.checkoutState
        .selectedPaymentMethod();

    return paymentMethod === 'Credit Card'
      || paymentMethod === 'Debit Card';

  }


  isPixPayment(): boolean {

    return this.checkoutState
      .selectedPaymentMethod() === 'Pix';

  }


  private loadCheckout(): void {

    this.loading.set(true);
    this.errorMessage.set(null);

    this.checkoutApi
      .preCheckout({
        products: [
          {
            slug: 'premium'
          }
        ]
      })
      .subscribe({

        next: response => {

          this.checkoutState
            .setPreCheckout(response);


          /*
           * Credit Card is the default payment method.
           *
           * If it is not returned by the backend,
           * the first available method is selected.
           */
          const defaultPaymentMethod =
            response.paymentMethods.find(
              paymentMethod =>
                paymentMethod.name === 'Credit Card'
            )
            ?? response.paymentMethods[0];


          if (defaultPaymentMethod) {

            this.selectPaymentMethod(
              defaultPaymentMethod.name
            );

          }


          this.loading.set(false);

        },


        error: () => {

          this.errorMessage.set(
            'Unable to load checkout.'
          );

          this.loading.set(false);

        }

      });

  }


  confirmPayment(): void {

    const cartId =
      this.checkoutState.cartId();

    const paymentMethod =
      this.checkoutState
        .selectedPaymentMethod();


    if (!cartId || !paymentMethod) {
      return;
    }


    if (
      this.isCardPayment()
      && this.cardForm.invalid
    ) {

      this.cardForm.markAllAsTouched();

      return;

    }


    const request: CheckoutRequest = {

      cartId,

      paymentMethod: {

        name: paymentMethod,

        card: this.isCardPayment()
          ? this.cardForm.getRawValue()
          : null

      }

    };


    this.processing.set(true);


    this.checkoutApi
      .checkout(request)
      .subscribe({

        next: response => {

          setTimeout(() => {

            this.checkoutState
              .setCheckoutResult(response);

            this.processing.set(false);

            this.router.navigate([
              '/checkout/success'
            ]);

          }, 1500);

        },


        error: (
          httpError: HttpErrorResponse
        ) => {

          setTimeout(() => {

            const error =
              httpError.error as ApiErrorResponse;

            this.checkoutState
              .setCheckoutError(error);

            this.processing.set(false);

            this.router.navigate([
              '/checkout/error'
            ]);

          }, 1500);

        }

      });

  }

}
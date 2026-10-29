import {
  Routes
} from '@angular/router';

import {
  checkoutSuccessGuard
} from './core/guards/checkout-success.guard';

import {
  checkoutErrorGuard
} from './core/guards/checkout-error.guard';

export const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'checkout/payment'
  },

  {
    path: 'checkout/payment',
    loadComponent: () =>
      import(
        './features/checkout/pages/payment/payment-page.component'
      ).then(
        m => m.PaymentPageComponent
      )
  },

  {
    path: 'checkout/success',
    canActivate: [
      checkoutSuccessGuard
    ],
    loadComponent: () =>
      import(
        './features/checkout/pages/success/success-page.component'
      ).then(
        m => m.SuccessPageComponent
      )
  },

  {
    path: 'checkout/error',
    canActivate: [
      checkoutErrorGuard
    ],
    loadComponent: () =>
      import(
        './features/checkout/pages/error/error-page.component'
      ).then(
        m => m.ErrorPageComponent
      )
  },

  {
    path: '**',
    redirectTo: 'checkout/payment'
  }

];
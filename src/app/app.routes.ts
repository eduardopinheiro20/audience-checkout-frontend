import { Routes } from '@angular/router';
import { checkoutResultGuard } from './core/guards/checkout-result.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'checkout/payment'
  },
  {
    path: 'checkout/payment',
    loadComponent: () =>
      import('./features/checkout/pages/payment/payment-page.component')
        .then((module) => module.PaymentPageComponent)
  },
  {
    path: 'checkout/success',
    canActivate: [checkoutResultGuard],
    loadComponent: () =>
      import('./features/checkout/pages/success/success-page.component')
        .then((module) => module.SuccessPageComponent)
  },
  {
    path: 'checkout/error',
    canActivate: [checkoutResultGuard],
    loadComponent: () =>
      import('./features/checkout/pages/error/error-page.component')
        .then((module) => module.ErrorPageComponent)
  },
  {
    path: '**',
    redirectTo: 'checkout/payment'
  }
];

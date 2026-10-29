import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';

import {
  CheckoutStateService
} from '../../features/checkout/services/checkout-state.service';

export const checkoutErrorGuard: CanActivateFn = () => {
  const checkoutState =
    inject(CheckoutStateService);

  const router =
    inject(Router);

  const error =
    checkoutState.checkoutError();

  if (error) {
    return true;
  }

  return router.createUrlTree([
    '/checkout/payment'
  ]);
};
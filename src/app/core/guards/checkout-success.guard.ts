import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';

import {
  CheckoutStateService
} from '../../features/checkout/services/checkout-state.service';

export const checkoutSuccessGuard: CanActivateFn = () => {
  const checkoutState =
    inject(CheckoutStateService);

  const router =
    inject(Router);

  const result =
    checkoutState.checkoutResult();

  if (
    result &&
    result.status === 'APPROVED'
  ) {
    return true;
  }

  return router.createUrlTree([
    '/checkout/payment'
  ]);
};
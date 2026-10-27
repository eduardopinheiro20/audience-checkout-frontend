import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CheckoutStateService } from '../../features/checkout/services/checkout-state.service';

/**
 * Protects result pages from direct access without checkout state.
 */
export const checkoutResultGuard: CanActivateFn = () => {
  const state = inject(CheckoutStateService);
  const router = inject(Router);

  return state.hasResult()
    ? true
    : router.createUrlTree(['/checkout/payment']);
};

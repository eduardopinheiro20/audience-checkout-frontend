import { Component } from '@angular/core';
import { BrandHeaderComponent } from '../../../../shared/components/brand-header/brand-header.component';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [BrandHeaderComponent],
  template: `
    <main class="checkout-shell">
      <div class="container">
        <app-brand-header />

        <div class="row justify-content-center">
          <div class="col-12 col-lg-10">
            <div class="card checkout-card">
              <div class="card-body p-4 p-lg-5">
                <span class="badge text-bg-light mb-3">Payment</span>
                <h1 class="h3 mb-2">Complete your subscription</h1>
                <p class="text-muted-app mb-4">
                  The payment form and product summary will be implemented
                  in the next commit.
                </p>

                <div class="alert alert-primary mb-0">
                  Initial Angular architecture is ready.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  `
})
export class PaymentPageComponent {
}

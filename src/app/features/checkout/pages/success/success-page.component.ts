import { Component } from '@angular/core';
import { BrandHeaderComponent } from '../../../../shared/components/brand-header/brand-header.component';

@Component({
  selector: 'app-success-page',
  standalone: true,
  imports: [BrandHeaderComponent],
  template: `
    <main class="checkout-shell">
      <div class="container">
        <app-brand-header />

        <div class="row justify-content-center">
          <div class="col-12 col-md-8">
            <div class="card checkout-card">
              <div class="card-body p-5 text-center">
                <div class="display-6 mb-3">✓</div>
                <h1 class="h3">Payment confirmed</h1>
                <p class="text-muted-app mb-0">
                  The final payment summary will be implemented later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  `
})
export class SuccessPageComponent {
}

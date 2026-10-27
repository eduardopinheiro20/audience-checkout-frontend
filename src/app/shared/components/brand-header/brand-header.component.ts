import { Component } from '@angular/core';

@Component({
  selector: 'app-brand-header',
  standalone: true,
  template: `
    <header class="d-flex align-items-center gap-2 mb-4">
      <div class="brand-mark">A</div>
      <div>
        <strong>Audience Checkout</strong>
        <div class="small text-muted-app">Secure subscription experience</div>
      </div>
    </header>
  `,
  styles: [`
    .brand-mark {
      width: 2rem;
      height: 2rem;
      border-radius: .6rem;
      display: grid;
      place-items: center;
      color: #fff;
      background: var(--app-primary);
      font-weight: 700;
    }
  `]
})
export class BrandHeaderComponent {
}

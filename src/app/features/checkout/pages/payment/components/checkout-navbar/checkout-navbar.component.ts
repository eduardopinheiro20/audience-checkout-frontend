import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout-navbar',
  standalone: true,
  imports: [
    TranslatePipe
  ],
  templateUrl: './checkout-navbar.component.html'
})
export class CheckoutNavbarComponent {
}
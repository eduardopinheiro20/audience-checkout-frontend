import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout-stepper',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './checkout-stepper.component.html'
})
export class CheckoutStepperComponent {

  readonly currentStep = input.required<number>();

}
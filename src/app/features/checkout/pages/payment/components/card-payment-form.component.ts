import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-card-payment-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './card-payment-form.component.html'
})
export class CardPaymentFormComponent {

  readonly form = input.required<FormGroup>();

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form().get(fieldName);

    return !!field
      && field.invalid
      && (field.dirty || field.touched);
  }

formatCardNumber(event: Event): void {
  const input = event.target as HTMLInputElement;

  const digits = input.value
    .replace(/\D/g, '')
    .slice(0, 16);

  const formatted = digits
    .match(/.{1,4}/g)
    ?.join(' ') ?? '';

  this.form()
    .get('number')
    ?.setValue(formatted, {
      emitEvent: false
    });
}

  cardBrand(): string | null {
    const number = this.form()
      .get('number')
      ?.value
      ?.toString()
      .replace(/\D/g, '') ?? '';

    if (!number) {
      return null;
    }

    if (/^4/.test(number)) {
      return 'Visa';
    }

    if (
      /^(5[1-5])/.test(number)
      || this.isMastercardTwoSeries(number)
    ) {
      return 'Mastercard';
    }

    return null;
  }

  private isMastercardTwoSeries(number: string): boolean {
    if (number.length < 4) {
      return false;
    }

    const prefix = Number(number.substring(0, 4));

    return prefix >= 2221 && prefix <= 2720;
  }
}
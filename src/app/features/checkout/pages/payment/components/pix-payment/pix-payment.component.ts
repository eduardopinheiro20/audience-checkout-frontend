import {
  Component,
  OnInit,
  signal
} from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';
import QRCode from 'qrcode';

@Component({
  selector: 'app-pix-payment',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './pix-payment.component.html'
})
export class PixPaymentComponent implements OnInit {

  readonly pixCode =
    '00020126580014BR.GOV.BCB.PIX0136AUDIENCE-CHECKOUT-DEMO5204000053039865802BR';

  readonly qrCodeDataUrl = signal<string | null>(null);
  readonly copied = signal(false);

  ngOnInit(): void {
    this.generateQrCode();
  }

  async copyPixCode(): Promise<void> {
    await navigator.clipboard.writeText(this.pixCode);

    this.copied.set(true);

    setTimeout(() => {
      this.copied.set(false);
    }, 2000);
  }

  private async generateQrCode(): Promise<void> {
    const dataUrl = await QRCode.toDataURL(
      this.pixCode,
      {
        width: 220,
        margin: 2
      }
    );

    this.qrCodeDataUrl.set(dataUrl);
  }
}
import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Indicator {
  label: string;
  status: string;
  tone: 'good' | 'warn' | 'bad';
  rows: { text: string; value: string; percent: number }[];
}

/** Ilustração do app no celular, feita em HTML/CSS com dados fictícios. */
@Component({
  selector: 'app-phone-mockup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'img',
    'aria-label': 'Tela do aplicativo AgroPainel no celular, com a visão geral de uma lavoura',
  },
  template: `
    <div class="phone" aria-hidden="true">
      <div class="phone__screen">
        <div class="phone__bar">
          <span>Visão geral</span>
          <small>Lavoura 01 · Soja 25/26</small>
        </div>
        @for (item of indicators; track item.label) {
          <div class="ind">
            <p class="ind__head">
              <i [class]="'dot dot--' + item.tone"></i>
              <b>{{ item.label }}</b>
              <span [class]="'ind__status ind__status--' + item.tone">{{ item.status }}</span>
            </p>
            @for (row of item.rows; track row.text) {
              <div class="ind__row">
                <span>{{ row.text }}</span>
                <b>{{ row.value }}</b>
              </div>
              <div class="bar">
                <i [class]="'bar--' + item.tone" [style.width.%]="row.percent"></i>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      justify-content: center;
      padding: 24px;
      background: radial-gradient(
        circle,
        color-mix(in srgb, var(--accent) 45%, transparent) 0 55%,
        transparent 56%
      );
    }

    .phone {
      width: min(300px, 100%);
      padding: 12px;
      border-radius: 40px;
      background: #111;
      box-shadow: var(--shadow-md);
    }

    .phone__screen {
      overflow: hidden;
      border-radius: 30px;
      background: #f6f8f5;
      color: #1d2a21;
      font-size: 12px;
    }

    .phone__bar {
      display: grid;
      padding: 28px 16px 12px;
      background: var(--primary);
      color: #fff;
      font-size: 15px;
      font-weight: 700;
    }

    .phone__bar small {
      font-weight: 400;
      opacity: 0.85;
    }

    .ind {
      margin: 10px;
      padding: 10px 12px;
      border-radius: 12px;
      background: #fff;
      box-shadow: 0 1px 3px rgb(0 0 0 / 0.08);
    }

    .ind__head {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 6px;
    }

    .ind__status {
      margin-left: auto;
      font-size: 11px;
      font-weight: 600;
    }

    .ind__row {
      display: flex;
      justify-content: space-between;
      margin-top: 6px;
      color: #5f6d63;
    }

    .ind__row b {
      color: #1d2a21;
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .bar {
      height: 5px;
      margin-top: 4px;
      border-radius: 4px;
      background: #e8ece6;
    }

    .bar i {
      display: block;
      height: 100%;
      border-radius: inherit;
    }

    .dot--good,
    .bar--good {
      background: #2f7d4a;
    }

    .dot--warn,
    .bar--warn {
      background: #d09a2c;
    }

    .dot--bad,
    .bar--bad {
      background: #c2413b;
    }

    .ind__status--good {
      color: #2f7d4a;
    }

    .ind__status--warn {
      color: #a8761a;
    }

    .ind__status--bad {
      color: #c2413b;
    }
  `,
})
export class PhoneMockup {
  protected readonly indicators: Indicator[] = [
    {
      label: 'Produção',
      status: 'Acima do esperado',
      tone: 'good',
      rows: [
        { text: 'Colheu', value: '10.000 sc', percent: 100 },
        { text: 'Gastou', value: 'R$ 320.000', percent: 63 },
      ],
    },
    {
      label: 'Vendas',
      status: 'Abaixo do esperado',
      tone: 'warn',
      rows: [
        { text: 'Vendeu', value: '6.334 sc', percent: 63 },
        { text: 'Faturou', value: 'R$ 835.400', percent: 58 },
      ],
    },
    {
      label: 'Finanças',
      status: 'Atenção',
      tone: 'bad',
      rows: [{ text: 'Preço médio / meta', value: 'R$ 131,89 / 140', percent: 94 }],
    },
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Ilustração do sistema no notebook, feita em HTML/CSS com dados fictícios. */
@Component({
  selector: 'app-laptop-mockup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'img',
    'aria-label': 'Tela do AgroPainel no computador, com indicadores e vendas por mês',
  },
  template: `
    <div class="laptop" aria-hidden="true">
      <div class="laptop__screen">
        <div class="app">
          <div class="app__top">
            <b>AgroPainel</b>
            <span>Lavoura 01 · Soja 25/26</span>
          </div>
          <div class="app__kpis">
            @for (kpi of kpis; track kpi.label) {
              <div class="kpi">
                <small>{{ kpi.label }}</small>
                <b>{{ kpi.value }}</b>
                <span [class.kpi--down]="kpi.delta.startsWith('-')">{{ kpi.delta }}</span>
              </div>
            }
          </div>
          <div class="chart">
            <small>Sacas vendidas por mês</small>
            <div class="chart__bars">
              @for (bar of sales; track bar.month) {
                <div class="chart__col">
                  <i [style.height.%]="bar.percent"></i>
                  <span>{{ bar.month }}</span>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <div class="laptop__base"></div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      padding-inline: 5%;
    }

    .laptop__screen {
      padding: 14px;
      border-radius: 18px 18px 0 0;
      background: #1b1e1c;
      box-shadow: var(--shadow-md);
    }

    .laptop__base {
      height: 16px;
      margin: 0 -5.5%;
      border-radius: 0 0 14px 14px;
      background: linear-gradient(#cfd4d0, #9aa29c);
    }

    .app {
      overflow: hidden;
      border-radius: 6px;
      background: #f4f6f3;
      color: #1d2a21;
      font-size: 11px;
    }

    .app__top {
      display: flex;
      justify-content: space-between;
      padding: 10px 14px;
      background: #17231b;
      color: #dfe8e1;
    }

    .app__kpis {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      padding: 12px 14px 0;
    }

    .kpi,
    .chart {
      display: grid;
      gap: 2px;
      padding: 10px;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
    }

    .kpi small,
    .chart small {
      color: #5f6d63;
    }

    .kpi b {
      font-size: 15px;
    }

    .kpi span {
      color: #2f7d4a;
      font-weight: 600;
    }

    .kpi span.kpi--down {
      color: #c2413b;
    }

    .chart {
      margin: 12px 14px 14px;
    }

    .chart__bars {
      display: flex;
      align-items: flex-end;
      gap: 6%;
      height: 96px;
      padding-top: 8px;
    }

    .chart__col {
      display: grid;
      flex: 1;
      height: 100%;
      grid-template-rows: 1fr auto;
      align-items: end;
      text-align: center;
      color: #5f6d63;
    }

    .chart__col i {
      display: block;
      border-radius: 4px 4px 0 0;
      background: linear-gradient(#8fd16a, #2f7d4a);
    }
  `,
})
export class LaptopMockup {
  protected readonly kpis = [
    { label: 'Produção', value: '62 sc/ha', delta: '+8% x plano' },
    { label: 'Margem', value: 'R$ 2.180/ha', delta: '+5% x safra anterior' },
    { label: 'Custo', value: 'R$ 4.920/ha', delta: '-3% x região' },
  ];

  protected readonly sales = [
    { month: 'mar', percent: 35 },
    { month: 'abr', percent: 70 },
    { month: 'mai', percent: 95 },
    { month: 'jun', percent: 55 },
    { month: 'jul', percent: 40 },
    { month: 'ago', percent: 62 },
  ];
}

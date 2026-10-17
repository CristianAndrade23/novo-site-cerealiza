import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SignupDialog } from '../../core/signup';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <section id="inicio" class="hero">
      <div class="container hero__content">
        <span class="eyebrow">Gestão financeira de lavouras</span>
        <h1 class="hero__title">
          Sabe a quanto vende a sua produção? É o suficiente para pagar as contas e ainda
          <mark>sobrar</mark>?
        </h1>
        <p class="hero__lead">
          Custos, margem, dívidas e vendas da sua lavoura em um só lugar, com números que ajudam a
          decidir.
        </p>
        <div class="hero__actions">
          <button type="button" class="btn btn--accent btn--lg" (click)="signup.open()">
            Testar grátis por 15 dias
            <app-icon name="arrow-right" />
          </button>
          <a href="#conheca" class="btn btn--outline-light btn--lg">Conheça o sistema</a>
        </div>
      </div>
      <a href="#conheca" class="hero__scroll" aria-label="Rolar para a próxima seção">
        <app-icon name="chevron-down" [size]="28" />
      </a>
    </section>
  `,
  styles: `
    .hero {
      position: relative;
      display: grid;
      align-items: center;
      min-height: min(100svh, 820px);
      padding: calc(var(--header-h) + 48px) 0 96px;
      background:
        linear-gradient(100deg, rgb(10 20 12 / 0.88) 10%, rgb(10 20 12 / 0.45) 70%),
        url('/img/banner.webp') center / cover no-repeat,
        var(--deep);
      color: #fff;
    }

    .hero__content {
      max-width: 1120px;
    }

    .hero .eyebrow {
      color: var(--accent);
    }

    .hero__title {
      max-width: 760px;
      font-size: clamp(32px, 5.4vw, 56px);
      font-weight: 800;
    }

    mark {
      padding: 0 0.15em;
      border-radius: 6px;
      background: var(--accent);
      color: #13200f;
    }

    .hero__lead {
      max-width: 560px;
      margin-top: 20px;
      color: rgb(255 255 255 / 0.85);
      font-size: clamp(17px, 2vw, 20px);
    }

    .hero__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 36px;
    }

    .hero__scroll {
      position: absolute;
      left: 50%;
      bottom: 24px;
      translate: -50% 0;
      color: rgb(255 255 255 / 0.8);
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      50% {
        transform: translateY(8px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .hero__scroll {
        animation: none;
      }
    }

    @media (max-width: 560px) {
      .hero__actions .btn {
        width: 100%;
      }
    }
  `,
})
export class Hero {
  protected readonly signup = inject(SignupDialog);
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SignupDialog } from '../../core/signup';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal';
import { LaptopMockup } from './laptop-mockup';

@Component({
  selector: 'app-get-started',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal, LaptopMockup],
  template: `
    <section id="comece" class="section section--muted">
      <div class="container start">
        <app-laptop-mockup appReveal />
        <div class="start__text" appReveal>
          <span class="eyebrow">Teste grátis</span>
          <h2 class="title">Comece a usar agora, sem pagar nada</h2>
          <p class="lead">
            Cadastre-se e use o sistema completo por 15 dias. Sem cartão de crédito e sem
            compromisso.
          </p>
          <button type="button" class="btn btn--primary btn--lg" (click)="signup.open()">
            Quero testar agora
            <app-icon name="arrow-right" />
          </button>
        </div>
      </div>
    </section>
  `,
  styles: `
    .start {
      display: grid;
      grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
      align-items: center;
      gap: clamp(32px, 6vw, 72px);
    }

    .start__text .btn {
      margin-top: 32px;
    }

    @media (max-width: 860px) {
      .start {
        grid-template-columns: 1fr;
      }

      .start__text {
        order: -1;
        text-align: center;
      }
    }
  `,
})
export class GetStarted {
  protected readonly signup = inject(SignupDialog);
}

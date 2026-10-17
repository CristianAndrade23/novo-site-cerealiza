import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal';
import { PhoneMockup } from './phone-mockup';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal, PhoneMockup],
  template: `
    <section id="conheca" class="section">
      <div class="container about">
        <app-phone-mockup appReveal />
        <div appReveal>
          <span class="eyebrow">Conheça o AgroPainel</span>
          <h2 class="title">Sistema para gestão financeira de lavouras</h2>
          <p class="lead">
            Em um mundo cada vez mais conectado, novas soluções surgem a todo momento. Mas como
            estar atualizado e ser rápido quando tudo fica mais complexo?
          </p>
          <p class="lead">
            Simplificar é a chave. O AgroPainel tem um princípio: facilitar a tomada de decisão do
            produtor.
          </p>
          <ul class="about__list">
            <li><app-icon name="check-circle" /> Produção, vendas e finanças de cada lavoura</li>
            <li><app-icon name="check-circle" /> Comparação com o planejado, safra a safra</li>
            <li><app-icon name="check-circle" /> No computador ou no celular</li>
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: `
    .about {
      display: grid;
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
      align-items: center;
      gap: clamp(32px, 6vw, 80px);
    }

    .about__list {
      display: grid;
      gap: 10px;
      margin: 28px 0 0;
      padding: 0;
      list-style: none;
      font-weight: 500;
    }

    .about__list li {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .about__list app-icon {
      color: var(--primary);
    }

    @media (max-width: 860px) {
      .about {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class About {}

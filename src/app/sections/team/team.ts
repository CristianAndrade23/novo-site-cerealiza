import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TEAM } from '../../core/content';
import { Avatar } from '../../shared/avatar';
import { Reveal } from '../../shared/reveal';

@Component({
  selector: 'app-team',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Avatar, Reveal],
  template: `
    <section id="equipe" class="section section--deep">
      <div class="container">
        <div class="section__head">
          <span class="eyebrow">Quem somos</span>
          <h2 class="title">Gente do campo e da tecnologia</h2>
          <p class="lead">
            Nosso time está pronto para ajudar você a gerenciar melhor a sua lavoura.
          </p>
        </div>

        <ul class="team" appReveal>
          @for (member of team; track member.name) {
            <li class="member">
              <app-avatar [name]="member.name" [size]="88" />
              <p class="member__name">{{ member.name }}</p>
              <p class="member__role">{{ member.role }}</p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    .team {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 32px 16px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .member {
      display: grid;
      justify-items: center;
      gap: 4px;
      width: 140px;
      text-align: center;
    }

    .member app-avatar {
      margin-bottom: 10px;
      box-shadow:
        0 0 0 3px var(--deep),
        0 0 0 5px rgb(255 255 255 / 0.25);
    }

    .member__name {
      font-weight: 700;
    }

    .member__role {
      color: var(--deep-muted);
      font-size: 14px;
      line-height: 1.4;
    }
  `,
})
export class Team {
  protected readonly team = TEAM;
}

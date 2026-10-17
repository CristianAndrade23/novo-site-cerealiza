import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TESTIMONIALS } from '../../core/content';
import { Avatar } from '../../shared/avatar';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal';

const PAGE_SIZE = 3;

@Component({
  selector: 'app-testimonials',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Avatar, Icon, Reveal],
  template: `
    <section id="depoimentos" class="section section--muted">
      <div class="container">
        <div class="section__head">
          <span class="eyebrow">Depoimentos</span>
          <h2 class="title">Quem usa, recomenda</h2>
          <p class="lead">A opinião de quem usa o AgroPainel no dia a dia da lavoura.</p>
        </div>

        <ul class="grid">
          @for (item of visible(); track item.name) {
            <li class="card" appReveal>
              <app-icon class="card__quote" name="quote" [size]="28" />
              <blockquote>{{ item.quote }}</blockquote>
              <div class="card__author">
                <app-avatar [name]="item.name" [size]="44" />
                <div>
                  <p class="card__name">{{ item.name }}</p>
                  <p class="card__role">{{ item.role }} · {{ item.city }}</p>
                </div>
              </div>
            </li>
          }
        </ul>

        @if (hasMore()) {
          <div class="more">
            <button type="button" class="btn btn--ghost" (click)="showMore()">
              Mostrar mais depoimentos ({{ remaining() }})
            </button>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
      gap: 20px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .card {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 24px;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: var(--surface);
      box-shadow: var(--shadow-sm);
    }

    .card__quote {
      color: var(--accent);
    }

    blockquote {
      flex: 1;
      margin: 0;
      font-size: 17px;
      font-weight: 500;
    }

    .card__author {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-top: 16px;
      border-top: 1px solid var(--border);
    }

    .card__name {
      font-weight: 700;
    }

    .card__role {
      color: var(--text-muted);
      font-size: 14px;
    }

    .more {
      margin-top: 32px;
      text-align: center;
    }
  `,
})
export class Testimonials {
  private readonly all = TESTIMONIALS;
  /** Na versão original o botão "Mostrar mais" não fazia nada. */
  private readonly count = signal(PAGE_SIZE * 2);

  protected readonly visible = computed(() => this.all.slice(0, this.count()));
  protected readonly remaining = computed(() => this.all.length - this.visible().length);
  protected readonly hasMore = computed(() => this.remaining() > 0);

  protected showMore() {
    this.count.update((n) => n + PAGE_SIZE);
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { NAV_ITEMS, PANEL_REPO_URL } from '../../core/content';
import { SignupDialog } from '../../core/signup';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './header.html',
  styleUrl: './header.css',
  host: {
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'menuOpen.set(false)',
  },
})
export class Header {
  protected readonly signup = inject(SignupDialog);
  protected readonly items = NAV_ITEMS;
  protected readonly panelUrl = PANEL_REPO_URL;

  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  /** Seção visível no meio da tela; destaca o link correspondente (scroll spy). */
  protected readonly activeSection = signal<string | null>(null);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      this.onScroll();
      if (typeof IntersectionObserver === 'undefined') return;

      // A faixa de observação é uma linha horizontal no meio da viewport.
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) this.activeSection.set(entry.target.id);
          }
        },
        { rootMargin: '-50% 0px -50% 0px' },
      );
      for (const { id } of this.items) {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
      }
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected onScroll() {
    const { scrollY, innerHeight } = window;
    this.scrolled.set(scrollY > 8);
    if (scrollY < 200) this.activeSection.set(null);
    // O rodapé é baixo demais para cruzar o meio da tela: no fim da página, ativa a última seção.
    else if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) {
      this.activeSection.set(this.items[this.items.length - 1].id);
    }
  }

  protected openSignup() {
    this.menuOpen.set(false);
    this.signup.open();
  }
}

import { DestroyRef, Directive, ElementRef, afterNextRender, inject, signal } from '@angular/core';

/**
 * Faz o elemento surgir ao entrar na tela (substitui o script jQuery com debounce no scroll).
 * Usa IntersectionObserver e para de observar depois da primeira aparição.
 * O CSS (.reveal / .is-visible) desliga a animação quando o usuário prefere menos movimento.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[class.is-visible]': 'visible()',
  },
})
export class Reveal {
  protected readonly visible = signal(false);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        this.visible.set(true);
        return;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            this.visible.set(true);
            observer.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}

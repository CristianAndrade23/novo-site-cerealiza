import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Avatar com as iniciais do nome e uma cor estável derivada dele (sem fotos de pessoas reais). */
@Component({
  selector: 'app-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    '[style.--size.px]': 'size()',
    '[style.--hue]': 'hue()',
  },
  template: `{{ initials() }}`,
  styles: `
    :host {
      display: inline-grid;
      place-items: center;
      flex-shrink: 0;
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      background: linear-gradient(
        135deg,
        hsl(var(--hue) 45% 42%),
        hsl(calc(var(--hue) + 40) 50% 52%)
      );
      color: #fff;
      font-size: calc(var(--size) * 0.36);
      font-weight: 700;
      letter-spacing: 0.02em;
    }
  `,
})
export class Avatar {
  readonly name = input.required<string>();
  readonly size = input(48);

  protected readonly initials = computed(() => {
    const parts = this.name().trim().split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase();
  });

  /** Matiz entre 80 e 200 (verdes e azuis), para combinar com a paleta. */
  protected readonly hue = computed(() => {
    const hash = [...this.name()].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7);
    return 80 + (hash % 120);
  });
}

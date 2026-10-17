import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  signal,
  viewChildren,
} from '@angular/core';
import { BENEFITS } from '../../core/content';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal';

/**
 * Abas de benefícios (padrão WAI-ARIA "tabs" com ativação automática).
 * Antes: quatro booleanos e um método que zerava todos a cada clique.
 */
@Component({
  selector: 'app-benefits',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal],
  templateUrl: './benefits.html',
  styleUrl: './benefits.css',
})
export class Benefits {
  protected readonly benefits = BENEFITS;
  protected readonly selectedId = signal(BENEFITS[0].id);
  protected readonly selected = computed(
    () => this.benefits.find((b) => b.id === this.selectedId()) ?? this.benefits[0],
  );

  private readonly tabs = viewChildren<ElementRef<HTMLButtonElement>>('tab');

  protected select(id: string) {
    this.selectedId.set(id);
  }

  protected onKeydown(event: KeyboardEvent, index: number) {
    const last = this.benefits.length - 1;
    const next: Record<string, number> = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowRight: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const target = next[event.key];
    if (target === undefined) return;

    event.preventDefault();
    this.select(this.benefits[target].id);
    this.tabs()[target]?.nativeElement.focus();
  }
}

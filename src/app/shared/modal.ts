import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  input,
  model,
  viewChild,
} from '@angular/core';
import { Icon } from './icon';

/**
 * Modal baseado no elemento nativo <dialog> (foco preso, Esc e backdrop de graça).
 * Uso: <app-modal [(open)]="aberto" title="Título" subtitle="…">conteúdo</app-modal>
 */
@Component({
  selector: 'app-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <dialog
      #dialog
      class="modal"
      aria-labelledby="modal-title"
      (close)="open.set(false)"
      (click)="closeOnBackdrop($event)"
    >
      <header class="modal__header">
        <div>
          <h2 id="modal-title">{{ title() }}</h2>
          @if (subtitle()) {
            <p>{{ subtitle() }}</p>
          }
        </div>
        <button type="button" class="btn-icon" aria-label="Fechar" (click)="open.set(false)">
          <app-icon name="x" />
        </button>
      </header>
      <div class="modal__body">
        <ng-content />
      </div>
    </dialog>
  `,
})
export class Modal {
  readonly open = model(false);
  readonly title = input('');
  readonly subtitle = input('');

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    effect(() => {
      const el = this.dialog().nativeElement;
      if (this.open() && !el.open) el.showModal();
      else if (!this.open() && el.open) el.close();
    });
  }

  protected closeOnBackdrop(event: MouseEvent) {
    if (event.target === this.dialog().nativeElement) this.open.set(false);
  }
}

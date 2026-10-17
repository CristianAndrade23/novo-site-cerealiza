import { TestBed } from '@angular/core/testing';
import { TESTIMONIALS } from '../../core/content';
import { Testimonials } from './testimonials';

describe('Testimonials', () => {
  it('mostra 6 depoimentos e revela o restante com "Mostrar mais"', async () => {
    const fixture = TestBed.createComponent(Testimonials);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const cards = () => el.querySelectorAll('.card').length;
    const button = () => el.querySelector<HTMLButtonElement>('.more button');

    expect(cards()).toBe(6);
    expect(button()?.textContent).toContain(`(${TESTIMONIALS.length - 6})`);

    button()!.click();
    await fixture.whenStable();

    expect(cards()).toBe(TESTIMONIALS.length);
    expect(button()).toBeNull();
  });
});

import { TestBed } from '@angular/core/testing';
import { BENEFITS } from '../../core/content';
import { Benefits } from './benefits';

describe('Benefits', () => {
  async function setup() {
    const fixture = TestBed.createComponent(Benefits);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const tabs = () => [...el.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    const selected = () => tabs().find((t) => t.getAttribute('aria-selected') === 'true');
    const panel = () => el.querySelector('[role="tabpanel"]')!;
    const press = async (key: string) => {
      selected()!.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
      await fixture.whenStable();
    };
    return { fixture, tabs, selected, panel, press };
  }

  it('começa com a primeira aba selecionada e só ela no tab order', async () => {
    const { tabs, selected, panel } = await setup();
    expect(selected()?.id).toBe(`tab-${BENEFITS[0].id}`);
    expect(tabs().map((t) => t.tabIndex)).toEqual([0, -1, -1, -1]);
    expect(panel().getAttribute('aria-labelledby')).toBe(`tab-${BENEFITS[0].id}`);
    expect(panel().textContent).toContain(BENEFITS[0].question);
  });

  it('troca o painel ao clicar em outra aba', async () => {
    const { fixture, tabs, panel } = await setup();
    tabs()[2].click();
    await fixture.whenStable();
    expect(panel().id).toBe(`painel-${BENEFITS[2].id}`);
    expect(panel().textContent).toContain(BENEFITS[2].question);
  });

  it('navega pelo teclado com setas, Home e End (com volta ao início)', async () => {
    const { selected, press } = await setup();
    await press('ArrowDown');
    expect(selected()?.id).toBe(`tab-${BENEFITS[1].id}`);
    await press('End');
    expect(selected()?.id).toBe(`tab-${BENEFITS[3].id}`);
    await press('ArrowRight');
    expect(selected()?.id).toBe(`tab-${BENEFITS[0].id}`);
    await press('ArrowUp');
    expect(selected()?.id).toBe(`tab-${BENEFITS[3].id}`);
    await press('Home');
    expect(selected()?.id).toBe(`tab-${BENEFITS[0].id}`);
    expect(document.activeElement).toBe(selected());
  });
});

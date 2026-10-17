import { TestBed } from '@angular/core/testing';
import { SignupApi, SignupRequest } from '../../core/signup';
import { SignupForm } from './signup-form';

describe('SignupForm', () => {
  async function setup() {
    const sent: SignupRequest[] = [];
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SignupApi,
          useValue: { register: async (r: SignupRequest) => void sent.push(r) },
        },
      ],
    });
    const fixture = TestBed.createComponent(SignupForm);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    const field = (selector: string) =>
      el.querySelector<HTMLInputElement | HTMLSelectElement>(selector)!;
    const type = (selector: string, value: string) => {
      const input = field(selector);
      input.value = value;
      // Como no navegador: <select> dispara "input" e "change"; campos de texto, "input".
      input.dispatchEvent(new Event('input'));
      if (input instanceof HTMLSelectElement) input.dispatchEvent(new Event('change'));
    };
    const fill = (data: Partial<Record<'first' | 'last' | 'email' | 'cpf' | 'area', string>>) => {
      if (data.first !== undefined) type('[autocomplete="given-name"]', data.first);
      if (data.last !== undefined) type('[autocomplete="family-name"]', data.last);
      if (data.email !== undefined) type('[type="email"]', data.email);
      if (data.cpf !== undefined) type('[inputmode="numeric"]', data.cpf);
      if (data.area !== undefined) type('select', data.area);
    };
    const send = async () => {
      el.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }));
      await fixture.whenStable();
      await new Promise((r) => setTimeout(r));
      await fixture.whenStable();
    };
    const errors = () =>
      [...el.querySelectorAll('.field__error')].map((e) => e.textContent?.trim());
    return { el, field, fill, send, errors, sent };
  }

  it('não mostra erros antes da interação', async () => {
    const { errors } = await setup();
    expect(errors()).toEqual([]);
  });

  it('ao enviar vazio, mostra todos os erros e não envia', async () => {
    const { send, errors, sent } = await setup();
    await send();
    expect(errors()).toEqual([
      'Informe o seu nome.',
      'Informe o seu sobrenome.',
      'Informe o seu e-mail.',
      'Informe o seu CPF.',
      'Selecione a área plantada.',
    ]);
    expect(sent).toEqual([]);
  });

  it('aplica a máscara de CPF e valida e-mail e dígitos verificadores', async () => {
    const { fill, field, send, errors } = await setup();
    fill({ first: 'Ana', last: 'Souza', email: 'ana@', cpf: '52998224724', area: '1-500' });
    expect(field('[inputmode="numeric"]').value).toBe('529.982.247-24');
    await send();
    expect(errors()).toEqual(['Informe um e-mail válido.', 'CPF inválido.']);
  });

  it('envia os dados válidos e mostra a confirmação', async () => {
    const { el, fill, send, sent } = await setup();
    fill({
      first: 'Ana',
      last: 'Souza',
      email: 'ana@exemplo.com',
      cpf: '52998224725',
      area: '501-1000',
    });
    await send();
    expect(sent).toEqual([
      {
        firstName: 'Ana',
        lastName: 'Souza',
        email: 'ana@exemplo.com',
        cpf: '529.982.247-25',
        area: '501-1000',
      },
    ]);
    expect(el.querySelector('[role="status"]')?.textContent).toContain('ana@exemplo.com');
  });
});

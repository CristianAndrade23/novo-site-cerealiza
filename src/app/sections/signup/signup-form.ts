import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  FieldTree,
  FormField,
  email,
  form,
  required,
  submit,
  validate,
} from '@angular/forms/signals';
import { PLANTED_AREAS } from '../../core/content';
import { formatCpf, isValidCpf } from '../../core/cpf';
import { SignupApi, SignupDialog, SignupRequest } from '../../core/signup';
import { Icon } from '../../shared/icon';

const EMPTY: SignupRequest = { firstName: '', lastName: '', email: '', cpf: '', area: '' };

/**
 * Cadastro para o teste grátis com Signal Forms: o modelo é um signal, as regras ficam no schema
 * e cada campo expõe o próprio estado (valor, erros, touched) como signals.
 */
@Component({
  selector: 'app-signup-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, Icon],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.css',
})
export class SignupForm {
  private readonly api = inject(SignupApi);
  protected readonly dialog = inject(SignupDialog);
  protected readonly areas = PLANTED_AREAS;

  private readonly model = signal<SignupRequest>({ ...EMPTY });
  protected readonly signupForm = form(this.model, (path) => {
    required(path.firstName, { message: 'Informe o seu nome.' });
    required(path.lastName, { message: 'Informe o seu sobrenome.' });
    required(path.email, { message: 'Informe o seu e-mail.' });
    email(path.email, { message: 'Informe um e-mail válido.' });
    required(path.cpf, { message: 'Informe o seu CPF.' });
    validate(path.cpf, ({ value }) =>
      value() && !isValidCpf(value()) ? { kind: 'cpf', message: 'CPF inválido.' } : undefined,
    );
    required(path.area, { message: 'Selecione a área plantada.' });
  });

  /** E-mail para onde o acesso foi "enviado"; preenchido quando o cadastro dá certo. */
  protected readonly sentTo = signal<string | null>(null);

  /** Mostra os erros só depois que o usuário passou pelo campo (ou tentou enviar). */
  protected errorOf(field: FieldTree<string>): string | null {
    const state = field();
    return state.touched() && state.invalid() ? (state.errors()[0]?.message ?? null) : null;
  }

  protected maskCpf(event: Event) {
    const input = event.target as HTMLInputElement;
    const formatted = formatCpf(input.value);
    input.value = formatted;
    this.signupForm.cpf().value.set(formatted);
  }

  protected async send(event: Event) {
    event.preventDefault();
    await submit(this.signupForm, async () => {
      await this.api.register(this.model());
      this.sentTo.set(this.model().email);
      return undefined;
    });
  }
}

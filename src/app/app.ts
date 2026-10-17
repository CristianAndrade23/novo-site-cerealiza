import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SignupDialog } from './core/signup';
import { About } from './sections/about/about';
import { Benefits } from './sections/benefits/benefits';
import { Footer } from './sections/footer/footer';
import { GetStarted } from './sections/get-started/get-started';
import { Header } from './sections/header/header';
import { Hero } from './sections/hero/hero';
import { SignupForm } from './sections/signup/signup-form';
import { Team } from './sections/team/team';
import { Testimonials } from './sections/testimonials/testimonials';
import { Modal } from './shared/modal';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Header,
    Hero,
    About,
    Benefits,
    GetStarted,
    Testimonials,
    Team,
    Footer,
    Modal,
    SignupForm,
  ],
  template: `
    <a class="skip-link" href="#conheca">Pular para o conteúdo</a>
    <app-header />
    <main>
      <app-hero />
      <app-about />
      <app-benefits />
      <app-get-started />
      <app-testimonials />
      <app-team />
    </main>
    <app-footer />

    <app-modal
      [(open)]="signup.isOpen"
      title="Teste grátis por 15 dias"
      subtitle="Preencha os campos e enviaremos o acesso para o seu e-mail."
    >
      <!-- O @if fica aqui (e não dentro do modal) porque conteúdo projetado pertence ao pai:
           assim o formulário é recriado, vazio, a cada abertura. -->
      @if (signup.isOpen()) {
        <app-signup-form />
      }
    </app-modal>
  `,
})
export class App {
  protected readonly signup = inject(SignupDialog);
}

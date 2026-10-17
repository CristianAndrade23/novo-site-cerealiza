import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CONTACT_EMAIL, PANEL_REPO_URL, SITE_REPO_URL } from '../../core/content';
import { SignupDialog } from '../../core/signup';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <footer id="contato" class="footer">
      <div class="container">
        <div class="cta">
          <div>
            <h2>Cadastre-se e faça o teste por 15 dias.</h2>
            <p>Sem cartão de crédito. Cancele quando quiser.</p>
          </div>
          <button type="button" class="btn btn--accent btn--lg" (click)="signup.open()">
            Testar agora
          </button>
        </div>

        <div class="bottom">
          <a href="#inicio" class="brand">
            <span class="brand__mark"><app-icon name="sprout" [size]="20" /></span>
            AgroPainel
          </a>
          <ul class="links">
            <li>
              <a [href]="'mailto:' + email"><app-icon name="mail" [size]="16" /> {{ email }}</a>
            </li>
            <li>
              <a [href]="panelUrl" target="_blank" rel="noopener">
                <app-icon name="external" [size]="16" /> Painel administrativo
              </a>
            </li>
            <li>
              <a [href]="siteUrl" target="_blank" rel="noopener">
                <app-icon name="code" [size]="16" /> Código deste site
              </a>
            </li>
          </ul>
        </div>

        <p class="note">
          © {{ year }} AgroPainel · Projeto de portfólio: a marca, as pessoas e os depoimentos são
          fictícios.
        </p>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      padding: 64px 0 32px;
      background: #0d140f;
      color: var(--deep-text);
    }

    .cta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      padding-bottom: 40px;
      border-bottom: 1px solid rgb(255 255 255 / 0.1);
    }

    .cta h2 {
      font-size: clamp(22px, 3vw, 28px);
    }

    .cta p {
      margin-top: 6px;
      color: var(--deep-muted);
    }

    .bottom {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      padding: 32px 0;
    }

    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 28px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .links a {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--deep-text);
      text-decoration: none;
    }

    .links a:hover {
      color: var(--accent);
    }

    .note {
      color: var(--deep-muted);
      font-size: 13px;
    }
  `,
})
export class Footer {
  protected readonly signup = inject(SignupDialog);
  protected readonly email = CONTACT_EMAIL;
  protected readonly panelUrl = PANEL_REPO_URL;
  protected readonly siteUrl = SITE_REPO_URL;
  protected readonly year = new Date().getFullYear();
}

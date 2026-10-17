import { Injectable, signal } from '@angular/core';

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  area: string;
}

/**
 * Estado global do cadastro para teste grátis. O header, a seção "Comece" e o rodapé
 * abrem o mesmo diálogo (na versão original eram três cópias do modal, duas com jQuery).
 */
@Injectable({ providedIn: 'root' })
export class SignupDialog {
  readonly isOpen = signal(false);

  open() {
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }
}

/**
 * Envio do cadastro. O site não tem backend, então a chamada é simulada;
 * num produto real seria um POST para a API. Nos testes, é substituído por um dublê.
 */
@Injectable({ providedIn: 'root' })
export class SignupApi {
  register(_request: SignupRequest): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 900));
  }
}

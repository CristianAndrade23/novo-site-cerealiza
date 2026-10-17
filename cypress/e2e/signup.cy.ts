describe('Cadastro para teste grátis', () => {
  beforeEach(() => cy.visit('/'));

  const dialog = () => cy.get('dialog.modal');

  it('abre o mesmo diálogo pelo header, pela seção "Comece" e pelo rodapé', () => {
    const openers = [
      () => cy.get('.nav__actions').contains('Teste grátis').click(),
      () => cy.contains('#comece button', 'Quero testar agora').click(),
      () => cy.contains('#contato button', 'Testar agora').click(),
    ];
    for (const open of openers) {
      open();
      dialog().should('be.visible').and('have.attr', 'open');
      dialog().find('[aria-label="Fechar"]').click();
      dialog().should('not.have.attr', 'open');
    }
  });

  it('fecha pelo botão Cancelar e clicando fora', () => {
    cy.get('.nav__actions').contains('Teste grátis').click();
    dialog().contains('button', 'Cancelar').click();
    dialog().should('not.have.attr', 'open');

    cy.get('.nav__actions').contains('Teste grátis').click();
    // Clique no backdrop: o alvo do evento é o próprio <dialog>.
    dialog().trigger('click', 'topLeft');
    dialog().should('not.have.attr', 'open');
  });

  it('valida os campos e aplica a máscara de CPF', () => {
    cy.get('.nav__actions').contains('Teste grátis').click();
    dialog().contains('button', 'Enviar').click();
    dialog().find('.field__error').should('have.length', 5);

    dialog()
      .find('[inputmode="numeric"]')
      .type('52998224724')
      .should('have.value', '529.982.247-24');
    dialog().find('[inputmode="numeric"]').should('have.attr', 'aria-invalid', 'true');
    dialog().contains('.field__error', 'CPF inválido.');

    dialog().find('[type="email"]').type('ana@');
    dialog().contains('.field__error', 'Informe um e-mail válido.');
  });

  it('envia um cadastro válido e limpa o formulário ao reabrir', () => {
    cy.contains('#comece button', 'Quero testar agora').click();
    dialog().find('[autocomplete="given-name"]').type('Ana');
    dialog().find('[autocomplete="family-name"]').type('Souza');
    dialog().find('[type="email"]').type('ana@exemplo.com');
    dialog().find('[inputmode="numeric"]').type('529.982.247-25');
    dialog().find('select').select('Entre 501 e 1.000 hectares');
    dialog().find('.field__error').should('not.exist');

    dialog().contains('button', 'Enviar').click();
    dialog().contains('button', 'Enviando…').should('be.disabled');
    dialog().find('[role="status"]').should('contain.text', 'ana@exemplo.com');

    dialog().contains('button', 'Fechar').click();
    dialog().should('not.have.attr', 'open');

    cy.contains('#comece button', 'Quero testar agora').click();
    dialog().find('[autocomplete="given-name"]').should('have.value', '');
  });
});

describe('Layout mobile', () => {
  beforeEach(() => {
    cy.viewport(390, 844);
    cy.visit('/');
  });

  it('abre e fecha o menu, e fecha ao escolher uma seção', () => {
    cy.get('#menu-principal').should('not.be.visible');
    cy.get('.header__toggle').should('have.attr', 'aria-expanded', 'false').click();
    cy.get('.header__toggle').should('have.attr', 'aria-expanded', 'true');
    cy.get('#menu-principal').should('be.visible');

    cy.contains('.nav__link', 'Equipe').click();
    cy.get('#menu-principal').should('not.be.visible');
    cy.url().should('include', '#equipe');
  });

  it('fecha o menu com Esc', () => {
    cy.get('.header__toggle').click();
    cy.get('body').type('{esc}');
    cy.get('#menu-principal').should('not.be.visible');
  });

  it('não tem rolagem horizontal', () => {
    cy.scrollTo('bottom');
    cy.document().then((doc) => {
      expect(doc.documentElement.scrollWidth).to.be.at.most(doc.documentElement.clientWidth);
    });
  });
});

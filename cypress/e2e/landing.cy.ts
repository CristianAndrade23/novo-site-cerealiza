import { BENEFITS, NAV_ITEMS, TEAM, TESTIMONIALS } from '../../src/app/core/content';

describe('Landing page', () => {
  beforeEach(() => cy.visit('/'));

  it('mostra o hero e todas as seções do menu', () => {
    cy.title().should('contain', 'AgroPainel');
    cy.get('h1').should('contain.text', 'sobrar');
    for (const item of NAV_ITEMS) cy.get(`#${item.id}`).should('exist');
  });

  it('rola até a seção pelo menu e destaca o link ativo', () => {
    cy.get('.header').should('not.have.class', 'header--solid');
    cy.contains('.nav__link', 'Depoimentos').click();
    cy.url().should('include', '#depoimentos');
    cy.get('.header').should('have.class', 'header--solid');
    cy.contains('.nav__link', 'Depoimentos')
      .should('have.class', 'nav__link--active')
      .and('have.attr', 'aria-current', 'location');
  });

  it('ativa "Contato" ao chegar ao fim da página', () => {
    cy.scrollTo('bottom');
    cy.contains('.nav__link', 'Contato').should('have.class', 'nav__link--active');
  });

  it('troca os benefícios pelas abas, com mouse e teclado', () => {
    cy.get('#beneficios').scrollIntoView();
    cy.get('[role="tabpanel"]').should('contain.text', BENEFITS[0].question);

    cy.get(`#tab-${BENEFITS[3].id}`).click().should('have.attr', 'aria-selected', 'true');
    cy.get('[role="tabpanel"]').should('contain.text', BENEFITS[3].question);

    cy.focused().trigger('keydown', { key: 'ArrowDown' });
    cy.get(`#tab-${BENEFITS[0].id}`).should('have.attr', 'aria-selected', 'true').and('be.focused');
  });

  it('carrega mais depoimentos', () => {
    cy.get('#depoimentos').scrollIntoView();
    cy.get('#depoimentos .card').should('have.length', 6);
    cy.contains('button', 'Mostrar mais depoimentos').click();
    cy.get('#depoimentos .card').should('have.length', TESTIMONIALS.length);
    cy.contains('button', 'Mostrar mais depoimentos').should('not.exist');
  });

  it('lista a equipe com avatares de iniciais', () => {
    cy.get('#equipe .member').should('have.length', TEAM.length);
    cy.get('#equipe .member').first().find('app-avatar').should('have.text', 'RS');
  });
});

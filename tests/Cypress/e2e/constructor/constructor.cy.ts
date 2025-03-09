describe('тестирование конструктора', function () {
  this.beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });
  it('добавление булочки в заказ', function () {
    cy.get('[data-cy=bun]')
      .filter(':contains("Краторная булка N-200i")')
      .contains('Добавить')
      .click();
    cy.get('.constructor-element')
      .contains('Краторная булка N-200i')
      .should('exist');
  });

  it('добавление ингридиента в заказ', function () {
    cy.get('[data-cy=main]')
      .filter(':contains("Говяжий метеорит (отбивная)")')
      .contains('Добавить')
      .click();
    cy.get('.constructor-element')
      .contains('Говяжий метеорит (отбивная)')
      .should('exist');
  });
});

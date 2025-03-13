describe('тестирование открытия модальных окон', function () {
  this.beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });
  it('открытие модального окна деталей ингридиента', function () {
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="bun"]').contains('Краторная булка N-200i').click();

    cy.get('[data-cy="modal"]')
      .contains('Краторная булка N-200i')
      .should('exist');
  });
});

describe('тестирование закрытия модальных окон', function () {
  this.beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('закрытие модального окна деталей ингридиента по клику на крестик', function () {
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="bun"]').contains('Краторная булка N-200i').click();

    cy.get('[data-cy="modal"]')
      .contains('Краторная булка N-200i')
      .should('exist');

    cy.get('[data-cy="modal"]').get('[data-cy="close-modal-button"]').click();

    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('закрытие модального окна деталей ингридиента по клику на оверлей', function () {
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="bun"]').contains('Краторная булка N-200i').click();

    cy.get('[data-cy="modal"]')
      .contains('Краторная булка N-200i')
      .should('exist');

    cy.get('[data-cy="modal"]')
      .get('[data-cy=modal-overlay]')
      .click(10, 10, { force: true });

    cy.get('[data-cy="modal"]').should('not.exist');
  });
});

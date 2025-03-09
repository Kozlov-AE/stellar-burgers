describe('тестирование создания и отправки заказа', function () {
  this.beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'userData.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'successOrder.json' });
    cy.visit('/');

    cy.setCookie('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('eyJhbGciOiJIUzI1NCJ9')
    );
  });

  it('создание и отправка заказа', function () {
    cy.get('[data-cy=bun]').contains('Добавить').click();
    cy.get('[data-cy=main]').contains('Добавить').click();

    cy.get('button').contains('Оформить заказ').click();

    cy.get('[data-cy="modal"]').contains('123456').should('exist');

    cy.get('[data-cy="modal"]').get('[data-cy="close-modal-button"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('.constructor-element').should('not.exist');
  });
});

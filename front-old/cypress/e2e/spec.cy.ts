describe('My First Test', () => {
  it('Visits the initial project page', () => {
    const name = 'Test' + Cypress._.random(0, 1e6);
    cy.visit('/');
    cy.contains('Gestion Stock');
    cy.contains('Gérer efficacement ');
    cy.contains('Voir le stock').click();
    cy.contains('Liste des articles');
    cy.get('a[title="Ajouter"]').click();
    cy.get('input[formcontrolname="name"').type(name);
    cy.get('input[formcontrolname="price"').clear().type('2');
    cy.get('input[formcontrolname="qty"').clear().type('3');
    cy.contains('Ajouter').click();
    cy.get('table tbody tr td').contains(name);
  });
});

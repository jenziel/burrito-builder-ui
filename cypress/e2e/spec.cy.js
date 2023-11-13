const possibleIngredients = [
  "beans",
  "steak",
  "carnitas",
  "sofritas",
  "lettuce",
  "queso fresco",
  "pico de gallo",
  "hot sauce",
  "guacamole",
  "jalapenos",
  "cilantro",
  "sour cream",
];
const jensList = ["beans", "lettuce", "carnitas", "queso fresco", "jalapeno"];
const samsList = [
  "steak",
  "pico de gallo",
  "lettuce",
  "carnitas",
  "queso fresco",
  "jalapeno",
];
const alexsList = [
  "sofritas",
  "beans",
  "sour cream",
  "carnitas",
  "queso fresco",
];

describe("Test that our line cooks will recieve every burrito order ticket that goes through", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      status: 200,
      fixture: "orders",
    }).as('getOrders');
  });
  it("should display unfulfilled orders on pageload.  There should be a form with buttons for the cashier to enter in new orders", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".homepageTitle").contains("h1", "Burrito Builder");
    possibleIngredients.forEach((ingredient) => {
      cy.get("form").contains("button", `${ingredient}`);
    });
    cy.get(".submit-btn").contains("button", "Submit Order");
    cy.get('.order').should('have.length', 3)
    cy.get('.ingredient-list').should('have.length', 3)
    cy.get(".order").first().contains("h3", "Jen");
    jensList.forEach(ingredient => {
      cy.get(".ingredient-list").first().contains("li", `${ingredient}`);
    })
    cy.get('.order:nth-child(2)').contains('h3', 'Sam')
    samsList.forEach(ingredient =>{
      cy.get('.order:nth-child(2)').contains('li', `${ingredient}`)
    })
    cy.get(".order").last().contains("h3", "Alex");
    alexsList.forEach(ingredient => {
      cy.get(".ingredient-list").last().contains("li", `${ingredient}`);
    })
  });
});
describe("Test that our line cooks will recieve every burrito order ticket that goes through", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      status: 200,
      fixture: "orders",
    }).as('getOrders');
    cy.intercept("POST", "http://localhost:3001/api/v1/orders", {
      status: 200,
      fixture: "postResponse",
    }).as('postOrder');
  });
  it("should let you add a new order that displays to the dom and gets posted to the API", () => {
    // happy path
    cy.visit("http://localhost:3000/");
    cy.get('input').type('jen').should('have.value', 'jen')
    cy.get('.steak-btn').click().should('have.value', 'steak')
    cy.get('.sofritas-btn').click().should('have.value', 'sofritas')
    cy.get('.beans-btn').click().should('have.value', 'beans')
    cy.get('.submit-btn').click().wait('@postOrder')
      //new order should appear
    cy.get('.order').should('have.length', 4)
    cy.get('.order').last().contains('h3', 'jen')
    cy.get('.order').last().contains('ul', 'steak')
    cy.get('.order').last().contains('ul', 'sofritas')
    cy.get('.order').last().contains('ul', 'beans')
    cy.get('.order').last().should('have.attr', 'id').and('eq', '4')
      // form should reset
    cy.get('input').should('have.value', '')
  });
  it("shouldn't let you submit an empty form", () => {
    // sad path
    cy.visit("http://localhost:3000/");
      // new order should not appear if missing ingredients
    cy.get('input').type('jen').should('have.value', 'jen')
    cy.get('.submit-btn').click()
    cy.get('.order').should('have.length', 3)
    cy.get('.error-message').contains('Form is incomplete. All fields need to be filled in.')
    cy.reload()
      // new order should not appear if missing name
    cy.get('.error-message').should('not.exist')
    cy.get('.steak-btn').click()
    cy.get('.submit-btn').click()
    cy.get('.order').should('have.length', 3)
    cy.get('.error-message').contains('Form is incomplete. All fields need to be filled in.')
      // error message should disappear after successful post
      cy.get('input').type('jen').should('have.value', 'jen')
      cy.get('.sofritas-btn').click().should('have.value', 'sofritas')
      cy.get('.beans-btn').click().should('have.value', 'beans')
      cy.get('.submit-btn').click().wait('@postOrder')
      cy.get('.error-message').should('not.exist')
  });
});
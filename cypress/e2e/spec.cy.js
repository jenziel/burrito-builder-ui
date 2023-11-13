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
    });
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


// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) =>

Cypress.Commands.add("findNavbarContainer", () => {
    cy.get("img")
      .first()
      .then(($img) => {
        const checkParentForNestedElements = (parent) => {
          // If the parent is the body or html, stop the recursion
          if (parent.is("body") || parent.is("html")) {
            throw new Error("Common parent not found");
          }
  
          const hasImg = parent.find("img").length > 0;
          const hasInput = parent.find("input").length > 0;
          const hasButton =
            parent.find("button").filter((_, btn) => {
              return (
                Cypress.$(btn).text().trim().toLowerCase() === "give feedback"
              );
            }).length > 0;
  
          if (hasImg && hasInput && hasButton) {
            return cy.wrap(parent); // Found common parent
          } else {
            checkParentForNestedElements(parent.parent());
          }
        };
  
        checkParentForNestedElements($img.parent());
      });
  });
  
  Cypress.Commands.add("stubApiCalls", () => {
    // Stub the /albums/top API call
    cy.intercept("GET", "https://qtify-backend-labs.crio.do/albums/top", {
      fixture: "top_albums.json",
    }).as("getTopAlbums");
  
    // Stub the /albums/new API call
    cy.intercept("GET", "https://qtify-backend-labs.crio.do/albums/new", {
      fixture: "new_albums.json",
    }).as("getNewAlbums");
  
    // Stub the /genres API call
    cy.intercept("GET", "https://qtify-backend-labs.crio.do/genres", {
      fixture: "genres.json",
    }).as("getGenres");
  
    // Stub the /songs API call
    cy.intercept("GET", "https://qtify-backend-labs.crio.do/songs", {
      fixture: "songs.json",
    }).as("getSongs");
  });
  
  // cypress/support/commands.js
  Cypress.Commands.add(
    "checkVisibilityForCategory",
    (endpointName, categoryName) => {
      // Set the viewport to mimic a laptop's dimensions
      cy.viewport(1280, 800);
  
      let cardElements = []; // Array to store visible card elements
  
      return cy.wait(endpointName).then((interception) => {
        const items = interception.response.body;
  
        const checkItemVisibility = (index) => {
          if (index === items.length) {
            // If all items have been checked, return the number of visible cards
            return cardElements.length;
          }
  
          const item = items[index];
          return cy
            .get("body")
            .contains(item.title)
            .should("exist")
            .then(($title) => {
              if ($title.length > 0) {
                // Assuming the title's immediate parent is the card container
                let card = $title.parent();
  
                // Check if the card is visible
                if (card.is(":visible")) {
                  cardElements.push(card);
                }
              }
            })
            .then(() => {
              // Move on to the next item
              return checkItemVisibility(index + 1);
            });
        };
  
        // Start the chain of item checks
        return checkItemVisibility(0);
      });
    }
  );
  
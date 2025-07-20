describe("Qtify Automation", () => {
  beforeEach(() => {
    cy.visit("/");
    // cy.visit("undefined");
  });
  describe("Navbar", () => {
    it("Should contain logo, search bar, and a button", () => {
      // Use the custom command to find the navbar container
      cy.findNavbarContainer().as("navbarContainer");

      // Interact with elements within the identified navbar
      cy.get("@navbarContainer").within(() => {
        // Check if the image is visible
        cy.get("img").should("be.visible");

        // Check if the input is visible and type something into it
        cy.get("input").should("be.visible").type("Sample Text");

        // Check if the "Give Feedback" button is visible and click on it
        cy.get("button").contains("Give Feedback").should("be.visible").click();
      });
    });

    it("should check if the logo is vertically centered and has space to its left", () => {
      // Use the custom command to find the navbar container
      cy.findNavbarContainer().as("navbarContainer");

      // Check the logo within the identified navbar
      cy.get("@navbarContainer").within(() => {
        // Check if the logo is vertically centered
        cy.get("img")
          .should("be.visible")
          .and(($img) => {
            const navbarHeight = $img.parent().height();
            const logoHeight = $img.height();
            const topSpace = parseInt($img.css("marginTop"), 10);
            const bottomSpace = parseInt($img.css("marginBottom"), 10);

            expect(navbarHeight / 2).to.be.closeTo(
              logoHeight / 2 + topSpace,
              10
            );

            // Check if the logo has some space to its left using its position
            const logoPosition = $img.position().left;
            expect(logoPosition).to.be.greaterThan(0);
          });
      });
    });

    it("should check the search bar inside Navbar should contain the placeholder keyword 'search' inside it", () => {
      cy.findNavbarContainer().within(() => {
        cy.get("input")
          .should("have.attr", "placeholder")
          .and("match", /search a song|search a album|search an album/i);
      });
    });

    it("should check if the button has a variant of black background", () => {
      cy.findNavbarContainer().within(() => {
        // Grab the button with text "Give Feedback" (case insensitive)
        cy.contains("button", /give feedback/i).as("feedbackButton");
      });

      cy.get("@feedbackButton")
        .invoke("css", "background-color")
        .then((rgb) => {
          const rgba = rgb.match(
            /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,?[\s+]?([\d.]+)?[\s+]?/i
          );
          const red = parseInt(rgba[1]);
          const green = parseInt(rgba[2]);
          const blue = parseInt(rgba[3]);

          expect(red).to.be.lessThan(50);
          expect(green).to.be.lessThan(50);
          expect(blue).to.be.lessThan(50);
        });
    });

    it("should check if the button's text color is a variant of green", () => {
      cy.findNavbarContainer().within(() => {
        // Grab the button with text "Give Feedback" (case insensitive)
        cy.contains("button", /give feedback/i).as("feedbackButton");
      });

      cy.get("@feedbackButton")
        .invoke("css", "color")
        .then((rgb) => {
          const rgba = rgb.match(
            /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,?[\s+]?([\d.]+)?[\s+]?/i
          );
          const red = parseInt(rgba[1]);
          const green = parseInt(rgba[2]);
          const blue = parseInt(rgba[3]);

          expect(green).to.be.gt(red);
          expect(green).to.be.gt(blue);
        });
    });

    it("should check if the button has some border-radius", () => {
      cy.findNavbarContainer().within(() => {
        // Grab the button with text "Give Feedback" (case insensitive)
        cy.contains("button", /give feedback/i).as("feedbackButton");
      });

      cy.get("@feedbackButton")
        .invoke("css", "border-radius")
        .should("not.eq", "0px");
    });

    it("should check if hovering on the button changes the cursor to a pointer", () => {
      cy.findNavbarContainer().within(() => {
        // Grab the button with text "Give Feedback" (case insensitive)
        cy.contains("button", /give feedback/i).as("feedbackButton");
      });

      cy.get("@feedbackButton")
        .invoke("css", "cursor")
        .should("eq", "pointer");
    });

    it("should check if the button is styled with 'Poppins' font", () => {
      cy.findNavbarContainer().within(() => {
        // Grab the button with text "Give Feedback" (case insensitive)
        cy.contains("button", /give feedback/i).as("feedbackButton");
      });
        
      cy.get("@feedbackButton")
        .invoke("css", "font-family")
        .should("include", "Poppins");
    });
  });
});

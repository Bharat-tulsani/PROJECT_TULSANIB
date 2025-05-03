describe("Login and Signup", () => {
    beforeEach(() => {
      cy.fixture('User.json').then((user) => {
        cy.wrap(user).as('testUser');
      });
    });
  
    it("should login with user credentials", function() {
      // Get API URL from api.json
      cy.fixture('api.json').then((payload) => {
        // Get the environment - could be controlled through Cypress.env() in config
        const environment = 'dev'; // Or use Cypress.env('ENVIRONMENT') || 'dev'
        
        // Get the API URL from the correct environment
        const apiUrl = payload.environments[environment].API_URL;
        
        // Access the fixture data using the alias
        cy.request({
          method: "POST",
          url: `${apiUrl}/auth/login`,
          headers: {
            "content-type": "application/json",
          },
          body: {
            username: this.testUser.username, 
            password: this.testUser.password
          }
        }).then((response) => {
          // Add assertions here based on the response
          expect(response.status).to.eq(200);
        });
      });
    });
  });
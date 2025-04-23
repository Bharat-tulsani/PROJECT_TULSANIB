FROM cypress/base:12

# Set the working directory
WORKDIR /app

# Copy the necessary files
COPY cypress /app/cypress
COPY k6-scripts /app/k6-scripts

# Install k6
RUN apt-get update && \
    apt-get install -y k6

# Install Cypress dependencies
RUN npm install --global cypress

# Command to run the Cypress tests
CMD ["npx", "cypress", "run", "--spec", "cypress/e2e/k6-integration-tests/api-load-test.cy.js"]
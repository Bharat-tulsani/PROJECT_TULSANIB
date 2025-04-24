FROM cypress/included:13.7.3

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json explicitly
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Add the k6 repository and install k6
RUN apt-get update && \
    apt-get install -y gnupg2 curl ca-certificates && \
    curl -s https://dl.k6.io/key.gpg | apt-key add - && \
    echo "deb https://dl.k6.io/deb stable main" | tee /etc/apt/sources.list.d/k6.list && \
    apt-get update && \
    apt-get install -y k6 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Command to run the Cypress tests
CMD ["npx", "cypress", "run", "--spec", "cypress/e2e/k6-integration-tests/api-load-test.cy.js"]
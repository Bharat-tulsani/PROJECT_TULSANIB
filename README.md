# API Load Test Integration with k6

This project integrates Cypress for end-to-end testing with k6 for load testing. It allows you to run performance tests on your API endpoints to ensure they can handle the expected load.

## Project Structure

```
PROJECT_TULSANIB
├── cypress
│   └── e2e
│       └── k6-integration-tests
│           └── api-load-test.cy.js  # Cypress test suite for triggering k6 load tests
├── k6-scripts
│   └── api-test.js                    # k6 load testing script defining performance tests
├── Dockerfile                          # Instructions to build the Docker image
├── docker-compose.yml                 # Configuration for multi-container Docker applications
└── README.md                          # Documentation for the project
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd PROJECT_TULSANIB
   ```

2. **Install Docker:**
   Ensure you have Docker installed on your machine. You can download it from [Docker's official website](https://www.docker.com/get-started).

3. **Build the Docker image:**
   ```bash
   docker build -t PROJECT_TULSANIB .
   ```

4. **Run the tests:**
   You can run the tests using Docker Compose:
   ```bash
   docker-compose up
   ```

## Usage

- The Cypress test suite located in `cypress/e2e/k6-integration-tests/api-load-test.cy.js` will trigger the k6 load test defined in `k6-scripts/api-test.js`.
- The output of the k6 script will be logged, and the results will be validated to ensure the tests run successfully.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for this project.
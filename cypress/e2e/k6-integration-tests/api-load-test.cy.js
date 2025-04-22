describe('API Load Test Integration with k6', () => {
    it('should trigger k6 load test script', () => {
        // Trigger the k6 script for load testing
        cy.exec('k6 run k6-scripts/api-test.js').then((result) => {
            // Log the output of the k6 script
            cy.log(result.stdout);
            cy.log(result.stderr);

            // Validate the k6 test results
            expect(result.code).to.eq(0); // Ensure the k6 script ran successfully
        });
    });
});
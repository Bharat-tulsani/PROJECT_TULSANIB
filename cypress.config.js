const { defineConfig } = require('cypress');
const { Pool } = require('pg');

let pool;

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Initialize database connection pool
      pool = new Pool({
        connectionString: process.env.DATABASE_URL || 'postgresql://postgres:mysecretpassword@postgres:5432/postgres',
      });

      // Listen for individual test completion
      on('after:spec', async (spec, results) => {
        const tableName = process.env.CYPRESS_TABLE_NAME || 'test_runs';

        if (results && results.tests) {
          for (const test of results.tests) {
            try {
              // Create query to insert test result
              const query = {
                text: `INSERT INTO ${tableName} (test_name, test_status, duration, error_message) VALUES($1, $2, $3, $4)`,
                values: [
                  test.title.join(' - '), // Combines the suite and test names
                  test.state,
                  test.duration,
                  test.error ? test.error.message : null
                ],
              };

              // Run SQL query
              await pool.query(query);
              console.log(`Saved test result to database: ${test.title[test.title.length - 1]}`);
            } catch (error) {
              console.error('Error saving test result to PostgreSQL:', error);
            }
          }
        }
      });

      // Ensure pool is closed when tests complete
      on('after:run', async () => {
        if (pool) {
          try {
            await pool.end();
            console.log('Database connection pool closed');
          } catch (err) {
            console.error('Error closing database pool:', err);
          }
        }
      });
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});
const { defineConfig } = require('cypress');
const { Pool } = require('pg');

let pool;

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Initialize database connection pool
      pool = new Pool({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'testdb',
        user: process.env.DB_USER || 'testuser',
        password: process.env.DB_PASSWORD || 'testpassword',
      });
      
      // Listen for test completion
      on('test:after:run', async (test, runnable) => {
        const tableName = process.env.CYPRESS_TABLE_NAME || 'test_runs';
        try {
          // Create query to insert test result
          const query = {
            text: `INSERT INTO ${tableName} (test_name, test_status, duration, error_message) VALUES($1, $2, $3, $4)`,
            values: [
              `${runnable.parent.title} - ${test.title}`,
              test.state,
              test.duration,
              test.err ? test.err.message : null
            ],
          };
          
          // Run SQL query
          await pool.query(query);
          console.log(`Saved test result to database: ${test.title}`);
        } catch (error) {
          console.error('Error saving test result to PostgreSQL:', error);
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
    baseUrl: 'http://localhost:3000',
  },
});
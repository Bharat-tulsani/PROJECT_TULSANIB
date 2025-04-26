const { Pool } = require('pg');

let pool;

function initializePool(config) {
  if (!pool) {
    pool = new Pool({
      host: config.db.host,
      port: config.db.port,
      database: config.db.database,
      user: config.db.user,
      password: config.db.password,
    });
  }
  return pool;
}

class PostgresReporter {
  constructor(options) {
    this.options = options || {};
    this.pool = initializePool(options);
    this.tableName = options.tableName || 'test_runs';
  }

  async recordTest(test) {
    try {
      const query = {
        text: `INSERT INTO ${this.tableName} (test_name, test_status, duration, error_message) VALUES($1, $2, $3, $4)`,
        values: [
          test.title,
          test.state,
          test.duration,
          test.err ? test.err.message : null
        ],
      };

      await this.pool.query(query);
    } catch (error) {
      console.error('Error saving test result to PostgreSQL:', error);
    }
  }
}

module.exports = PostgresReporter;
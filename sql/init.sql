-- Add this to your init.sql file if it doesn't already exist

CREATE TABLE IF NOT EXISTS test_runs (
  id SERIAL PRIMARY KEY,
  test_name VARCHAR(255) NOT NULL,
  test_status VARCHAR(50) NOT NULL,
  duration INTEGER,
  error_message TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
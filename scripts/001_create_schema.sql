-- Create core tables for airlines, airports, and flights. Postgres-compatible.

BEGIN;

CREATE TABLE IF NOT EXISTS airlines (
  id SERIAL PRIMARY KEY,
  code VARCHAR(3) NOT NULL UNIQUE,  -- e.g., AA, UA, BA
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS airports (
  id SERIAL PRIMARY KEY,
  iata CHAR(3) NOT NULL UNIQUE,     -- e.g., JFK, LAX
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  latitude NUMERIC(8,5),
  longitude NUMERIC(8,5),
  timezone TEXT
);

CREATE TABLE IF NOT EXISTS flights (
  id BIGSERIAL PRIMARY KEY,
  flight_number VARCHAR(8) NOT NULL UNIQUE, -- e.g., AA123
  airline_id INT NOT NULL REFERENCES airlines(id) ON DELETE RESTRICT,
  origin_airport_id INT NOT NULL REFERENCES airports(id) ON DELETE RESTRICT,
  destination_airport_id INT NOT NULL REFERENCES airports(id) ON DELETE RESTRICT,
  departure_time TIMESTAMPTZ NOT NULL,
  arrival_time TIMESTAMPTZ NOT NULL,
  -- auto-calc duration from departure/arrival
  duration_minutes INT GENERATED ALWAYS AS (
    (EXTRACT(EPOCH FROM (arrival_time - departure_time)) / 60)::INT
  ) STORED,
  price_usd NUMERIC(10,2) NOT NULL CHECK (price_usd >= 0),
  cabin_class TEXT NOT NULL DEFAULT 'Economy', -- Economy, Premium Economy, Business, First
  seats_total INT NOT NULL DEFAULT 180,
  seats_available INT NOT NULL CHECK (seats_available >= 0 AND seats_available <= seats_total),
  nonstop BOOLEAN NOT NULL DEFAULT TRUE,
  aircraft TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Helpful indexes for searching/sorting
CREATE INDEX IF NOT EXISTS idx_flights_origin_time ON flights (origin_airport_id, departure_time);
CREATE INDEX IF NOT EXISTS idx_flights_dest_time   ON flights (destination_airport_id, departure_time);
CREATE INDEX IF NOT EXISTS idx_flights_airline     ON flights (airline_id);

COMMIT;

-- Generate 360 flights over the next 6 months (2 per day: one US domestic, one international).
-- Requires 001_create_schema.sql and 002_seed_reference_data.sql to have run.

BEGIN;

-- Utility: pick a random element from a text array
-- We'll compose values inline in SELECTs using array[...] and indexes.

WITH days AS (
  SELECT generate_series(current_date, current_date + INTERVAL '180 days', INTERVAL '1 day')::date AS d
),

-- One US domestic pair per day (origin/dest are different US airports)
us_pairs AS (
  SELECT
    d.d AS day,
    o.id AS origin_id,
    (SELECT id FROM airports WHERE country = 'United States' AND id <> o.id ORDER BY random() LIMIT 1) AS dest_id
  FROM days d
  CROSS JOIN LATERAL (
    SELECT id FROM airports WHERE country = 'United States' ORDER BY random() LIMIT 1
  ) o
),

-- One international pair per day (origin country != destination country)
intl_pairs AS (
  SELECT
    d.d AS day,
    o.id AS origin_id,
    (SELECT id FROM airports WHERE country <> o.country ORDER BY random() LIMIT 1) AS dest_id,
    o.country AS origin_country
  FROM days d
  CROSS JOIN LATERAL (
    SELECT id, country FROM airports ORDER BY random() LIMIT 1
  ) o
),

-- Build US domestic flights (compact select, randomized fields)
us_flights AS (
  SELECT
    -- airline: prefer US carriers for domestic
    (ARRAY['AA','UA','DL'])[1 + floor(random()*3)::int] AS airline_code,
    up.origin_id,
    up.dest_id,
    -- departure between 06:00 and 18:00 local-ish
    (up.day::timestamptz + INTERVAL '6 hours' + (random() * INTERVAL '12 hours')) AS departure_time,
    -- duration 1h to 5h
    (INTERVAL '60 minutes' + (random() * INTERVAL '240 minutes')) AS duration_interval,
    up.day
  FROM us_pairs up
),

intl_flights AS (
  SELECT
    -- airline: pick among global carriers
    (ARRAY['BA','AF','EK','QR','SQ','QF','AI','LH','NH','JL','AC','AA','UA','DL'])[1 + floor(random()*14)::int] AS airline_code,
    ip.origin_id,
    ip.dest_id,
    -- departure between 08:00 and 22:00
    (ip.day::timestamptz + INTERVAL '8 hours' + (random() * INTERVAL '14 hours')) AS departure_time,
    -- duration 6h to 16h
    (INTERVAL '360 minutes' + (random() * INTERVAL '600 minutes')) AS duration_interval,
    ip.day
  FROM intl_pairs ip
),

-- Combine and shape final rows
all_flights AS (
  SELECT
    uf.airline_code,
    uf.origin_id,
    uf.dest_id,
    uf.departure_time,
    (uf.departure_time + uf.duration_interval) AS arrival_time,
    uf.day,
    TRUE AS is_domestic
  FROM us_flights uf
  UNION ALL
  SELECT
    inf.airline_code,
    inf.origin_id,
    inf.dest_id,
    inf.departure_time,
    (inf.departure_time + inf.duration_interval) AS arrival_time,
    inf.day,
    FALSE AS is_domestic
  FROM intl_flights inf
),

-- enrich with ids and computed attributes
rows_to_insert AS (
  SELECT
    -- Airline ID from code
    (SELECT id FROM airlines a WHERE a.code = af.airline_code) AS airline_id,
    af.origin_id AS origin_airport_id,
    af.dest_id AS destination_airport_id,
    af.departure_time,
    af.arrival_time,
    -- flight number like AA123 (avoid leading zeros)
    (af.airline_code || LPAD(((100 + floor(random()*900))::int)::text, 3, '0')) AS flight_number,
    -- cabin class - weighted (Economy most common)
    (ARRAY['Economy','Economy','Economy','Premium Economy','Business','Business','First'])[1 + floor(random()*7)::int] AS cabin_class,
    -- seats and availability
    (ARRAY[180, 220, 250])[1 + floor(random()*3)::int] AS seats_total,
    -- seats available 30 to seats_total
    NULL::INT AS seats_available_placeholder,
    -- price: domestic 80-500, international 350-1800, scale by cabin class
    af.is_domestic AS is_domestic,
    -- nonstop weighted: 70% true
    (random() < 0.7) AS nonstop,
    (ARRAY['A320','A321','A350','B737-800','B787-9','B777-300ER'])[1 + floor(random()*6)::int] AS aircraft
  FROM all_flights af
)

INSERT INTO flights (
  flight_number,
  airline_id,
  origin_airport_id,
  destination_airport_id,
  departure_time,
  arrival_time,
  price_usd,
  cabin_class,
  seats_total,
  seats_available,
  nonstop,
  aircraft
)
SELECT
  r.flight_number,
  r.airline_id,
  r.origin_airport_id,
  r.destination_airport_id,
  r.departure_time,
  r.arrival_time,
  -- price computation
  ROUND((
    CASE WHEN r.is_domestic THEN (80 + random()*420) ELSE (350 + random()*1450) END
  ) *
    CASE
      WHEN r.cabin_class = 'Economy' THEN 1.0
      WHEN r.cabin_class = 'Premium Economy' THEN 1.35
      WHEN r.cabin_class = 'Business' THEN 2.25
      WHEN r.cabin_class = 'First' THEN 3.5
      ELSE 1.0
    END
  , 2) AS price_usd,
  r.cabin_class,
  r.seats_total,
  -- seats available between 30 and seats_total
  GREATEST(30, LEAST(r.seats_total, (30 + floor(random()*(r.seats_total-29))::int))) AS seats_available,
  r.nonstop,
  r.aircraft
FROM rows_to_insert r
WHERE r.airline_id IS NOT NULL
  AND r.origin_airport_id IS NOT NULL
  AND r.destination_airport_id IS NOT NULL
  AND r.destination_airport_id <> r.origin_airport_id
  AND r.arrival_time > r.departure_time
ON CONFLICT (flight_number) DO NOTHING;

COMMIT;

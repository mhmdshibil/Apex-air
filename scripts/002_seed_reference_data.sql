-- Seed airlines and airports. Upserts to keep it idempotent.

BEGIN;

-- Airlines
INSERT INTO airlines (code, name) VALUES
  ('AA','American Airlines'),
  ('UA','United Airlines'),
  ('DL','Delta Air Lines'),
  ('BA','British Airways'),
  ('AF','Air France'),
  ('EK','Emirates'),
  ('QR','Qatar Airways'),
  ('SQ','Singapore Airlines'),
  ('QF','Qantas'),
  ('AI','Air India'),
  ('LH','Lufthansa'),
  ('NH','ANA All Nippon'),
  ('JL','Japan Airlines'),
  ('AC','Air Canada'),
  ('VA','Virgin Australia'),
  ('IB','Iberia')
ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name;

-- Airports (subset of global hubs; add more as needed)
-- lat/lon approximate; timezone optional
INSERT INTO airports (iata, city, country, latitude, longitude, timezone) VALUES
  ('JFK','New York','United States',40.6413,-73.7781,'America/New_York'),
  ('LGA','New York','United States',40.7769,-73.8740,'America/New_York'),
  ('EWR','Newark','United States',40.6895,-74.1745,'America/New_York'),
  ('LAX','Los Angeles','United States',33.9416,-118.4085,'America/Los_Angeles'),
  ('SFO','San Francisco','United States',37.6213,-122.3790,'America/Los_Angeles'),
  ('SEA','Seattle','United States',47.4502,-122.3088,'America/Los_Angeles'),
  ('ORD','Chicago','United States',41.9742,-87.9073,'America/Chicago'),
  ('ATL','Atlanta','United States',33.6407,-84.4277,'America/New_York'),
  ('DFW','Dallas','United States',32.8998,-97.0403,'America/Chicago'),
  ('MIA','Miami','United States',25.7959,-80.2871,'America/New_York'),
  ('BOS','Boston','United States',42.3656,-71.0096,'America/New_York'),
  ('DEN','Denver','United States',39.8561,-104.6737,'America/Denver'),

  ('LHR','London','United Kingdom',51.4700,-0.4543,'Europe/London'),
  ('LGW','London','United Kingdom',51.1537,-0.1821,'Europe/London'),
  ('MAN','Manchester','United Kingdom',53.3650,-2.2720,'Europe/London'),

  ('CDG','Paris','France',49.0097,2.5479,'Europe/Paris'),
  ('FRA','Frankfurt','Germany',50.0379,8.5622,'Europe/Berlin'),
  ('MUC','Munich','Germany',48.3538,11.7861,'Europe/Berlin'),

  ('DXB','Dubai','United Arab Emirates',25.2532,55.3657,'Asia/Dubai'),
  ('AUH','Abu Dhabi','United Arab Emirates',24.4329,54.6511,'Asia/Dubai'),

  ('DEL','New Delhi','India',28.5562,77.1000,'Asia/Kolkata'),
  ('BOM','Mumbai','India',19.0896,72.8656,'Asia/Kolkata'),
  ('BLR','Bengaluru','India',13.1986,77.7066,'Asia/Kolkata'),
  ('HYD','Hyderabad','India',17.2403,78.4294,'Asia/Kolkata'),

  ('NRT','Tokyo','Japan',35.7719,140.3929,'Asia/Tokyo'),
  ('HND','Tokyo','Japan',35.5494,139.7798,'Asia/Tokyo'),
  ('KIX','Osaka','Japan',34.4328,135.2304,'Asia/Tokyo'),

  ('SIN','Singapore','Singapore',1.3644,103.9915,'Asia/Singapore'),

  ('SYD','Sydney','Australia',-33.9399,151.1753,'Australia/Sydney'),
  ('MEL','Melbourne','Australia',-37.6690,144.8410,'Australia/Melbourne'),

  ('YYZ','Toronto','Canada',43.6777,-79.6248,'America/Toronto'),
  ('YVR','Vancouver','Canada',49.1947,-123.1792,'America/Vancouver')
ON CONFLICT (iata) DO UPDATE
SET city = EXCLUDED.city,
    country = EXCLUDED.country,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude,
    timezone = EXCLUDED.timezone;

COMMIT;

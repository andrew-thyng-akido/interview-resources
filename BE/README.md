# Coffee NestJS Sequelize App

This NestJS application exposes two parallel sets of endpoints against the same `coffees` table using Sequelize:

1. /coffee ("bad" implementation) – intentionally poor practices (weak validation, inconsistent status codes, mixed concerns, missing awaits, loose typing) but still functional on happy paths.
2. /coffee-corrected (clean implementation) – idiomatic NestJS layering, DTO validation, consistent error handling, pagination, helper logic, proper async/await usage.

## Endpoints

Bad Module
GET    /coffee
GET    /coffee/:id
POST   /coffee
PATCH  /coffee/:id
DELETE /coffee/:id

Corrected Module
GET    /coffee-corrected?page=&limit=
GET    /coffee-corrected/:id
POST   /coffee-corrected
PATCH  /coffee-corrected/:id
DELETE /coffee-corrected/:id

The corrected GET collection endpoint also returns aggregate values: `totalValue` and `totalValueWithTax`.

## Model (coffees table)
- id (integer, PK auto-increment)
- name (string)
- brand (string)
- flavors (JSON array of strings)
- price (float)

Both modules map to the same physical table via separate model classes.

## Database Configuration
By default uses an in-memory SQLite database (for demo convenience). Override with environment variables to point at Postgres (or another supported dialect):
- DB_DIALECT=postgres
- DB_HOST=localhost
- DB_PORT=5432
- DB_USER=postgres
- DB_PASSWORD=postgres
- DB_NAME=coffee_db

## Running
```bash
cd BE
npm install
npm run start
```
App listens on port 3000 (override with PORT environment variable).

## Quick Smoke Test
```bash
# Create via bad module
curl -s -X POST localhost:3000/coffee \
  -H 'Content-Type: application/json' \
  -d '{"name":"Espresso","brand":"Acme","flavors":["bold"],"price":4.5}' | jq

# Create via corrected module
curl -s -X POST localhost:3000/coffee-corrected \
  -H 'Content-Type: application/json' \
  -d '{"name":"Latte","brand":"Acme","flavors":["milk","smooth"],"price":5.25}' | jq

# List bad
curl -s localhost:3000/coffee | jq

# List corrected (with pagination + aggregates)
curl -s localhost:3000/coffee-corrected | jq
```

## Notes on Bad Implementation
The bad module intentionally showcases anti-patterns: returning 201 on GET, mixing business logic in controller, loose DTO types (`any`), missing awaits, silent defaults, lack of 404 handling, inconsistent response shapes.

## Notes on Corrected Implementation
The corrected module uses validation decorators, thin controller delegation, helper method to compute tax-inclusive total, consistent HTTP status codes (201 for create, 204 for delete), and proper error handling with `NotFoundException`.

## Next Improvements (Optional)
- Add proper migrations instead of `synchronize: true`.
- Introduce logging/interceptor layers.
- Add integration tests.
- Implement caching for aggregate queries.


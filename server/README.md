# ServiceHub Backend

This backend provides authentication, vendor/service management, and booking APIs for the ServiceHub frontend.

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT authentication

## Setup

1. Open terminal in `Backend`
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

4. Start the server in development mode:

```bash
npm run dev
```

Server runs at `http://localhost:5000`.

## API Overview

- `POST /api/auth/signup` - register user (customer/vendor)
- `POST /api/auth/login` - login
- `GET /api/auth/me` - current user (protected)
- `GET /api/vendors` - list vendors with optional filters
- `GET /api/vendors/:id` - vendor details
- `POST /api/vendors/profile` - create/update vendor profile (vendor only)
- `GET /api/services` - list services
- `POST /api/services` - create service (vendor only)
- `POST /api/bookings` - create booking (customer only)
- `GET /api/bookings/me` - list current user's bookings
- `PATCH /api/bookings/:id/status` - update booking status (vendor only)

## Suggested MongoDB Collections

- `users`
- `vendorprofiles`
- `services`
- `bookings`

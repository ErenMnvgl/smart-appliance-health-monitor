# Smart Appliance Connection & Health Monitor

Smart Appliance Connection & Health Monitor is a backend-focused internship project for monitoring smart home appliances.

The project provides REST API endpoints for listing appliances, checking individual appliance details, creating new appliances, updating connection and health states, and deleting appliances.

## Project Status

Current stage:

```text
Backend API development with Node.js and Express
```

Completed backend features:

```text
Health check endpoint
Appliance list endpoint
Get appliance by ID endpoint
Create appliance endpoint
Update appliance connection status endpoint
Update appliance health status endpoint
Delete appliance endpoint
Basic API documentation
```

## Technologies

```text
Node.js
Express.js
Git
GitHub
GitHub Desktop
```

## Project Structure

```text
smart-appliance-health-monitor
├── backend
│   ├── package.json
│   ├── package-lock.json
│   └── src
│       ├── app.js
│       ├── server.js
│       ├── controllers
│       │   └── appliance.controller.js
│       ├── data
│       │   └── appliances.js
│       └── routes
│           ├── appliance.routes.js
│           └── health.routes.js
├── docs
│   ├── api.md
│   ├── architecture.md
│   └── database.md
├── frontend
├── simulator
└── README.md
```

## Backend Setup

Go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm start
```

The server runs on:

```text
http://localhost:3000
```

## API Endpoints

```text
GET     /api/health
GET     /api/appliances
GET     /api/appliances/:id
POST    /api/appliances
PATCH   /api/appliances/:id/status
PATCH   /api/appliances/:id/health
DELETE  /api/appliances/:id
```

Detailed API documentation is available here:

```text
docs/api.md
```

## Example Health Check

Request:

```bash
curl http://localhost:3000/api/health
```

Response:

```json
{
  "status": "ok",
  "service": "Smart Appliance Connection & Health Monitor Backend"
}
```

## Example Appliance Object

```json
{
  "id": 1,
  "name": "Washing Machine",
  "type": "washer",
  "status": "online",
  "health": "good"
}
```

## Current Data Storage

The project currently uses mock data stored in memory.

This means added, updated, or deleted appliances are only available while the server is running. When the server restarts, the data returns to the default mock appliance list.

A database will be added in a later stage.

## Git Workflow

The project uses a simple feature branch workflow:

```text
main
feature/...
```

Each new feature is developed in a separate feature branch, then merged into `main` after testing.

## Next Planned Steps

```text
Improve validation
Add simulator module
Add database layer
Connect simulator with backend
Build frontend dashboard
```

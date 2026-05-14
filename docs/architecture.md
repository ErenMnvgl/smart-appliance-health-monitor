# Architecture Documentation

## Project Name

Smart Appliance Connection & Health Monitor

## Purpose

This project is a backend-focused internship project designed to monitor smart home appliances.

The system provides API endpoints to manage appliances, check their connection status, monitor their health condition, and perform basic CRUD operations.

At the current stage, the project uses mock data stored in memory. This means that appliance data is reset when the backend server restarts.

## Current Architecture

The project currently has a modular backend architecture.

The backend is built with:

- Node.js
- Express.js
- CommonJS module system
- In-memory mock data

The backend is separated into different layers:

```text
backend
├── package.json
├── package-lock.json
└── src
    ├── app.js
    ├── server.js
    ├── controllers
    │   └── appliance.controller.js
    ├── data
    │   └── appliances.js
    └── routes
        ├── appliance.routes.js
        └── health.routes.js

Folder Responsibilities
backend

The backend folder contains the Node.js and Express.js application.

It is responsible for running the API server and handling requests from clients such as a frontend application, a mobile application, or test tools like curl.

backend/src

The src folder contains the main source code of the backend application.

backend/src/server.js

The server.js file starts the backend server.

Its main responsibility is to listen on a specific port and make the Express application available through HTTP.

Current server address:

http://localhost:3000
backend/src/app.js

The app.js file creates and configures the Express application.

It is responsible for:

enabling JSON request body parsing
connecting route files to the application
defining the main API structure
backend/src/routes

The routes folder contains route files.

Routes define which URL path and HTTP method should trigger which controller function.

Current route files:

health.routes.js
appliance.routes.js
backend/src/routes/health.routes.js

This file contains the health check route.

Current endpoint:

GET /api/health

This endpoint is used to check whether the backend server is running correctly.

backend/src/routes/appliance.routes.js

This file contains appliance-related routes.

Current endpoints:

GET     /api/appliances
GET     /api/appliances/:id
POST    /api/appliances
PATCH   /api/appliances/:id/status
PATCH   /api/appliances/:id/health
DELETE  /api/appliances/:id
backend/src/controllers

The controllers folder contains controller files.

Controllers receive requests from routes, process the request data, apply validation rules, interact with the data layer, and return responses.

backend/src/controllers/appliance.controller.js

This file contains the main appliance logic.

It is responsible for:

listing all appliances
finding a single appliance by ID
creating a new appliance
updating appliance connection status
updating appliance health value
deleting an appliance
returning proper error responses
backend/src/data

The data folder contains mock data files.

At the current stage, this folder acts like a temporary data source instead of a real database.

backend/src/data/appliances.js

This file stores the mock appliance list.

Current appliance object structure:

{
  "id": 1,
  "name": "Washing Machine",
  "type": "washer",
  "status": "online",
  "health": "good"
}
Request Flow

A request follows this flow inside the backend:

Client
  ↓
Express App
  ↓
Route
  ↓
Controller
  ↓
Mock Data
  ↓
Controller
  ↓
Response
  ↓
Client

Example:

GET /api/appliances/1

Flow:

Client sends request
Express receives request
appliance.routes.js matches the route
appliance.controller.js runs the controller function
appliances.js is searched for the appliance
response is returned to the client
Current API Endpoints
Health Endpoint
GET /api/health

Purpose:

Checks if the backend server is running.

Appliance Endpoints
GET /api/appliances

Purpose:

Returns all appliances.

GET /api/appliances/:id

Purpose:

Returns a single appliance by ID.

POST /api/appliances

Purpose:

Creates a new appliance.

PATCH /api/appliances/:id/status

Purpose:

Updates the connection status of an appliance.

PATCH /api/appliances/:id/health

Purpose:

Updates the health condition of an appliance.

DELETE /api/appliances/:id

Purpose:

Deletes an appliance by ID.

Validation Rules

The backend currently validates appliance status and health values.

Status Validation

Allowed status values:

online
offline

Invalid status response:

{
  "message": "status must be online or offline"
}
Health Validation

Allowed health values:

good
warning
critical
unknown

Invalid health response:

{
  "message": "health must be good, warning, critical or unknown"
}
Error Handling

The backend currently handles common error cases.

Missing Required Fields

If required fields are missing while creating an appliance, the backend returns a 400 Bad Request response.

Invalid Status

If an invalid status value is sent, the backend returns a 400 Bad Request response.

Invalid Health

If an invalid health value is sent, the backend returns a 400 Bad Request response.

Appliance Not Found

If an appliance ID does not exist, the backend returns a 404 Not Found response.

Data Storage

The project currently uses in-memory mock data.

This means:

data is stored inside a JavaScript file
added appliances are not permanently saved
updated appliances are reset after server restart
deleted appliances come back after server restart

This is expected at the current stage of the project.

A real database may be added in a later stage.

Possible future database options:

MongoDB
PostgreSQL
SQLite
Current Backend Limitations

The current backend does not have:

permanent database storage
user authentication
real smart appliance communication
frontend integration
simulator integration
automated tests
deployment configuration

These features can be added in later project stages.

Planned Architecture Improvements

Possible next improvements:

move validation logic into a separate validation file
add a simulator for appliance status updates
add a database layer
add frontend or mobile app integration
add automated backend tests
improve error handling structure
add environment variables
prepare deployment configuration
Summary

The backend currently provides a clean Express.js API structure with separated routes, controllers, and mock data.

This structure makes the project easier to extend, test, and maintain.

The current backend is suitable for the next project stages, such as simulator integration, database planning, or frontend/mobile app connection.

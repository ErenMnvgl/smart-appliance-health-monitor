# Product Requirements Document

## Project Name

Smart Appliance Connection & Health Monitor

## Document Version

Version: 1.0  
Status: Current backend stage  
Document Type: PRD

## 1. Project Overview

Smart Appliance Connection & Health Monitor is an internship project designed to manage and monitor smart home appliances through a backend API.

The current version focuses on the backend system. It provides REST API endpoints for listing appliances, viewing a single appliance, creating a new appliance, updating appliance connection status, updating appliance health condition, and deleting appliances.

At the current stage, the system uses in-memory mock data instead of a real database. This means all created, updated, or deleted appliance data resets when the backend server restarts.

## 2. Project Purpose

The main purpose of this project is to build a clean, understandable, and extendable backend system for smart appliance monitoring.

The project also has an educational purpose. It is developed step by step to improve understanding of backend development, API design, Express.js structure, Git workflow, documentation, and later database or simulator integration.

## 3. Target Users

The target users of this system are:

- **Home users / Homeowners:** Want to monitor smart appliances to ensure they are running properly and receive status updates.

- **Technical support teams / Service Technicians:** Need to access error logs and health history to diagnose issues before visiting a customer or performing maintenance.

- **Developers / System Administrators:** Want to integrate appliance data with frontend, mobile, or simulator systems, or monitor API traffic and system load.

- **Internship reviewers:** Want to evaluate backend structure, clean code practices, and project progress.

## 4. Project Scope

### 4.1 In Scope

The current scope includes:

- Backend API development

- Appliance CRUD operations

- Connection status management

- Appliance health management

- Basic validation

- Route, controller, and data separation

- API documentation

- Architecture documentation

- Local project state tracking

### 4.2 Out of Scope

The current scope does not include:

- Real database storage (planned for Phase 2)

- Authentication & Authorization (planned for later phases)

- Real IoT device communication

- Frontend interface (planned for Phase 4)

- Mobile application

- Automated tests

- Deployment

## 5. Technology Stack

### 5.1 Current Technologies

- Node.js

- Express.js

- CommonJS

- Git

- GitHub

- GitHub Desktop

- curl

- Markdown documentation

### 5.2 Future Technologies

- SQLite / PostgreSQL / MongoDB

- React / Vite with TailwindCSS or Vanilla CSS

- Backend testing tools (Jest, Supertest, etc.)

- Appliance simulator

## 6. Backend Architecture

The backend currently follows a modular Express.js structure.

Current request flow:

```text
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
```

Current backend structure:

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
```

## 7. Main Features

### 7.1 Health Check

The system provides a health check endpoint to verify that the backend server is running.

Endpoint:

```text
GET /api/health
```

Expected purpose:

- Confirm backend availability

- Help with manual testing

- Prepare for future monitoring or deployment checks

### 7.2 List Appliances

The system can return all existing appliances.

Endpoint:

```text
GET /api/appliances
```

Expected purpose:

- Show all registered appliances

- Support future frontend dashboard

- Support simulator or monitoring views

### 7.3 Get Appliance by ID

The system can return a single appliance by its ID.

Endpoint:

```text
GET /api/appliances/:id
```

Expected purpose:

- View detailed information about one appliance

- Support future detail pages

- Support debugging and testing

### 7.4 Create Appliance

The system can create a new appliance.

Endpoint:

```text
POST /api/appliances
```

Required fields:

```json
{
  "name": "Smart Oven",
  "type": "oven",
  "status": "online",
  "health": "good"
}
```

Expected purpose:

- Add new appliances to the system

- Prepare the system for dynamic appliance management

### 7.5 Update Appliance Status

The system can update the connection status of an appliance.

Endpoint:

```text
PATCH /api/appliances/:id/status
```

Allowed status values:

```text
online
offline
```

Expected purpose:

- Track whether an appliance is connected

- Support future simulator-generated status changes

- Support monitoring logic

### 7.6 Update Appliance Health

The system can update the health condition of an appliance.

Endpoint:

```text
PATCH /api/appliances/:id/health
```

Allowed health values:

```text
good
warning
critical
unknown
```

Expected purpose:

- Track appliance condition

- Detect possible device problems

- Support future alert or dashboard features

### 7.7 Delete Appliance

The system can delete an appliance by ID.

Endpoint:

```text
DELETE /api/appliances/:id
```

Expected purpose:

- Remove unused appliances

- Support full CRUD behavior

## 8. Data Model

Current appliance object structure:

```json
{
  "id": 1,
  "name": "Washing Machine",
  "type": "washer",
  "status": "online",
  "health": "good"
}
```

Field descriptions:

| Field | Type | Description |
|---|---|---|
| id | number | Unique appliance ID |
| name | string | Appliance display name |
| type | string | Appliance category |
| status | string | Connection status |
| health | string | Health condition |

## 9. Current Mock Data

Mock data is stored in:

```text
backend/src/data/appliances.js
```

Current example data:

```json
[
  {
    "id": 1,
    "name": "Washing Machine",
    "type": "washer",
    "status": "online",
    "health": "good"
  },
  {
    "id": 2,
    "name": "Refrigerator",
    "type": "fridge",
    "status": "online",
    "health": "warning"
  },
  {
    "id": 3,
    "name": "Dishwasher",
    "type": "dishwasher",
    "status": "offline",
    "health": "unknown"
  }
]
```

## 10. Validation Requirements

### 10.1 Required Field Validation

When creating an appliance, required fields must be provided.

Required fields:

- name
- type
- status
- health

If required fields are missing, the API should return:

```text
400 Bad Request
```

### 10.2 Status Validation

Allowed values:

```text
online
offline
```

Invalid status response:

```json
{
  "message": "status must be online or offline"
}
```

### 10.3 Health Validation

Allowed values:

```text
good
warning
critical
unknown
```

Invalid health response:

```json
{
  "message": "health must be good, warning, critical or unknown"
}
```

### 10.4 Not Found Validation

If an appliance ID does not exist, the API should return:

```text
404 Not Found
```

## 11. API Requirements

Current API endpoints:

```text
GET     /api/health
GET     /api/appliances
GET     /api/appliances/:id
POST    /api/appliances
PATCH   /api/appliances/:id/status
PATCH   /api/appliances/:id/health
DELETE  /api/appliances/:id
```

All endpoints should return JSON responses.

The backend server runs locally at:

```text
http://localhost:3000
```

## 12. Non-Functional Requirements

### 12.1 Performance

- API endpoints should respond within 200ms under normal workload conditions.

- The backend server should handle concurrent requests without memory leaks.

### 12.2 Maintainability

The codebase should remain easy to understand and extend.

Current maintainability decisions:

- Routes are separated from controllers

- Controllers are separated from mock data

- Documentation is kept in the docs folder

- Git workflow uses feature branches

### 12.3 Readability

Files should be simple and clear.

Code comments are not used because the project owner prefers clean code without comment lines.

### 12.4 Testability

Current testing is manual with curl.

Future testing may include:

- Unit tests

- Integration tests

- API endpoint tests

### 12.5 Extensibility

The backend should be easy to extend with:

- Validation layer

- Database layer

- Simulator integration

- Frontend or mobile app

- Authentication

- Deployment setup

## 13. Current Limitations

The current system has the following limitations:

- Data is not permanent

- No real database is connected

- No user authentication exists

- No frontend exists

- No simulator exists

- No automated tests exist

- No deployment configuration exists

- No real smart appliance communication exists

## 14. Future Requirements

### 14.1 Validation Layer

Validation logic should be moved into a separate file.

Possible future file:

```text
backend/src/validators/appliance.validator.js
```

Purpose:

- Keep controller files cleaner

- Reuse validation rules

- Improve backend maintainability

### 14.2 Database Integration

A real database should be added later.

Possible options:

- SQLite

- PostgreSQL

- MongoDB

Purpose:

- Store appliance data permanently

- Keep created appliances after server restart

- Support future user and device history features

### 14.3 Simulator Integration

A simulator can be added later inside the simulator folder.

Purpose:

- Simulate smart appliance status changes

- Send fake appliance updates to the backend

- Make the project closer to a real smart appliance monitoring system

### 14.4 Frontend or Mobile Integration

A frontend or mobile application can be added later.

Purpose:

- Display appliances visually

- Show status and health information

- Provide user-friendly appliance management

### 14.5 Automated Testing

Automated tests can be added later.

Purpose:

- Verify endpoints automatically

- Reduce manual testing effort

- Improve project reliability

## 15. Success Criteria

The current backend stage is successful if:

- The backend server starts without errors

- Health endpoint returns a successful response

- Appliance list endpoint returns mock appliances

- Single appliance endpoint works by ID

- New appliance creation works

- Status update works with valid status values

- Health update works with valid health values

- Delete endpoint removes an appliance from memory

- Invalid status and health values return proper error messages

- Non-existing appliance IDs return 404

- Main branch remains clean and working

- Documentation reflects the current project state

- All simulated events are correctly logged (future)

## 16. Current Manual Test Commands

Start backend:

```zsh
cd ~/Desktop/smart-appliance-health-monitor/backend
npm start
```

Health check:

```zsh
curl http://localhost:3000/api/health
```

List appliances:

```zsh
curl http://localhost:3000/api/appliances
```

Get appliance by ID:

```zsh
curl http://localhost:3000/api/appliances/1
```

Create appliance:

```zsh
curl -X POST http://localhost:3000/api/appliances \
-H "Content-Type: application/json" \
-d '{"name":"Smart Oven","type":"oven","status":"online","health":"good"}'
```

Update appliance status:

```zsh
curl -X PATCH http://localhost:3000/api/appliances/1/status \
-H "Content-Type: application/json" \
-d '{"status":"offline"}'
```

Update appliance health:

```zsh
curl -X PATCH http://localhost:3000/api/appliances/2/health \
-H "Content-Type: application/json" \
-d '{"health":"critical"}'
```

Delete appliance:

```zsh
curl -X DELETE http://localhost:3000/api/appliances/3
```

## 17. Development Workflow

For each new feature:

1. Start from a clean main branch.

2. Create a new feature branch in GitHub Desktop.

3. Make small and focused changes.

4. Test the feature with npm start and curl when needed.

5. Commit the feature branch.

6. Publish or push the feature branch.

7. Merge the feature branch into main.

8. Push main.

9. Delete the completed feature branch.

## 18. Suggested Next Step

The best next technical step is:

```text
Move validation logic into a separate backend validation file.
```

Suggested branch name:

```text
feature/refactor-validation
```

Expected outcome:

- Create a validators folder

- Move allowed status and health checks into a validator file

- Keep controller logic cleaner

- Test all affected endpoints again

## 19. Notes

This PRD represents the current backend-focused stage of the project.

The project is expected to grow gradually with simulator, database, frontend, testing, and deployment features in future stages.

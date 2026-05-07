# API Design

This document describes the REST API endpoints of the project.

## Devices

### GET /api/devices

Returns all registered devices.

### GET /api/devices/:id

Returns one device by id.

### POST /api/devices

Creates a new device.

### PATCH /api/devices/:id

Updates an existing device.

### DELETE /api/devices/:id

Deletes a device.

## Sensor Logs

### POST /api/devices/:id/sensor-logs

Creates a new sensor log for a device.

### GET /api/devices/:id/sensor-logs

Returns sensor logs of a device.

### GET /api/devices/:id/latest-sensor-log

Returns the latest sensor data of a device.

## Error Logs

### GET /api/devices/:id/errors

Returns error logs of a device.

### POST /api/devices/:id/errors

Creates a new error log for a device.

### PATCH /api/errors/:id/resolve

Marks an error as resolved.

## Dashboard

### GET /api/dashboard/summary

Returns dashboard summary data.

### GET /api/dashboard/alerts

Returns active alerts.
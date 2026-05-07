# System Architecture

This document describes the main architecture of the project.

## Main Flow

Python Device Simulator sends sensor data to the Backend API.

Backend API validates and stores the data in PostgreSQL.

React Dashboard fetches data from the Backend API.

The user monitors devices, sensor values, connection status, and error logs from the dashboard.

## Architecture Diagram

Device Simulator
→ Backend API
→ PostgreSQL Database
→ React Dashboard

## Modules

## Backend API

Responsible for:

- receiving device data
- storing sensor logs
- creating error logs
- providing data to the dashboard

## PostgreSQL Database

Responsible for:

- storing devices
- storing sensor logs
- storing error logs
- storing connection logs

## React Dashboard

Responsible for:

- showing device list
- showing device detail page
- showing sensor charts
- showing error logs
- showing online/offline status

## Python Device Simulator

Responsible for:

- generating fake sensor data
- sending data to the backend
- simulating normal and abnormal device behavior
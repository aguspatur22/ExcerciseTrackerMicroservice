# Exercise Tracker API

## Overview
This project is a simple backend application developed with Node.js and Express. It simulates a basic exercise tracking system where users can create accounts, add exercises to their logs, and retrieve their exercise logs with optional filtering by date and pagination.

## Features
- **User Creation**: Allows new users to register.
- **Add Exercises**: Users can add exercises to their logs by specifying the description, duration, and optionally the date of the exercise.
- **View User Logs**: Retrieve a user's exercise log with options to filter by date range and limit the number of results returned.

## Technologies Used
- Node.js
- Express
- Body-Parser for parsing incoming request bodies
- UUID for generating unique identifiers
- CORS to enable cross-origin requests
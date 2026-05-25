# Mini-LMS Video Tracker

This is a MERN stack (MongoDB, Express, React, Node.js) application that simulates a video-based Learning Management System (LMS). It features a course list with search, a video player and playlist layout, global progress tracking, and optimistic UI updates for marking modules as complete.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally on default port 27017)

## Installation & Setup

Follow these step-by-step instructions to get the application running on your local machine.

### 1. Install Backend Dependencies
Open a terminal and navigate to the `backend` directory, then install the required packages:

```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
Open a second terminal window, navigate to the `frontend` directory, and install the React dependencies:

```bash
cd frontend
npm install
```

### 3. Run the Database Seed Script
To populate your local MongoDB with a dummy course and video modules, you need to run the seed script. From within your `backend` directory, run:

```bash
node seed.js
```
*Note: This will clear any existing data in the `mini-lms` database and insert fresh sample data.*

## Starting the Application

You will need to run the backend and frontend servers simultaneously in separate terminal windows.

### Start the Backend Server
In your first terminal (inside the `backend` directory), run:

```bash
npm run dev
```
The backend server will start on `http://localhost:5000` using nodemon (so it automatically restarts on file changes).

### Start the Frontend Server
In your second terminal (inside the `frontend` directory), run:

```bash
npm run dev
```
The Vite development server will start. Open your browser and navigate to `http://localhost:5173`.

---

## Authentication (Testing)
The application uses a simulated frontend login for testing purposes.
- **Username:** `admin`
- **Password:** `password`

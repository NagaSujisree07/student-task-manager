# 🎓 Student Task Manager

A complete, production-ready full-stack web application designed for students to organize, track, and manage their academic and personal tasks in one place.

Built with **ReactJS (Vite)**, **HTML**, **CSS**, **JavaScript**, **NodeJS**, **ExpressJS**, and **MongoDB** using **Mongoose** following RESTful API principles.

---

## 🔗 Project Links

## 🔗 Project Links

- **GitHub Repository:** https://github.com/NagaSujisree07/student-task-manager
- **Live Application (Frontend):** https://student-task-manager.vercel.app
- **Live Backend API:** https://student-task-manager-0ase.onrender.com/api/tasks

---

## 📋 Table of Contents

- [Real-World Problem Statement](#-real-world-problem-statement)
- [Project Description](#-project-description)
- [Main Features](#-main-features)
- [Technology Stack](#-technology-stack)
- [CRUD Functionality Explanation](#-crud-functionality-explanation)
- [Project Architecture & Structure](#-project-architecture--structure)
- [REST API Documentation](#-rest-api-documentation)
- [Prerequisites](#-prerequisites)
- [Installation & Local Setup](#-installation--local-setup)
- [Running the Application](#-running-the-application)
- [Environment Variables](#-environment-variables)
- [Deployment Guide](#-deployment-guide)
  - [Deploy to GitHub](#1-push-code-to-github)
  - [Deploy Frontend to Vercel](#2-deploy-frontend-to-vercel)
  - [Deploy Backend to Render or Vercel](#3-deploy-backend-to-render-or-vercel)
- [License](#-license)

---

## 🌍 Real-World Problem Statement

Modern college students juggle heavy academic workloads including assignments, lab records, semester project milestones, continuous assessment tests (CATs), semester finals, and extracurricular commitments. Without a dedicated task management workflow, students frequently face:
- Missed assignment deadlines resulting in grade deductions.
- Inability to prioritize high-weightage submissions over lower priority tasks.
- Lack of clarity regarding pending vs. completed coursework across multiple subjects.
- Fragmented notes scattered across messaging apps, paper notebooks, and emails.

**Student Task Manager** solves this problem by offering a single, distraction-free web dashboard where students can capture, organize, prioritize, and track all their academic responsibilities from inception to submission.

---

## 📖 Project Description

**Student Task Manager** is a full-stack MERN (MongoDB, Express, React, Node) application tailored specifically for students. It offers a clean, responsive interface powered by ReactJS and custom CSS on the frontend, communicating through a structured RESTful API with an ExpressJS backend and persistent MongoDB database.

Each task stores its title, detailed description, priority level (High, Medium, Low), deadline date, status (Pending or Completed), and automatic creation timestamps. The dashboard presents real-time task statistics, an interactive semester progress bar, and overdue indicators to ensure students remain organized and ahead of their deadlines.

---

## ✨ Main Features

- **Header / Navigation Bar**: Clean student branding with live system date and quick "New Task" button.
- **Task Statistics Summary**: Dynamic cards displaying Total Tasks, Pending Tasks, and Completed Tasks.
- **Interactive Semester Progress Meter**: Visual completion percentage indicator based on real-time task data.
- **Form for Adding & Editing Tasks**: Form with client-side validation, error messages, and cancel support.
- **Color-Coded Priority Badges**:
  - 🔴 **High Priority**: Urgent assignments, exams, or imminent project deadlines.
  - 🟡 **Medium Priority**: Regular coursework and weekly lab reports.
  - 🟢 **Low Priority**: Supplementary reading, elective tasks, or long-term goals.
- **Deadline Intelligence & Overdue Indicators**: Automatically calculates remaining days, highlights tasks "Due Today", and flags "Overdue" tasks.
- **One-Click Status Toggle**: Easily switch between `Pending` and `Completed` with visual strike-through.
- **Search, Filter & Sorting Bar**:
  - Live search across task titles and descriptions.
  - Status tabs (`All`, `Pending`, `Completed`).
  - Priority dropdown filter (`All`, `High`, `Medium`, `Low`).
  - Sorting by closest deadline, furthest deadline, newest, and oldest.
- **Confirmation Modal**: Safe deletion dialog preventing accidental task deletion.
- **Toast Notifications**: Automatic status alerts for every create, edit, toggle, and delete action.
- **Responsive Layout**: Designed for seamless usage on desktop, tablet, and mobile screens.
- **Loading & Error States**: Smooth skeleton loader animations and user-friendly error banners with retry buttons.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Markup** | **HTML5** | Semantic, accessible web markup |
| **Styling** | **CSS3** | Modern, responsive CSS design system with CSS custom properties (no Tailwind) |
| **Language** | **JavaScript (ES6+)** | Pure modern JavaScript across client and server (no TypeScript) |
| **Frontend Framework** | **ReactJS 18** | Functional components with hooks (`useState`, `useEffect`, `useMemo`, `useCallback`) |
| **Frontend Tooling** | **Vite** | Ultra-fast development server, HMR, and production bundler |
| **Backend Runtime** | **NodeJS** | Asynchronous, event-driven JavaScript server environment |
| **Web Server** | **ExpressJS 4** | Fast, minimalist routing framework for RESTful APIs |
| **Database** | **MongoDB** | Flexible NoSQL document database (Local MongoDB or MongoDB Atlas) |
| **ODM / Modeling** | **Mongoose 8** | Schema validation, business logic, and MongoDB connection management |
| **API Style** | **RESTful API** | Clean HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) with JSON responses |

---

## 🔄 CRUD Functionality Explanation

The application implements complete MongoDB CRUD operations across both the Express backend and React frontend:

1. **Create (POST `/api/tasks`)**:
   - Students input task title, optional description, priority (High, Medium, Low), deadline date, and initial status.
   - The backend validates required fields, formats dates, and saves the document to MongoDB via Mongoose.
   - The new task is prepended to the task list immediately with toast confirmation.

2. **Read (GET `/api/tasks` & GET `/api/tasks/:id`)**:
   - Fetches all saved tasks from MongoDB sorted by upcoming deadlines.
   - Supports search queries and filters on the client and server.
   - Handles empty states and loading skeletons while data is being retrieved.

3. **Update (PUT `/api/tasks/:id`)**:
   - Enables full editing of title, description, priority, deadline, and status.
   - Pre-populates the form with existing data when clicking the "Edit" button.
   - Validates inputs before persisting updates to the MongoDB database.

4. **Mark Completed / Pending (PUT `/api/tasks/:id`)**:
   - Quick one-click checkbox or status badge toggle that transitions task status between `Pending` and `Completed`.
   - Automatically updates statistics counters and recalculates the semester progress meter.

5. **Delete (DELETE `/api/tasks/:id`)**:
   - Prompts the user with a confirmation modal showing the task title to prevent accidental loss.
   - Removes the task document from MongoDB and updates the frontend state.

---

## 📂 Project Architecture & Structure

```
student-task-manager/
├── client/                     # Frontend ReactJS (Vite) Application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── api/
│   │   │   └── taskApi.js      # REST API client services using Fetch API
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Header navbar with app branding & quick action
│   │   │   ├── Navbar.css
│   │   │   ├── TaskStats.jsx   # Task statistics (Total, Pending, Completed) & progress bar
│   │   │   ├── TaskStats.css
│   │   │   ├── TaskForm.jsx    # Add / Edit task form with field validation
│   │   │   ├── TaskForm.css
│   │   │   ├── TaskList.jsx    # Search, filters, sort & task list container
│   │   │   ├── TaskList.css
│   │   │   ├── TaskItem.jsx    # Task card with priority badges & actions
│   │   │   ├── TaskItem.css
│   │   │   ├── DeleteModal.jsx # Deletion confirmation modal dialog
│   │   │   ├── DeleteModal.css
│   │   │   ├── Notification.jsx# Toast alert feedback banner
│   │   │   └── Notification.css
│   │   ├── App.jsx             # Main application orchestrator & state
│   │   ├── App.css
│   │   ├── index.css           # Global design tokens and base styles
│   │   └── main.jsx            # React DOM mounting entry point
│   ├── .env.example            # Client environment variables template
│   ├── index.html              # Single Page Application HTML root
│   ├── package.json            # Frontend dependencies and scripts
│   ├── vercel.json             # Vercel SPA routing rewrite configuration
│   └── vite.config.js          # Vite config with API proxy support
│
├── server/                     # Backend NodeJS & ExpressJS REST API
│   ├── config/
│   │   └── db.js               # MongoDB Mongoose connection handler
│   ├── controllers/
│   │   └── taskController.js   # CRUD business logic and request handlers
│   ├── middleware/
│   │   └── errorHandler.js     # 404 handler and central error middleware
│   ├── models/
│   │   └── Task.js             # Mongoose schema and validation for Tasks
│   ├── routes/
│   │   └── taskRoutes.js       # Express route definitions for /api/tasks
│   ├── .env.example            # Server environment variables template
│   ├── package.json            # Backend dependencies and scripts
│   ├── server.js               # Express application initialization & entry
│   └── vercel.json             # Vercel serverless deployment config
│
├── .gitignore                  # Git ignore rules for node_modules, build & env
├── package.json                # Root package manager scripts (convenience)
└── README.md                   # Full documentation and setup guide
```

---

## 📡 REST API Documentation

### Base URL
- Local Development: `http://localhost:5000/api`
- Production: `https://your-backend-domain.com/api`

### Endpoints Overview

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| **GET** | `/api/tasks` | Get all tasks (supports query filters) | None |
| **GET** | `/api/tasks/:id` | Get single task by ID | None |
| **POST** | `/api/tasks` | Create a new task | `{ title, description, priority, deadline, status }` |
| **PUT** | `/api/tasks/:id` | Update an existing task | `{ title?, description?, priority?, deadline?, status? }` |
| **DELETE** | `/api/tasks/:id` | Delete a task by ID | None |
| **GET** | `/api/health` | Service health check | None |

---

### Request & Response Examples

#### 1. Create a Task
**Request:**
`POST /api/tasks`
```json
{
  "title": "Submit Database Management Lab Assignment",
  "description": "Complete normalization exercises up to BCNF and write SQL scripts.",
  "priority": "High",
  "deadline": "2026-11-05T00:00:00.000Z",
  "status": "Pending"
}
```

**Response (`201 Created`):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "6723901b897914f17f4b82c1",
    "title": "Submit Database Management Lab Assignment",
    "description": "Complete normalization exercises up to BCNF and write SQL scripts.",
    "priority": "High",
    "deadline": "2026-11-05T00:00:00.000Z",
    "status": "Pending",
    "createdAt": "2026-10-31T12:00:00.000Z",
    "updatedAt": "2026-10-31T12:00:00.000Z"
  }
}
```

#### 2. Get All Tasks
**Request:**
`GET /api/tasks?status=Pending&priority=High`

**Response (`200 OK`):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "6723901b897914f17f4b82c1",
      "title": "Submit Database Management Lab Assignment",
      "description": "Complete normalization exercises up to BCNF and write SQL scripts.",
      "priority": "High",
      "deadline": "2026-11-05T00:00:00.000Z",
      "status": "Pending",
      "createdAt": "2026-10-31T12:00:00.000Z",
      "updatedAt": "2026-10-31T12:00:00.000Z"
    }
  ]
}
```

#### 3. Update a Task
**Request:**
`PUT /api/tasks/6723901b897914f17f4b82c1`
```json
{
  "status": "Completed"
}
```

**Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "6723901b897914f17f4b82c1",
    "title": "Submit Database Management Lab Assignment",
    "status": "Completed",
    "priority": "High",
    "deadline": "2026-11-05T00:00:00.000Z",
    "updatedAt": "2026-10-31T12:15:00.000Z"
  }
}
```

#### 4. Delete a Task
**Request:**
`DELETE /api/tasks/6723901b897914f17f4b82c1`

**Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "id": "6723901b897914f17f4b82c1"
  }
}
```

---

## 💻 Prerequisites

Ensure you have the following installed on your machine:
1. **Node.js** (v18.x or newer): [Download Node.js](https://nodejs.org/)
2. **npm** (bundled with Node.js)
3. **MongoDB**:
   - **Option A (Local)**: [MongoDB Community Server](https://www.mongodb.com/try/download/community) installed and running locally on port `27017`.
   - **Option B (Cloud - Recommended)**: Free cloud database from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

---

## ⚙️ Installation & Local Setup

### Step 1: Clone or Open the Project Directory
```bash
git clone https://github.com/NagaSujisree07/student-task-manager.git
cd student-task-manager
```

### Step 2: Configure Server Environment Variables
Navigate into `server/` and create your local `.env` file from `.env.example`:
```bash
cd server
cp .env.example .env
```
*(On Windows Command Prompt or PowerShell: `copy .env.example .env`)*

Open `server/.env` and verify your MongoDB connection string:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/student_task_manager
CLIENT_URL=http://localhost:5173
```
> **Using MongoDB Atlas?** Replace `MONGODB_URI` with your connection string:
> `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/student_task_manager?retryWrites=true&w=majority`

### Step 3: Install Server Dependencies
Still inside `server/`:
```bash
npm install
```

### Step 4: Configure Client Environment Variables
In a new terminal window, navigate into `client/`:
```bash
cd client
cp .env.example .env
```
*(On Windows: `copy .env.example .env`)*

Open `client/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Step 5: Install Client Dependencies
Still inside `client/`:
```bash
npm install
```

---

## 🚀 Running the Application

To run the application locally, start both the backend server and the frontend development server:

### Terminal 1: Start Backend Server
```bash
cd server
npm run dev
```
- Output will display:
  ```
  🚀 Server running in development mode on port 5000
  ✅ MongoDB Connected: 127.0.0.1 (Database: student_task_manager)
  🔗 API Base URL: http://localhost:5000/api/tasks
  ```

### Terminal 2: Start Frontend Client
```bash
cd client
npm run dev
```
- Output will display:
  ```
  VITE v5.4.x  ready in 250 ms

  ➜  Local:   http://localhost:5173/
  ```

Open your browser and navigate to **`http://localhost:5173/`**.

---

## 🔐 Environment Variables

### Backend (`server/.env`)
| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | No | `5000` | Port on which the Express server listens |
| `MONGODB_URI` | Yes | `mongodb://127.0.0.1:27017/student_task_manager` | Connection string for MongoDB database |
| `CLIENT_URL` | No | `http://localhost:5173` | Allowed CORS origin for frontend requests |

### Frontend (`client/.env`)
| Variable | Required | Default | Description |
|---|---|---|---|
| `VITE_API_BASE_URL` | Yes | `http://localhost:5000/api` | Base URL pointing to Express backend |

> **Security Note**: Never commit `.env` files containing real credentials to version control. The repository `.gitignore` strictly ignores all `.env` files while preserving `.env.example`.

---

## 🚀 Deployment Guide

### 1. Push Code to GitHub

```bash
# In the student-task-manager root folder:
git init
git add .
git commit -m "Initial commit: Student Task Manager full-stack web application"
git branch -M main
git remote add origin https://github.com/NagaSujisree07/student-task-manager.git
git push -u origin main
```

---

### 2. Deploy Frontend to Vercel

The frontend is built with Vite and includes `vercel.json` for seamless client-side routing.

1. Sign in to [Vercel](https://vercel.com).
2. Click **Add New Project** and import your GitHub repository: `student-task-manager`.
3. In the project configuration:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click `Edit` and select `client`.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Expand **Environment Variables** and add:
   - `VITE_API_BASE_URL`: The URL of your deployed backend (e.g. `https://your-backend.onrender.com/api`).
5. Click **Deploy**. Your student dashboard is now live!

---

### 3. Deploy Backend to Render or Vercel

#### Option A: Deploy to Render (Recommended for Express & MongoDB)
1. Sign up / Log in to [Render](https://render.com).
2. Click **New +** > **Web Service**.
3. Connect your GitHub repository.
4. Configure settings:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. In **Environment Variables**, add:
   - `MONGODB_URI`: Your MongoDB Atlas URI (`mongodb+srv://...`)
   - `PORT`: `10000` (or leave default assigned by Render)
   - `CLIENT_URL`: Your Vercel frontend URL (e.g. `https://student-task-manager.vercel.app`)
6. Click **Create Web Service**.
7. Copy the backend URL and update `VITE_API_BASE_URL` in your Vercel project settings.

#### Option B: Deploy Backend to Vercel
The `server/` directory includes `server/vercel.json` and exports `app` directly from `server.js`.
1. In Vercel, import the repository as a second project.
2. Set **Root Directory** to `server`.
3. Set Environment Variable: `MONGODB_URI` to your MongoDB Atlas connection string.
4. Deploy!

---

## 📜 License

This project was built for educational and portfolio purposes (B.Tech Full-Stack Web Application). Distributed under the **MIT License**.

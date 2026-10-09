# TaskFlow – MERN Stack Task Management App

> A full-stack task management application built with the MERN stack, featuring JWT authentication, role-based access control (Admin & User), and a modern dark-themed React dashboard.

---

## 📋 Table of Contents

- [Project Description](#-project-description)
- [Features](#-features)
- [Technologies Used](#️-technologies-used)
- [Setup & Installation](#-setup--installation)
- [How to Run](#-how-to-run)
- [API Endpoints](#-api-endpoints)
- [AI Development Tool Used](#-ai-development-tool-used)
- [AI Development Experience](#-ai-development-experience)

---

## 📖 Project Description

**TaskFlow** is a production-grade task management web application where users can create, manage, and track tasks across different stages — **To Do**, **In Progress**, and **Done**.

The application supports two distinct roles:
- **User** – Can register, login, and manage their own personal tasks with full CRUD operations
- **Admin** – Has access to a dedicated admin panel to view and manage all users and their tasks across the platform

Built entirely on the MERN stack with a RESTful API backend and a React (Vite) frontend with client-side routing and JWT-based authentication.

---

## ✨ Features

### User Features
- 🔐 **JWT Authentication** – Secure register/login with bcrypt password hashing (12 salt rounds)
- 📋 **Task Dashboard** – Create, view, edit, and delete personal tasks
- 🔍 **Search & Filter** – Filter tasks by status, priority, or keyword search
- 🎯 **Task Properties** – Title, description, status (todo/in-progress/done), priority (low/medium/high), due date, tags
- ⚠️ **Overdue Detection** – Tasks past their due date are highlighted in red
- 📊 **Stats Overview** – Live count of tasks by status on the dashboard

### Admin Features
- 🛡️ **Admin Panel** – View all users and all tasks across the platform
- 👥 **User Management Table** – View all registered users with their task counts
- 🗑️ **Delete Users** – Remove users and cascade-delete all their tasks
- 🔽 **Filter by User** – View tasks belonging to a specific user

### Technical Features
- 🔑 Role-based access control (RBAC) with Express middleware guards
- 🔒 Protected routes on both frontend (React Router) and backend (JWT middleware)
- 📡 Axios interceptors for automatic JWT injection and global 401 handling
- 💾 MongoDB Atlas cloud database
- 📱 Fully responsive design (mobile-friendly)
- 🎨 Premium dark theme with smooth CSS animations and glassmorphism effects

---

## 🛠️ Technologies Used

| Category | Technology |
|---|---|
| **Frontend** | React.js 18, Vite, React Router v6 |
| **Styling** | Vanilla CSS with custom CSS variables (dark theme) |
| **HTTP Client** | Axios with request/response interceptors |
| **UI Icons** | Lucide React |
| **Notifications** | React Hot Toast |
| **Backend** | Node.js, Express.js 5 |
| **Database** | MongoDB Atlas with Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT) + bcryptjs |
| **Dev Tools** | nodemon, dotenv, cors |
| **Build Tool** | Vite |

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- npm
- A MongoDB Atlas account (free tier) or local MongoDB

### 1. Clone the Repository

```bash
git clone https://github.com/Sujalv787/Task.git
cd Task
```

### 2. Set Up the Server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

### 3. Set Up the Client

```bash
cd ../client
npm install
```

### 4. Seed the Admin User

```bash
cd ../server
node seed.js
```

This creates the default admin account:
- **Email:** `admin@taskflow.com`
- **Password:** `admin123`

---

## 🚀 How to Run

Open **two terminal windows**:

**Terminal 1 – Start the backend:**
```bash
cd server
npm run dev
```
Server runs at: `http://localhost:5000`

**Terminal 2 – Start the frontend:**
```bash
cd client
npm run dev
```
Client runs at: `http://localhost:5173`

Open your browser at **http://localhost:5173**

### Default Login Credentials

| Role | Email | Password |
|---|---|---|
| 👑 Admin | `admin@taskflow.com` | `admin123` |
| 👤 User | Register via `/register` | — |

---

## 📡 API Endpoints

### Auth Routes (`/api/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and receive JWT token |
| GET | `/api/auth/me` | Private | Get current logged-in user |

### Task Routes (`/api/tasks`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/tasks` | Private | Get user's tasks (supports ?status, ?priority, ?search) |
| POST | `/api/tasks` | Private | Create a new task |
| GET | `/api/tasks/:id` | Private | Get a single task by ID |
| PUT | `/api/tasks/:id` | Private | Update a task |
| DELETE | `/api/tasks/:id` | Private | Delete a task |

### Admin Routes (`/api/tasks/admin`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/tasks/admin/all` | Admin only | Get all tasks (supports ?userId filter) |
| GET | `/api/tasks/admin/users` | Admin only | Get all registered users |
| DELETE | `/api/tasks/admin/users/:id` | Admin only | Delete user + all their tasks |

---

## 📁 Project Structure

```
Task/
├── server/                        # Node.js + Express backend
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Register, Login, GetMe logic
│   │   └── taskController.js      # Task CRUD + admin handlers
│   ├── middleware/
│   │   ├── auth.js                # JWT verification middleware
│   │   └── role.js                # Role-based access control
│   ├── models/
│   │   ├── User.js                # User schema (bcrypt hashing)
│   │   └── Task.js                # Task schema
│   ├── routes/
│   │   ├── auth.js                # Auth routes
│   │   └── tasks.js               # Task + admin routes
│   ├── seed.js                    # Admin user seeder script
│   └── app.js                     # Express entry point
│
└── client/                        # React + Vite frontend
    └── src/
        ├── api/
        │   └── axios.js           # Axios instance with interceptors
        ├── context/
        │   └── AuthContext.jsx    # Global auth state
        ├── components/
        │   ├── Navbar.jsx         # Navigation bar
        │   ├── TaskCard.jsx       # Individual task card
        │   ├── TaskModal.jsx      # Create/Edit task modal
        │   └── ProtectedRoute.jsx # Route guard (auth + admin)
        └── pages/
            ├── Login.jsx          # Login page
            ├── Register.jsx       # Register page
            ├── Dashboard.jsx      # User task dashboard
            └── AdminPanel.jsx     # Admin management panel
```

---

## 🤖 AI Development Tool Used

**Kiro** — [https://app.kiro.de/](https://app.kiro.de/)

Kiro was used as the primary AI development assistant throughout the entire development lifecycle of this project — from initial scaffolding to debugging and refinement.

---

## 💡 AI Development Experience

Kiro significantly accelerated development by handling boilerplate, suggesting architectural patterns, and helping debug issues in real time. Here are **5 specific tasks** where Kiro was used:

### 1. 🏗️ Component Development
Kiro generated all React components — `Navbar`, `TaskCard`, `TaskModal`, and `ProtectedRoute` — with proper prop handling, conditional rendering based on user role, and clean JSX structure. For example, the `TaskCard` component's overdue detection logic and status badge rendering were suggested entirely by Kiro.

### 2. 🔌 API Creation
The full Express REST API was scaffolded with Kiro's assistance. It generated controller functions for all CRUD operations, admin-only endpoints, and query filtering support (`?status`, `?priority`, `?search`). It also ensured proper HTTP status codes (201 for creation, 404 for not found, 403 for forbidden).

### 3. 🔐 Authentication & JWT Integration
Kiro designed the complete auth flow — including bcrypt password hashing in Mongoose `pre('save')` hooks, JWT generation/verification middleware, `AuthContext` with `localStorage` persistence, and Axios request interceptors for automatic token injection with a global 401 redirect handler.

### 4. 🗄️ Database Integration
Kiro created Mongoose schemas for `User` and `Task` with proper validators, enums, and default values. It suggested using `select: false` on the password field to prevent accidental exposure in API responses, and also wrote the admin seed script for creating the default admin user.

### 5. 🐛 Debugging
Kiro identified and fixed a critical Express routing bug — admin routes like `/admin/all` had to be registered *before* the `/:id` parameterized routes to prevent Express from matching `admin` as a task ID. It also debugged a `bcryptjs` v3 compatibility issue where the `pre('save')` hook's `next()` callback behavior had changed in the newer version.

---

## 📝 License

MIT — Free to use for learning and evaluation purposes.

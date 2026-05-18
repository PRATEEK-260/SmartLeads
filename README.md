# Smart Leads Dashboard

A full-stack Lead Management Dashboard built strictly using the **MERN stack, TypeScript, and TailwindCSS**. This project was developed as part of the ServiceHive Full Stack Internship Assignment.

## 🚀 Live Demo & Credentials
* **Frontend (Vercel):** [https://smartleads-coral.vercel.app](https://smartleads-coral.vercel.app) *(Replace with your actual Vercel link!)*
* **Backend API (Render):** [https://smartleads-f7w4.onrender.com/health](https://smartleads-f7w4.onrender.com/health)

**Test Admin Credentials:**
- **Email:** `admin@servicehive.com`
- **Password:** `password123`

---

## 🛠️ Tech Stack
* **Frontend:** React.js, TypeScript (Strict), TailwindCSS (v4), Vite.
* **Backend:** Node.js, Express.js, TypeScript, MongoDB (Mongoose), JWT, Zod.
* **Shared Architecture:** NPM Workspaces for shared TypeScript interfaces across the stack.
* **DevOps:** Docker, Docker Compose.

---

## ✨ Features Implemented

### 1. Authentication System
* JWT-based authentication flow with secure password hashing (`bcrypt`).
* Protected React routes and secure Express middleware.
* **Role-Based Access Control (RBAC):** First user defaults to `Admin`, subsequent users default to `Sales`. 
  * `Admin` can see all leads.
  * `Sales` can only see their own assigned leads.

### 2. Leads Management (CRUD)
* Full creation, viewing, updating, and deletion of Leads.
* Contains required fields: Name, Email, Status (`New`, `Contacted`, `Qualified`, `Lost`), Source (`Website`, `Instagram`, `Referral`), and Created At.

### 3. Advanced Filtering, Search & Pagination
* **Multiple Concurrent Filters:** Combine Status, Source, and Search seamlessly.
* **Debounced Search:** Custom `useDebounce` hook implemented on the frontend to prevent excessive API calls while searching by Name or Email.
* **Sorting:** Sort leads by Latest or Oldest.
* **Server-Side Pagination:** Strict limit of 10 records per page using MongoDB `skip` and `limit`, returning pagination metadata to the frontend.

### 4. Professional UI/UX
* Fully responsive layout with beautiful Glassmorphism touches.
* Comprehensive Loading states, Empty States, and Error handling UI.
* **Bonus Feature: Dark Mode Support!** Fully integrated Dark Mode toggle in the TopBar using Tailwind CSS variable swapping.

### 5. API Standards & Additional Features
* Complete RESTful API architecture with centralized error handling.
* Strict request validation using **Zod**.
* **CSV Export Functionality:** Bulk export selected leads (or all leads) directly to a CSV file from the frontend via the `json2csv` backend endpoint.

---

## 📂 Project Structure (Monorepo)

```text
ServiceHive/
├── packages/
│   ├── client/           # React frontend (Vite)
│   ├── server/           # Express backend (Node)
│   └── shared/           # Shared TS interfaces (IUser, ILead)
├── API.md                # Detailed API Documentation
├── Dockerfile.client     # Frontend Docker configuration
├── Dockerfile.server     # Backend Docker configuration
├── docker-compose.yml    # Container orchestration
└── package.json          # Root workspace configuration
```

---

## ⚙️ Setup Instructions

### Prerequisites
* Node.js (v20+)
* Docker & Docker Compose (Optional)
* MongoDB (Cloud or Local)

### 1. Local Development (Without Docker)

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ServiceHive
   ```
2. **Install all workspace dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**
   Rename `.env.example` to `.env` in the root folder and configure your `MONGODB_URI`.
4. **Seed the Database (Optional but recommended):**
   ```bash
   cd packages/server
   npx ts-node src/seed.ts
   cd ../..
   ```
5. **Start the Development Servers:**
   ```bash
   npm run dev
   ```
   *(Frontend: `http://localhost:5173`, Backend: `http://localhost:5000`)*

### 2. Running with Docker Compose

1. **Start the containers:**
   ```bash
   docker-compose up --build
   ```
2. **Access the application:**
   * Frontend: `http://localhost`
   * Backend API: `http://localhost:5000`

---

## 📚 API Documentation
Please refer to [API.md](./API.md) for detailed endpoint structures, request payloads, and response formats.

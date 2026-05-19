# Smart Leads Dashboard

A high-performance, full-stack Lead Management Dashboard architected with the **MERN stack**, **TypeScript**, and **TailwindCSS**. Developed with a focus on security, scalability, and exceptional user experience as part of the ServiceHive Full Stack Internship Assignment.

## Live Demo & Access

*   **Frontend (Vercel):** [https://smart-leads-client-three.vercel.app/](https://smart-leads-client-three.vercel.app/)
*   **Backend API (Render):** [https://smartleads-f7w4.onrender.com/health](https://smartleads-f7w4.onrender.com/health)

### Test Credentials
| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@servicehive.com` | `password123` |

---

## Tech Stack

*   **Frontend:** React 19, TypeScript (Strict Mode), TailwindCSS v4, Vite.
*   **Backend:** Node.js, Express.js, TypeScript, MongoDB (Mongoose), JWT, Zod.
*   **Architecture:** Monorepo using **NPM Workspaces** for seamless shared type safety.
*   **DevOps:** Docker & Docker Compose for standardized environments.

---

## Core Features

### 1. Enterprise-Grade Authentication
*   **Secure Flow:** JWT-based authentication with `bcrypt` password hashing.
*   **RBAC (Role-Based Access Control):** 
    *   **Admin:** Complete oversight of all leads across the platform.
    *   **Sales:** Focused view restricted to their own assigned leads.
*   **Protected Routing:** High-order components for frontend route guarding and robust middleware for API security.

### 2. Intelligent Lead Management
*   **Full CRUD:** Comprehensive creation, retrieval, updates, and deletion of leads.
*   **Detailed Tracking:** Monitor Name, Email, Status (`New`, `Contacted`, `Qualified`, `Lost`), and Source (`Website`, `Instagram`, `Referral`).

### 3. Advanced Data Orchestration
*   **Multi-Criteria Filtering:** Seamlessly combine Status, Source, and Search queries.
*   **Performant Search:** Custom `useDebounce` hook to minimize API overhead while providing real-time results.
*   **Server-Side Pagination:** Optimized MongoDB `skip/limit` logic with a strict 10-record-per-page threshold.

### 4. Premium UI/UX
*   **Modern Aesthetics:** Responsive layout featuring sleek glassmorphism and Tailwind v4.
*   **State Management:** Comprehensive handling for Loading, Empty, and Error states.
*   **Dark Mode:** Fully integrated, accessible dark mode toggle.

### 5. API & Data Export
*   **RESTful Excellence:** Standardized JSON responses and centralized error handling.
*   **Data Integrity:** Strict request validation powered by **Zod**.
*   **Bulk Export:** Direct-to-CSV functionality for selected leads via `json2csv`.

---

## Project Structure

```text
ServiceHive/
├── packages/
│   ├── client/           # React frontend (Vite + Tailwind v4)
│   ├── server/           # Express backend (Node + TypeScript)
│   └── shared/           # Shared TypeScript interfaces (IUser, ILead)
├── API.md                # Detailed API Specification
├── Dockerfile.client     # Optimized Frontend Docker config
├── Dockerfile.server     # Standardized Backend Docker config
├── docker-compose.yml    # Full-stack container orchestration
└── package.json          # Root workspace configuration
```

---

## Setup & Installation

### Prerequisites
*   Node.js (v20+)
*   Docker & Docker Compose (Optional)
*   MongoDB (Atlas or Local)

### 1. Local Development (Traditional)

1.  **Clone & Enter:**
    ```bash
    git clone <repository-url>
    cd ServiceHive
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Environment Setup:**
    Configure `.env` in the root folder using `.env.example` as a template.
4.  **Seed Data (Recommended):**
    ```bash
    cd packages/server && npx ts-node src/seed.ts && cd ../..
    ```
5.  **Launch:**
    ```bash
    npm run dev
    ```
    *   **Frontend:** `http://localhost:5173`
    *   **Backend:** `http://localhost:5000`

### 2. Docker Execution

```bash
docker-compose up --build
```
*   **App:** `http://localhost`
*   **API:** `http://localhost:5000`

---

## Documentation
For a deep dive into the API endpoints and data structures, please see [API.md](./API.md).

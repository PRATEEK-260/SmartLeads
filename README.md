# Smart Leads Dashboard

A full-stack Lead Management Dashboard built with the MERN stack, TypeScript, and TailwindCSS. This project features a robust authentication system, role-based access control, advanced lead filtering, and a modern, responsive UI.

## 🚀 Tech Stack

- **Frontend:** React.js, TypeScript, TailwindCSS, Vite, Axios.
- **Backend:** Node.js, Express.js, TypeScript, MongoDB (Mongoose), JWT, Zod.
- **Shared:** Shared TypeScript interfaces for consistency across the stack.
- **DevOps:** Docker, Docker Compose.

## ✨ Key Features

- **Authentication System:** Secure JWT-based registration and login.
- **Role-Based Access Control (RBAC):**
  - **Admin:** Can see and manage all leads.
  - **Sales User:** Can only see and manage leads assigned to them.
- **Leads Management (CRUD):** Complete lifecycle management for sales leads.
- **Advanced Filtering & Search:**
  - Search leads by name or email.
  - Filter by status (New, Contacted, Qualified, Lost).
  - Filter by source (Website, Instagram, Referral).
  - Sorting by latest or oldest entries.
- **Server-Side Pagination:** Optimized for large datasets with 10 records per page.
- **CSV Export:** Bulk export selected leads to CSV format.
- **Modern UI/UX:** Responsive design with loading states, empty states, and form validation, following the provided designs.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance) OR Docker

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd ServiceHive
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    - Copy `.env.example` to `.env` in the root (or configure in respective packages).
    - Ensure `MONGODB_URI` and `JWT_SECRET` are set in `packages/server/.env`.

4.  **Run the application:**
    ```bash
    npm run dev
    ```
    This will start both the client (port 5173) and server (port 5000) concurrently.

### Running with Docker

1.  **Start the services:**
    ```bash
    docker-compose up --build
    ```
    - Client: `http://localhost`
    - Server API: `http://localhost:5000`
    - MongoDB: `mongodb://localhost:27017`

## 📂 Project Structure

```text
ServiceHive/
├── packages/
│   ├── client/           # React frontend
│   ├── server/           # Express backend
│   └── shared/           # Shared TypeScript types
├── Dockerfile.client     # Frontend Docker configuration
├── Dockerfile.server     # Backend Docker configuration
├── docker-compose.yml    # Container orchestration
└── plan.md               # Original implementation plan
```

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` - Create a new user.
- `POST /api/auth/login` - Authenticate and get JWT.
- `GET /api/auth/me` - Get current user profile (Protected).

### Leads
- `GET /api/leads` - Fetch leads with pagination, search, and filters (Protected).
- `POST /api/leads` - Create a new lead (Protected).
- `GET /api/leads/:id` - Get single lead details (Protected).
- `PUT /api/leads/:id` - Update lead (Protected).
- `DELETE /api/leads/:id` - Delete lead (Protected).
- `GET /api/leads/export` - Export leads to CSV (Protected).

## 📄 License
MIT

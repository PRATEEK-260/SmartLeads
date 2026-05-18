# Smart Leads Dashboard - Design Specification

## Overview
A full-stack Lead Management Dashboard using the MERN stack with TypeScript and TailwindCSS. The project will be built as a monorepo containing both the React frontend and Node.js/Express backend.

## Architecture
- **Structure:** Monorepo (`packages/client`, `packages/server`, `packages/shared`).
- **Frontend:** React.js + TypeScript + TailwindCSS + Vite.
- **Backend:** Node.js + Express.js + TypeScript + MongoDB (Mongoose).
- **Authentication:** JWT-based, bcrypt for password hashing.
- **Development Flow:** Feature-Slice approach (Build Auth -> Build Leads -> Build Advanced Features).

## Database Schema

### User Schema
- `name`: String (Required)
- `email`: String (Required, Unique)
- `password`: String (Hashed via bcrypt)
- `role`: Enum `['Admin', 'Sales']` (Default: `Sales`. First registered user becomes `Admin`).
- `createdAt`: Date

### Lead Schema
- `name`: String (Required)
- `email`: String (Required)
- `status`: Enum `['New', 'Contacted', 'Qualified', 'Lost']` (Default: `New`)
- `source`: Enum `['Website', 'Instagram', 'Referral']` (Required)
- `assignedTo`: ObjectId (Ref: `User`, Required)
- `createdAt`: Date

## API Design

### Authentication (`/api/auth`)
- `POST /register`: Registers a new user. Assigns 'Admin' role if it's the first user, else 'Sales'.
- `POST /login`: Authenticates user and returns JWT.

### Leads Management (`/api/leads`)
- `GET /`: Retrieves leads. 
  - **Pagination:** Uses `skip` and `limit` (10 per page). Returns metadata.
  - **Filters:** `status`, `source`, `search` (Name/Email), `sortBy` (Latest/Oldest).
  - **RBAC:** Admins see all leads. Sales users only see leads where `assignedTo` equals their User ID.
- `POST /`: Creates a new lead (Admin can assign, Sales auto-assigns to self).
- `PUT /:id`: Updates lead details (status, etc.).
- `DELETE /:id`: Deletes a lead.

### Advanced Features
- `POST /api/leads/export`: Accepts an array of Lead IDs and returns a CSV file.

## Frontend UI
- Integrates existing HTML/CSS designs from the `stitch_smart_leads_crm_dashboard` folder.
- Converts static HTML to reusable React functional components.
- Implements debounced search, loading states, empty states, and form validation.

## Next Steps (Implementation Phases)
1. **Phase 1 (Setup & Auth):** Initialize monorepo, Docker setup, User models, and Auth API/UI.
2. **Phase 2 (Leads Core):** Lead models, basic CRUD API, and Dashboard UI integration.
3. **Phase 3 (Advanced):** Pagination, multi-filtering, debounced search, and CSV export.
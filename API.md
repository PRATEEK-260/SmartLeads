# API Documentation

## Base URL
Local Development: `http://localhost:5000/api`
Production: `https://<your-render-url>.onrender.com/api`

## Authentication

### 1. Register a New User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Description**: Registers a new user (defaults to 'Sales' role, first user becomes 'Admin').
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "status": "success",
    "token": "eyJhbGci...",
    "data": { "user": { "id": "...", "name": "John Doe", "email": "john@example.com", "role": "Sales" } }
  }
  ```

### 2. Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: `200 OK`

---

## Leads Management
**All routes require a valid JWT in the `Authorization: Bearer <token>` header.**

### 1. Get All Leads (with advanced filtering, search & pagination)
- **URL**: `/leads`
- **Method**: `GET`
- **Query Parameters**:
  - `page` (number, default: 1)
  - `limit` (number, default: 10)
  - `search` (string) - Searches across Name and Email
  - `status` (string) - Filters by 'New' | 'Contacted' | 'Qualified' | 'Lost'
  - `source` (string) - Filters by 'Website' | 'Instagram' | 'Referral'
  - `sortBy` (string) - 'Latest' (default) | 'Oldest'
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "data": {
      "leads": [...],
      "pagination": {
        "total": 50,
        "pages": 5,
        "currentPage": 1,
        "limit": 10
      }
    }
  }
  ```

### 2. Create a Lead
- **URL**: `/leads`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "status": "New",
    "source": "Website",
    "assignedTo": "user_id_here" // Optional (Admins only)
  }
  ```

### 3. Update a Lead
- **URL**: `/leads/:id`
- **Method**: `PUT`
- **Request Body**: (Any valid lead fields)

### 4. Delete a Lead
- **URL**: `/leads/:id`
- **Method**: `DELETE`

### 5. Export Leads
- **URL**: `/leads/export`
- **Method**: `GET`
- **Query Parameters**: `ids` (comma-separated list of IDs to export, optional)
- **Response**: Returns a `text/csv` file download.

# Advanced Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement advanced features including backend pagination, search, sorting, CSV export, and Docker containerization.

**Architecture:** Backend pagination uses Mongoose `skip` and `limit`. CSV export uses a library like `json2csv`. Frontend uses a debounced hook for search and a custom pagination component. Docker setup uses a multi-stage build for the client and a simple node image for the server.

**Tech Stack:** Node.js, Express, React, MongoDB, json2csv, Docker, Docker Compose.

---

### Task 1: Backend Pagination, Search, and Sorting

**Files:**
- Modify: `packages/server/src/controllers/leadController.ts`

- [ ] **Step 1: Update getLeads controller**
Implement:
- `page` (default: 1) and `limit` (default: 10) logic.
- `search` (name or email) using `$or` and regex.
- `sortBy` (Latest/Oldest).
- Return pagination metadata (total, pages, current).

- [ ] **Step 2: Commit**

```bash
git add packages/server/src/controllers/leadController.ts
git commit -m "feat: implement backend pagination, search, and sorting"
```

---

### Task 2: Frontend Pagination and Search

**Files:**
- Create: `packages/client/src/components/leads/Pagination.tsx`
- Modify: `packages/client/src/pages/LeadsList.tsx`
- Create: `packages/client/src/hooks/useDebounce.ts`

- [ ] **Step 1: Create Pagination component**
Port the pagination HTML from the designs.

- [ ] **Step 2: Implement useDebounce hook**

- [ ] **Step 3: Integrate Pagination and Search in LeadsList**
Update state to handle `page`, `limit`, and `search`.

- [ ] **Step 4: Commit**

```bash
git add packages/client/src
git commit -m "feat: implement frontend pagination and debounced search"
```

---

### Task 3: CSV Export Functionality

**Files:**
- Modify: `packages/server/src/routes/leadRoutes.ts`
- Modify: `packages/server/src/controllers/leadController.ts`
- Modify: `packages/client/src/pages/LeadsList.tsx`

- [ ] **Step 1: Implement exportLeads controller**
Use `json2csv` to convert selected leads to CSV and send as file attachment.

- [ ] **Step 2: Add export route in backend**

- [ ] **Step 3: Add bulk selection and Export button logic in frontend**

- [ ] **Step 4: Commit**

```bash
git add packages/server/src packages/client/src
git commit -m "feat: implement CSV export functionality"
```

---

### Task 4: Docker Setup

**Files:**
- Create: `Dockerfile` (Root or per package)
- Create: `docker-compose.yml`
- Create: `.dockerignore`

- [ ] **Step 1: Create Dockerfiles for client and server**

- [ ] **Step 2: Create docker-compose.yml**
Orchestrate MongoDB, Server, and Client.

- [ ] **Step 3: Commit**

```bash
git add Dockerfile docker-compose.yml .dockerignore
git commit -m "feat: add docker setup for the entire application"
```

# Leads Core Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the core Leads Management functionality, including the backend model, CRUD API with RBAC, and the frontend dashboard with a list of leads.

**Architecture:** Backend uses Mongoose for Lead storage. API includes filtering by status/source and RBAC logic in the fetch controller. Frontend uses a shared Layout component for the Sidebar and Topbar.

**Tech Stack:** Node.js, Express, Mongoose, React, TailwindCSS, Axios, Lucide React (or Material Symbols).

---

### Task 1: Lead Model Implementation

**Files:**
- Create: `packages/server/src/models/Lead.ts`
- Modify: `packages/shared/src/types/lead.ts` (if needed)

- [ ] **Step 1: Define Lead Mongoose schema**

File: `packages/server/src/models/Lead.ts`
```typescript
import mongoose, { Schema, Document } from 'mongoose';
import { ILead } from '@service-hive/shared';

export interface ILeadDocument extends Omit<ILead, 'id'>, Document {}

const LeadSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Qualified', 'Lost'], 
    default: 'New' 
  },
  source: { 
    type: String, 
    enum: ['Website', 'Instagram', 'Referral'], 
    required: true 
  },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ILeadDocument>('Lead', LeadSchema);
```

- [ ] **Step 2: Commit**

```bash
git add packages/server/src/models/Lead.ts
git commit -m "feat: add Lead mongoose model"
```

---

### Task 2: Leads API CRUD with RBAC

**Files:**
- Create: `packages/server/src/controllers/leadController.ts`
- Create: `packages/server/src/routes/leadRoutes.ts`
- Modify: `packages/server/src/index.ts`

- [ ] **Step 1: Implement Lead controllers**

File: `packages/server/src/controllers/leadController.ts`
Implement `getLeads` (with RBAC: Admins see all, Sales see assigned), `createLead`, `updateLead`, and `deleteLead`.

- [ ] **Step 2: Setup Lead routes**

File: `packages/server/src/routes/leadRoutes.ts`
Protect all routes with `protect` middleware.

- [ ] **Step 3: Register routes in main index.ts**

- [ ] **Step 4: Commit**

```bash
git add packages/server/src
git commit -m "feat: implement leads CRUD API with RBAC"
```

---

### Task 3: Dashboard Layout and Sidebar

**Files:**
- Create: `packages/client/src/components/layout/DashboardLayout.tsx`
- Create: `packages/client/src/components/layout/Sidebar.tsx`
- Create: `packages/client/src/components/layout/TopBar.tsx`
- Modify: `packages/client/src/App.tsx`

- [ ] **Step 1: Create Sidebar component**
Port the sidebar HTML from `leads_list_page/code.html`. Use React Router `NavLink` for active states.

- [ ] **Step 2: Create TopBar component**
Port the topbar HTML. Display user info from `AuthContext`.

- [ ] **Step 3: Create DashboardLayout**
Combine Sidebar, TopBar, and an `<Outlet />` for page content.

- [ ] **Step 4: Update App.tsx**
Add a layout route for protected dashboard pages.

- [ ] **Step 5: Commit**

```bash
git add packages/client/src
git commit -m "feat: implement dashboard layout with sidebar and topbar"
```

---

### Task 4: Leads List Page Integration

**Files:**
- Create: `packages/client/src/pages/LeadsList.tsx`
- Create: `packages/client/src/components/leads/LeadTable.tsx`
- Modify: `packages/client/src/App.tsx`

- [ ] **Step 1: Create LeadTable component**
Port the table HTML. Add props for data and loading state.

- [ ] **Step 2: Implement LeadsList page**
Fetch leads from the API. Add basic filtering (Status/Source) logic.

- [ ] **Step 3: Add route in App.tsx**

- [ ] **Step 4: Commit**

```bash
git add packages/client/src
git commit -m "feat: implement leads list page with API integration"
```

---

### Task 5: New Lead Modal

**Files:**
- Create: `packages/client/src/components/leads/AddLeadModal.tsx`
- Modify: `packages/client/src/pages/LeadsList.tsx`

- [ ] **Step 1: Create AddLeadModal component**
Based on `add_edit_lead_modal/code.html`.

- [ ] **Step 2: Integrate Modal into LeadsList**
Add state to open/close the modal and refresh list on success.

- [ ] **Step 3: Commit**

```bash
git add packages/client/src
git commit -m "feat: add create lead modal and integration"
```

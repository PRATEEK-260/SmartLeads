# Setup and Auth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize the Smart Leads Dashboard monorepo and implement the complete Authentication system (JWT, RBAC) with a polished UI based on provided designs.

**Architecture:** Monorepo using NPM Workspaces. Backend is an Express server with TypeScript and MongoDB (Mongoose). Frontend is a Vite-based React application with TailwindCSS. Shared package for shared TypeScript interfaces.

**Tech Stack:** Node.js, Express, TypeScript, MongoDB, Mongoose, React, Vite, TailwindCSS, JWT, bcrypt.

---

### Task 1: Project Initialization

**Files:**
- Create: `package.json` (Root)
- Create: `.gitignore`
- Create: `tsconfig.json` (Root)

- [ ] **Step 1: Initialize root package.json with workspaces**

```json
{
  "name": "service-hive-monorepo",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "client": "npm run dev -w packages/client",
    "server": "npm run dev -w packages/server",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "build": "npm run build -w packages/shared && npm run build -w packages/server && npm run build -w packages/client"
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "typescript": "^5.3.3"
  }
}
```

- [ ] **Step 2: Create .gitignore**

```text
node_modules
dist
.env
.DS_Store
packages/client/dist
packages/server/dist
```

- [ ] **Step 3: Create root tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "rootDir": "."
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add package.json .gitignore tsconfig.json
git commit -m "chore: initialize monorepo structure"
```

---

### Task 2: Shared Package Setup

**Files:**
- Create: `packages/shared/package.json`
- Create: `packages/shared/tsconfig.json`
- Create: `packages/shared/src/index.ts`
- Create: `packages/shared/src/types/user.ts`
- Create: `packages/shared/src/types/lead.ts`

- [ ] **Step 1: Create packages/shared/package.json**

```json
{
  "name": "@service-hive/shared",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  }
}
```

- [ ] **Step 2: Create packages/shared/tsconfig.json**

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Define User and Lead interfaces**

File: `packages/shared/src/types/user.ts`
```typescript
export type UserRole = 'Admin' | 'Sales';

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}
```

File: `packages/shared/src/types/lead.ts`
```typescript
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type LeadSource = 'Website' | 'Instagram' | 'Referral';

export interface ILead {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  assignedTo: string;
  createdAt: Date;
}
```

- [ ] **Step 4: Export types in packages/shared/src/index.ts**

```typescript
export * from './types/user.js';
export * from './types/lead.js';
```

- [ ] **Step 5: Build shared package**

Run: `npm run build -w packages/shared`

- [ ] **Step 6: Commit**

```bash
git add packages/shared
git commit -m "feat: setup shared package with core types"
```

---

### Task 3: Server Package Setup

**Files:**
- Create: `packages/server/package.json`
- Create: `packages/server/tsconfig.json`
- Create: `packages/server/src/index.ts`
- Create: `packages/server/.env.example`

- [ ] **Step 1: Create packages/server/package.json**

```json
{
  "name": "@service-hive/server",
  "version": "1.0.0",
  "main": "dist/index.js",
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@service-hive/shared": "*",
    "express": "^4.18.2",
    "mongoose": "^8.1.1",
    "dotenv": "^16.4.1",
    "cors": "^2.8.5",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.11.16",
    "@types/cors": "^2.8.17",
    "@types/bcrypt": "^5.0.2",
    "@types/jsonwebtoken": "^9.0.5",
    "nodemon": "^3.0.3",
    "ts-node": "^10.9.2"
  }
}
```

- [ ] **Step 2: Create packages/server/tsconfig.json**

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create basic Express server in packages/server/src/index.ts**

```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const start = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB');
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

start();
```

- [ ] **Step 4: Create .env.example**

```text
PORT=5000
MONGODB_URI=mongodb://localhost:27017/servicehive
JWT_SECRET=your_super_secret_key
```

- [ ] **Step 5: Commit**

```bash
git add packages/server
git commit -m "feat: setup server package scaffold"
```

---

### Task 4: Client Package Setup

**Files:**
- Create: `packages/client/package.json`
- Create: `packages/client/tailwind.config.js`
- Create: `packages/client/src/main.tsx`

- [ ] **Step 1: Initialize Vite project**

Run: `npx create-vite packages/client --template react-ts`
(Note: Clean up default Vite boilerplate afterwards)

- [ ] **Step 2: Configure TailwindCSS in packages/client/tailwind.config.js**

Use the config from `stitch_smart_leads_crm_dashboard/login_register_page/code.html`.

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "error-container": "#ffdad6",
        "on-tertiary-container": "#fffbff",
        "tertiary": "#904900",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        "surface-variant": "#d3e4fe",
        "secondary-fixed-dim": "#c3c0ff",
        "inverse-surface": "#213145",
        "on-primary-fixed-variant": "#2f2ebe",
        "on-secondary-container": "#fffbff",
        "surface-bright": "#f8f9ff",
        "on-tertiary": "#ffffff",
        "on-surface-variant": "#464554",
        "on-primary-fixed": "#07006c",
        "surface-container-lowest": "#ffffff",
        "on-primary-container": "#fffbff",
        "on-tertiary-fixed": "#301400",
        "on-secondary-fixed": "#0f0069",
        "primary-fixed": "#e1e0ff",
        "surface-container": "#e5eeff",
        "primary": "#4648d4",
        "background": "#f8f9ff",
        "outline": "#767586",
        "secondary": "#4b41e1",
        "surface-container-highest": "#d3e4fe",
        "inverse-on-surface": "#eaf1ff",
        "inverse-primary": "#c0c1ff",
        "primary-container": "#6063ee",
        "surface-container-high": "#dce9ff",
        "on-secondary-fixed-variant": "#3323cc",
        "secondary-fixed": "#e2dfff",
        "surface-tint": "#494bd6",
        "on-surface": "#0b1c30",
        "on-primary": "#ffffff",
        "primary-fixed-dim": "#c0c1ff",
        "surface-container-low": "#eff4ff",
        "secondary-container": "#645efb",
        "surface-dim": "#cbdbf5",
        "surface": "#f8f9ff",
        "tertiary-fixed": "#ffdcc5",
        "error": "#ba1a1a",
        "on-secondary": "#ffffff",
        "outline-variant": "#c7c4d7",
        "tertiary-container": "#b55d00",
        "on-background": "#0b1c30",
        "tertiary-fixed-dim": "#ffb783",
        "on-tertiary-fixed-variant": "#703700"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "card": "10px",
        "full": "9999px"
      },
      "spacing": {
        "gutter": "24px",
        "md": "16px",
        "base": "4px",
        "3xl": "64px",
        "container-max": "1440px",
        "xs": "4px",
        "2xl": "48px",
        "sm": "8px",
        "lg": "24px",
        "xl": "32px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

- [ ] **Step 3: Add @tailwindcss/forms to packages/client/package.json**

Run: `npm install -D @tailwindcss/forms -w packages/client`

- [ ] **Step 4: Commit**

```bash
git add packages/client
git commit -m "feat: setup client package scaffold with tailwind config"
```

---

### Task 5: Backend Auth Implementation

**Files:**
- Create: `packages/server/src/models/User.ts`
- Create: `packages/server/src/controllers/authController.ts`
- Create: `packages/server/src/routes/authRoutes.ts`
- Modify: `packages/server/src/index.ts`

- [ ] **Step 1: Create User Mongoose model**

File: `packages/server/src/models/User.ts`
Implement schema with password hashing middleware and `Admin` role logic for first user.

- [ ] **Step 2: Implement Registration and Login controllers**

File: `packages/server/src/controllers/authController.ts`
Include JWT generation.

- [ ] **Step 3: Setup Auth routes**

File: `packages/server/src/routes/authRoutes.ts`

- [ ] **Step 4: Register routes in main index.ts**

- [ ] **Step 5: Commit**

```bash
git add packages/server/src
git commit -m "feat: implement backend authentication with JWT and RBAC"
```

---

### Task 6: Frontend Auth Implementation

**Files:**
- Create: `packages/client/src/pages/Login.tsx`
- Create: `packages/client/src/pages/Register.tsx`
- Create: `packages/client/src/components/AuthLayout.tsx`

- [ ] **Step 1: Create AuthLayout with shared styles from design**

- [ ] **Step 2: Implement Login page using Stitch HTML structure**

- [ ] **Step 3: Implement Register page similarly**

- [ ] **Step 4: Setup React Router and protected routes**

- [ ] **Step 5: Commit**

```bash
git add packages/client/src
git commit -m "feat: implement frontend auth UI based on designs"
```

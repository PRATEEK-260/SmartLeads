# Design Spec: Frontend Auth Implementation

## Overview
Implement the Login and Register pages in the React frontend, integrate with the Backend Auth API, and setup routing with protected routes.

## Proposed Changes

### 1. Dependencies
Install the following in `packages/client`:
- `react-router-dom`: For routing.
- `axios`: For API requests.
- `lucide-react`: For iconography (substituting Material Symbols).

### 2. API Service (`packages/client/src/services/api.ts`)
- Create a central Axios instance.
- Configure `baseURL` from environment variables.
- Add an interceptor to include the JWT token from `localStorage` in the `Authorization` header for all requests.

### 3. Auth Context (`packages/client/src/context/AuthContext.tsx`)
- Manage `user` state, `token` state, and `loading` state.
- Provide `login`, `register`, and `logout` functions.
- On initialization, check `localStorage` for an existing token and fetch user details if present.

### 4. Components & Layouts
- **AuthLayout.tsx**: A wrapper for Login and Register pages. Includes the decorative background blobs and brand identity (logo/title).
- **Login.tsx**: Ported from `login_register_page/code.html`. Includes email/password fields, "Remember me" (optional for now), and Google/SSO placeholders.
- **Register.tsx**: Similar to Login but with additional fields (Name) as per the User schema.
- **ProtectedRoute.tsx**: A higher-order component or wrapper that redirects unauthenticated users to `/login`.

### 5. Routing (`packages/client/src/App.tsx`)
- Setup `BrowserRouter`, `Routes`, and `Route`.
- Define routes:
  - `/login`: Public
  - `/register`: Public
  - `/`: Protected (Dashboard placeholder)

## Data Flow
1. User enters credentials in `Login.tsx`.
2. `Login.tsx` calls `authContext.login(email, password)`.
3. `authContext.login` calls the API via `axios`.
4. On success, the JWT is stored in `localStorage` and `authContext` updates its state.
5. `Login.tsx` redirects the user to the dashboard.

## Verification Plan
- **Manual Testing**:
  - Try accessing the root `/` without being logged in -> should redirect to `/login`.
  - Register a new user -> should succeed and log in.
  - Log in with existing user -> should succeed.
  - Check `localStorage` for the token.
  - Verify that the UI matches the design (Tailwind classes, layout).
- **Automated Testing**:
  - Add basic unit tests for `AuthContext` if time permits (or just ensure it works manually first).

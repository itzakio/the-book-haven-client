# Copilot / AI Agent Instructions — The Book Haven

Quick orientation
- Type: React single-page app (Vite) + Firebase Auth + hosted API at https://the-book-haven-api.vercel.app
- Main patterns: Client-only frontend, global `AuthProvider`, two axios instances (public `useAxios` and authenticated `useAxiosSecure`), nested routes with a protected `/dashboard` section.

Architecture & high-level flow
- App entry: `src/main.jsx` (wraps `AuthProvider` and `QueryClientProvider`) and mounts `RouterProvider` using `src/routes/routes.jsx`.
- Routing: Public routes are defined in `routes.jsx`; dashboard routes are nested under `dashboard` and protected using `src/routes/PrivateRoute.jsx`.
- Auth: Firebase Authentication configured in `src/firebase/firebase.config.js`. `AuthProvider` (src/provider/AuthProvider.jsx) exposes user state and methods via `AuthContext`.
- Data/API: Two axios instances
  - `src/hooks/useAxios.jsx` — simple instance for public endpoints (baseURL points to the deployed API).
  - `src/hooks/useAxiosSecure.jsx` — attaches Authorization header (Bearer token) via interceptors and handles 401/403 flows (navigates or logs out).
- Data fetching helpers: `useFetchData` and `useFetchDataSecure` wrap the respective axios instances and return {data, loading, error}.

Key files to open when making changes
- Routing & layout: `src/routes/routes.jsx`, `src/layouts/RootLayout.jsx`, `src/layouts/DashboardLayout.jsx`
- Auth: `src/provider/AuthProvider.jsx`, `src/provider/AuthContext.jsx`, `src/firebase/firebase.config.js`
- API helpers: `src/hooks/useAxios.jsx`, `src/hooks/useAxiosSecure.jsx`, `src/hooks/useFetchData*.jsx`
- Pages that show common patterns: `src/pages/AddBook.jsx`, `src/pages/MyBooks.jsx`, `src/pages/AllBooks.jsx`

Project-specific conventions & gotchas
- Env vars (Vite): All environment variables must be prefixed with `VITE_` (example keys used here)
  - `VITE_apiKey`, `VITE_authDomain`, `VITE_projectId`, `VITE_storageBucket`, `VITE_messagingSenderId`, `VITE_appId` (Firebase)
  - `VITE_image_host_key` (imgbb upload key used in `AddBook.jsx`)
- Image uploads: `AddBook.jsx` uploads to imgbb (POST to `https://api.imgbb.com/1/upload?key=${VITE_image_host_key}`) and uses returned URL in payload.
- API routes (examples):
  - GET `/books` — public
  - POST `/books` — create book (used via `useAxiosSecure` in `AddBook.jsx`)
  - GET `/my-books?email=${user.email}` — fetch user's books (`useFetchDataSecure` usage in `MyBooks.jsx`)
  - DELETE `/books/:id` — delete a book (uses axiosSecure and front-end confirmation via SweetAlert2)
- Auth-protected routes: wrap with `PrivateRoute` or call `useAuth()` and check `user` + `userLoading`. `PrivateRoute` shows `Loading` while `userLoading`.
- Error handling in secure axios: interceptors try to handle 401/403 by redirecting/logging out — check `useAxiosSecure.jsx` for behavior.

Developer workflows & commands
- Start dev server: `npm run dev` (Vite)
- Build for production: `npm run build` → output to `dist` (see `firebase.json` which rewrites to `/index.html` for SPA hosting)
- Preview build locally: `npm run preview`
- Lint: `npm run lint` (ESLint rules present in repo)
- Deploy (hosted on Firebase in repository): build and then `firebase deploy` (Firebase CLI required and must be configured with the target project).

Styling & UI libraries
- TailwindCSS + DaisyUI used for utilities and component styling. Check `index.css`, `tailwind` usage is pervasive in components.
- Components follow a simple presentational pattern; pages are where data fetching and side effects happen.

Testing & observability
- There are no unit or integration tests in the repo. Use `React Query` (already configured via `QueryClientProvider`) for cacheable async workflows.

Examples (copy-pasteable snippets)
- Use public axios instance for simple GET:
```js
import useAxios from 'src/hooks/useAxios';
const axios = useAxios();
const {data} = await axios.get('/books');
```
- Use secure axios for auth-required requests (attaches `Authorization: Bearer <token>`):
```js
import useAxiosSecure from 'src/hooks/useAxiosSecure';
const axiosSecure = useAxiosSecure();
await axiosSecure.post('/books', { title: '...' });
```

Contribution notes for AI agents
- Preserve the `AuthProvider`-based shape (app expects `AuthContext` methods like `createUser`, `logIn`, `logOut`, `user`, `userLoading`).
- Prefer updating or reusing `useFetchData*` hooks for consistent loading/error states instead of ad-hoc fetch logic in pages.
- When touching `useAxiosSecure`, ensure interceptors are properly ejected in cleanup (avoid double-applying interceptors across renders).
- Use `import.meta.env.VITE_*` for environment variables; do not hardcode secrets.

What I couldn't confirm automatically
- Exact backend auth token field name and format. Code expects `user?.accessToken` to exist and be a Bearer token — confirm with backend if behavior differs.

If this looks good I can iterate and expand specific sections (examples for common PRs, code-mod patterns, or add a checklist for reviewers). Please tell me which parts you'd like clarified or expanded.
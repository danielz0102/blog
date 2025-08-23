# Blog Monorepo Copilot Instructions

## Architecture Overview

This is a full-stack blog monorepo with **three applications** managed via pnpm workspace:

- **`/api`**: Express.js REST API with layered architecture (shared by both frontends)
- **`/app`**: React Router v7 SSR public blog frontend
- **`/admin`**: Astro SSR admin dashboard with React components

## Monorepo Structure

### Workspace Management

```bash
pnpm --filter api <command>     # Run commands in API package
pnpm --filter app <command>     # Run commands in public app package
pnpm --filter admin <command>   # Run commands in admin package
pnpm dev:app                    # Start API + public app
pnpm dev:admin                  # Start API + admin dashboard
```

### Development Workflow

- API runs on port 3000 (Express with `--watch` flag)
- Public app runs on port 5173 (Vite dev server)
- Admin runs on port 4321 (Astro dev server)
- Environment variables: API uses `.env`, others use prefixed vars (`VITE_` for app, public env for admin)

## API Architecture (`/api`)

**Critical Pattern**: Strict layered architecture - **Routes → Middlewares → Controllers → Models → Database**

### Path Aliases (Essential)

Never use relative imports - always use Node.js import maps from `package.json`:

```javascript
import { PostsController } from "#controllers/PostsController.js";
import { validate } from "#middlewares/validate.js";
import { PostsModel } from "#models/PostsModel.js";
```

### Middleware Chain Order (Must Follow)

```javascript
router.post(
  "/",
  onlyAdmin, // 1. Authorization (if needed) - array [verifyToken, adminCheck]
  validate({ bodySchema: postSchema }), // 2. Validation with Zod schemas
  PostsController.create // 3. Controller action
);
```

### Authentication Pattern

- `verifyToken` → adds `req.user: { id, username, admin }`
- `onlyAdmin` → middleware array `[verifyToken, adminCheck]`
- Business rule: Only admins can CUD posts, both admins and users can create comments

## Frontend Architecture (`/app` - Public Blog)

### React Router v7 SSR Patterns

- File-based routing via `app/routes.ts` config
- Layout nesting: `MainLayout.tsx` wraps all routes
- Data loading via `clientLoader` in route files, not components
- Actions for mutations (POST/PUT/DELETE)

### Component Architecture

Atomic design with folder-per-component pattern:

- **Atoms**: `ActionButton/`, `Date/`, `Input/` (reusable UI in own folders)
- **Molecules**: `Comment/`, `Dialog/` (composed UI with logic)
- **Organisms**: `BlogPost/`, `CommentList/` (complex features)

### Critical Frontend Patterns

#### 1. Route Data Loading

Use `clientLoader` for data fetching in route files:

```tsx
export async function clientLoader() {
  return getRecentPosts(); // Service layer handles API calls
}

export default function Home({ loaderData: posts }: Route.ComponentProps) {
  // Use loaderData prop for type-safe data access
}
```

#### 2. ActionButton for Non-Form Mutations

```tsx
<ActionButton actionUrl="/comments/123/delete">Delete</ActionButton>
```

Uses `useFetcher()` internally for non-navigating POST requests.

#### 3. Service Layer Pattern

All API calls go through service files in `~/services/`:

```tsx
import { API_URL } from "~/config"; // From VITE_API_URL env var

export async function getPost(id: UUID): Promise<Post> {
  const response = await fetch(`${API_URL}/posts/${id}`);
  const data: GetRecentPostsResponse = await response.json();

  if (!response.ok || "error" in data) {
    throw new Error(data.error || "Failed to fetch");
  }

  return data.map(formatPost); // Transform data before returning
}
```

## Admin Architecture (`/admin` - Astro Dashboard)

### Astro SSR Patterns

- File-based routing in `src/pages/`
- React components embedded in `.astro` files
- Server-side authentication via middleware
- Actions defined in `src/actions/` using Astro's action system

### Key Admin Patterns

#### 1. Authentication Middleware

```javascript
// src/middleware.ts - runs on every request
export async function onRequest(context, next) {
  if (isProtectedRoute(context.url) && !adminTokenIsValid(token)) {
    return context.redirect("/login");
  }
  return next();
}
```

#### 2. Mixed Astro + React Components

```astro
---
// Server-side logic at top
const posts = await getPostsFromAPI();
---

<Layout>
  <ReactComponent client:load posts={posts} />
</Layout>
```

#### 3. Admin Actions

```typescript
// src/actions/posts.ts
export const deletePost = defineAction({
  input: z.object({ id: z.string() }),
  handler: async ({ id }, context) => {
    // Server-side API calls with admin authentication
  },
});
```

## Database & Business Logic

### Schema (Prisma)

- **User**: `{ id, username, password, admin }` - UUID primary keys
- **Post**: `{ title, content, isDraft, createdAt }` - drafts only visible to admins
- **Comment**: `{ content, createdAt, userId, postId }` - belongs to user and post

### Key Business Rules

- Posts with `isDraft: true` only visible to admins
- Regular users can only comment on published posts
- All mutations require authentication, most require admin role
- Models include related data: Posts include comments with user info
- Default ordering: Posts/comments by `createdAt: 'desc'`

## Development Commands

### Root Level

```bash
pnpm dev:app                    # Start API + public app
pnpm dev:admin                  # Start API + admin dashboard
pnpm --filter api dev           # API only
pnpm --filter app dev           # Public app only
pnpm --filter admin dev         # Admin dashboard only
```

### API Specific

```bash
npx prisma migrate dev --name "description"  # Create migration
npx prisma generate                          # Regenerate client
npx prisma studio                           # Database GUI
```

### App Specific

```bash
pnpm test          # Vitest with happy-dom
pnpm build         # Production build
pnpm typecheck     # TypeScript + React Router typegen
```

### Admin Specific

```bash
pnpm build         # Astro production build
pnpm preview       # Preview production build locally
```

## Testing Patterns

### Frontend (Vitest)

- Testing Library + happy-dom for DOM simulation
- Mock React Router with `createRoutesStub()`
- Environment setup in `tests/setup.ts`

### Key Testing Convention

Component tests always need router context - never render components directly without `createRoutesStub()`.

## Common Integration Patterns

### Authentication Flow

1. Login/register via `/api/users/login` → receives JWT
2. Store token in localStorage (public app) or cookies (admin)
3. Send `Authorization: Bearer <token>` header for protected routes

### Data Flow (Typical)

1. Route loader fetches initial data from API
2. Components render with loader data
3. Mutations via ActionButton → route actions → API calls
4. Optimistic updates with `useFetcher()` when needed

### Error Handling Pattern

```tsx
// Service layer error handling
if (!response.ok || "error" in data) {
  throw new Error(data.error || "Failed to fetch");
}

// Route action error responses
return data({ success: false, error: "Message" }, { status: 400 });
```

## Project-Specific Gotchas

- **API middleware order is critical** - auth before validation, validation before controller
- **React Router v7 disables plugins during Vitest** - check `vite.config.ts`
- **Prisma returns `null` for not found** - always check explicitly in controllers
- **Use `z.coerce.number()` for query params** (come as strings from HTTP)
- **Admin vs Public frontend separation** - Admin uses Astro actions, public app uses React Router actions
- **CORS configuration** - API has different allowed origins for production vs development
- **Astro middleware runs on every request** - check `isProtectedRoute()` utility for route filtering

## Common File Patterns

When adding new features:

### API Features

1. **Schema**: Create Zod validation in `api/src/lib/schemas/`
2. **Model**: Add database operations in `api/src/models/`
3. **Controller**: Add business logic in `api/src/controllers/`
4. **Routes**: Wire up endpoints in `api/src/routes/` with proper middleware order

### Public App Features

5. **Frontend Service**: Add API calls in `app/app/services/`
6. **Components**: Follow atomic design in `app/app/components/atoms|molecules|organisms/`
7. **Routes**: Add pages in `app/app/routes/` and update `routes.ts`

### Admin Features

8. **Pages**: Add Astro pages in `admin/src/pages/`
9. **Actions**: Add server actions in `admin/src/actions/`
10. **Components**: Reusable UI in `admin/src/components/`

## Critical Business Rules

- **Draft posts** (`isDraft: true`) only visible to admins via `/api/posts/drafts`
- **Public posts** accessible via `/api/posts` (excludes drafts)
- **Authentication required** for all mutations, most require admin role
- **Default ordering**: Posts/comments by `createdAt: 'desc'`

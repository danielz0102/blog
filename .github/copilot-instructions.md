# Blog Monorepo Copilot Instructions

## Architecture Overview

This is a full-stack blog monorepo with two applications managed via pnpm workspace:

- **`/api`**: Express.js REST API with layered architecture
- **`/app`**: React Router v7 SSR frontend with Vite + TailwindCSS

## Monorepo Structure

### Workspace Management

```bash
pnpm --filter blog-api <command>  # Run commands in API package
pnpm --filter blog-app <command>  # Run commands in app package
pnpm dev                          # Start both dev servers concurrently
```

### Development Workflow

- API runs on port 3000 (Express with --watch)
- App runs on port 5173 (Vite dev server with HMR)
- Environment variables: API uses `.env`, app uses `VITE_` prefixed vars

## API Architecture (`/api`)

**Critical Pattern**: Strict layered architecture - **Routes → Middlewares → Controllers → Models → Database**

### Path Aliases (Essential)

Never use relative imports - always use these aliases:

```javascript
import Controller from "#controllers/PostsController.js";
import { validate } from "#middlewares/validate.js";
import PostsModel from "#models/PostsModel.js";
```

### Middleware Chain Order (Must Follow)

```javascript
router.post(
  "/",
  onlyAdmin, // 1. Authorization (if needed)
  validate({ bodySchema: postSchema }), // 2. Validation
  Controller.action // 3. Controller
);
```

### Authentication Pattern

- `verifyToken` → adds `req.user: { id, username, admin }`
- `onlyAdmin` → array `[verifyToken, adminCheck]`
- Business rule: Only admins can CUD posts/comments, users can create comments

## Frontend Architecture (`/app`)

### React Router v7 SSR Patterns

- File-based routing via `app/routes.ts` config
- Layout nesting: `MainLayout.tsx` wraps all routes
- Data loading in route files, not components
- Actions for mutations (POST/PUT/DELETE)

### Component Architecture

Atomic design structure:

- **Atoms**: `ActionButton`, `PasswordField` (reusable UI)
- **Molecules**: `Comment`, `Dialog` (composed UI with logic)
- **Organisms**: `BlogPost`, `CommentList` (complex features)

### Critical Frontend Patterns

#### 1. ActionButton for Mutations

```tsx
<ActionButton actionUrl="/comments/123/delete">Delete</ActionButton>
```

Uses `useFetcher()` internally for non-navigating POST requests.

#### 2. API Communication

```typescript
import { API_URL } from "~/config"; // From VITE_API_URL env var
```

#### 3. Testing with React Router

Always wrap components in `createRoutesStub()` for testing:

```tsx
const Component = createRoutesStub([
  { path: "/", Component: () => <YourComponent /> },
]);
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

## Development Commands

### Root Level

```bash
pnpm dev                    # Start both API and app
pnpm --filter blog-api dev  # API only
pnpm --filter blog-app dev  # App only
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
2. Store token in localStorage (client-side)
3. Send `Authorization: Bearer <token>` header for protected routes

### Data Flow (Typical)

1. Route loader fetches initial data from API
2. Components render with loader data
3. Mutations via ActionButton → route actions → API calls
4. Optimistic updates with `useFetcher()` when needed

## Project-Specific Gotchas

- API middleware order is critical - auth before validation, validation before controller
- React Router v7 disables plugins during Vitest - check `vite.config.ts`
- Prisma returns `null` for not found - always check explicitly in controllers
- Use `z.coerce.number()` for query params (come as strings from HTTP)
- Frontend route actions must return Response objects for proper handling

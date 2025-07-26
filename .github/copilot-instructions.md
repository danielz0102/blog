# Blog App - AI Coding Agent Instructions

## Architecture Overview

This is a React blog application using Vite, React Router v7, and Vitest for testing. The app follows Atomic Design principles with a clear component hierarchy and uses React Router's data loading patterns.

### Key Architectural Patterns

**Component Structure (Atomic Design)**

- `@atoms/*` - Basic UI elements
- `@molecules/*` - Simple component combinations (e.g., `FormField`)
- `@organisms/*` - Complex components (e.g., `AuthForm`, `CommentForm`, `Header`)
- `@templates/*` - Page layouts (e.g., `App` template with `Header` + `Outlet`)

**React Router v7 Data Pattern**

- Each route has co-located `loader.js` and `action.js` files for data fetching
- Loaders run before route renders: `postsLoader`, `postLoader`, `userLoader`
- Actions handle form submissions: `authAction`, `commentAction`, `logoutAction`
- Use `useLoaderData()` to access loader data, not `useState` for initial data

## Critical Conventions

**File Organization**

- Each component/page lives in its own directory with `index.jsx` + `ComponentName.test.jsx`
- Route loaders/actions are co-located: `pages/Post/loader.js`, `pages/Post/comment/action.js`
- Shared utilities in `lib/`: `lib/actions/`, `lib/loaders/`, `lib/utils/`

**Import Aliases (jsconfig.json + vite.config.js)**

```javascript
import { FormField } from '@molecules/FormField'
import { userLoader } from '@/lib/loaders/userLoader'
import { API_URL } from '@/config'
```

**Authentication Pattern**

- JWT token stored in `localStorage` via `authAction.js`
- `userLoader()` decodes token client-side using `jwt-decode`
- User state available throughout app via router's root loader

## Testing Patterns

**Vitest + Testing Library Setup**

- Run tests: `pnpm test`
- Mock React Router hooks for component testing:

```javascript
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigation: vi.fn(() => ({ state: 'idle' })),
    useActionData: vi.fn(() => ({ error: 'Form failed' }))
  }
})
```

**Test File Convention**

- Every component has a co-located `.test.jsx` file
- Actions/loaders have `.test.js` files with comprehensive fetch mocking
- Use `createRoutesStub` for testing components that depend on router context

## Development Workflow

**Essential Commands**

- `pnpm dev` - Start development server
- `pnpm test` - Run test suite
- `pnpm lint` - ESLint check
- `pnpm format` - Prettier formatting

**API Integration**

- Backend URL configured via `VITE_API_URL` environment variable (default: `http://localhost:3000`)
- API calls handled in router actions/loaders, not in components
- Consistent error handling with `data()` responses for form errors

**Backend API Structure (blog-api repository)**

- Express.js layered architecture: Routes → Middlewares → Controllers → Models → Database
- Authentication: JWT Bearer tokens (stored in localStorage, decoded client-side)
- Endpoints:
  - `POST /users/sign-up` & `POST /users/login` - Return JWT token
  - `GET /posts` - Public posts (`isDraft: false`), includes comments with user info
  - `GET /posts/:id` - Individual post with nested comments
  - `POST /comments` - Requires auth, needs `{ content, postId }`
- Admin-only operations: Post creation/editing, draft access via `/posts/drafts`
- Role-based middleware: `onlyAdmin` for post management, `verifyToken` for comments

## Common Patterns

**Form Handling**

- Use React Router's `Form` component, not HTML forms
- Actions handle POST requests and return errors via `data()`
- Forms show errors using `useActionData()` hook

**Component Props**

- Pass minimal props down from routes: `<CommentForm postId={post.id} />`
- Complex data flows through router loaders, not prop drilling

**Error Boundaries**

- Root router has `UnexpectedError` boundary for unhandled errors
- Use `data()` responses for expected form validation errors

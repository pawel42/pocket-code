# Code Style

While pre-commit hooks and running `npm run lint:fix` will clear up the vast majority of formatting and lint issues automatically, agents must adhere strictly to the following stylistic guidelines during implementation:

## Arrow Functions Only

Always use arrow functions everywhere. This applies universally to components, hooks, array methods, and standard utility functions. Never use the `function` keyword.

- ❌ **Bad:**
  ```tsx
  function StandardComponent() {
    return <View />;
  }
  ```
- ✅ **Good:**
  ```tsx
  const StandardComponent = () => {
    return <View />;
  };
  ```

## Post-Declared Exports (No Inline Exports)

Never use inline `export` keywords. All exports must be grouped cleanly at the very bottom of the file in a specific, dense order with absolutely no empty spaces between them.

**Strict Bottom-of-File Export Order:**

1. Default exports
2. Value/named exports
3. Type exports

- ❌ **Bad:**
  ```tsx
  export const useData = () => {};
  export default MyComponent;
  ```
- ✅ **Good:**

  ```tsx
  const MyComponent = () => {};
  const useData = () => {};
  type ComponentProps = { id: string };

  export default MyComponent;
  export { useData };
  export type { ComponentProps };
  ```

## Prefer Types Over Interfaces

Always use `type` aliases for object structural contracts, props, and states. Do not use `interface`.

- ❌ **Bad:**
  ```tsx
  interface User {
    id: string;
    name: string;
  }
  ```
- ✅ **Good:**
  ```tsx
  type User = { id: string; name: string };
  ```

## Explicit Type Imports

When importing types, you must specify the `type` modifier.

- Use a type-only import statement if the source file provides only types.
- Use inline `type` keywords if you are co-importing values and types from the same file.

- ❌ **Bad:**
  ```tsx
  import { Session, SessionState } from './types';
  import { useSession, SessionConfig } from './sessionContext';
  ```
- ✅ **Good:**

  ```tsx
  // Type-only file import
  import type { Session, SessionState } from './types';

  // Mixed value and type file import
  import { useSession, type SessionConfig } from './sessionContext';
  ```

## Path Aliases Over Deep Relative Imports

Use path aliases (`@/*`) for cross-module imports to avoid deeply nested relative paths. Use relative imports only within a self-contained module or folder.

- ❌ **Bad:**
  ```tsx
  import { Button } from '../../../components/Button/Button';
  ```
- ✅ **Good:**

  ```tsx
  import { Button } from '@/components/Button/Button';
  ```

  **Exception (self-contained module/folder):**

  ```tsx
  import { formatTime } from './utils/date';
  ```

## File Naming Conventions

Use PascalCase for files that export a single React component. Use kebab-case for all other files, including hooks, utilities, constants, types, and compound components that export multiple components.

- Component files (single component): `Button.tsx`, `WorkspaceScreen.tsx`
- Non-component files: `use-auth.ts`, `format-date.ts`, `app-colors.ts`
- Compound component files: `form-field.tsx`, `tab-bar.tsx`

- ❌ **Bad:**
  ```
  useAuth.ts            (hook — should be kebab-case)
  apiClient.ts          (utility — should be kebab-case)
  TabBar.tsx            (compound component — should be kebab-case)
  ```
- ✅ **Good:**
  ```
  UserAvatar.tsx        (single component — PascalCase)
  use-auth.ts           (hook — kebab-case)
  api-client.ts         (utility — kebab-case)
  tab-bar.tsx           (compound component — kebab-case)
  ```

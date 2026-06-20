# Code Best Practices

Agents must follow these clean code architectural and stylistic guidelines to ensure codebase maintainability.

## Architecture & Design Principles

### Self-Documenting Code

Use descriptive, intention-revealing variable and function names. Avoid cryptic abbreviations.

- ❌ **Bad:**
  ```tsx
  const d = () => {
    const [s, setS] = useState(null);
    useEffect(() => {
      api.get('/sess').then((res) => setS(res.data));
    }, []);
    return s;
  };
  ```
- ✅ **Good:**
  ```tsx
  const useActiveSession = () => {
    const [session, setSession] = useState<Session | null>(null);
    useEffect(() => {
      api.get('/sessions/current').then((res) => setSession(res.data));
    }, []);
    return session;
  };
  ```

### Single Responsibility Principle (SRP)

Components and functions must do exactly one thing. Split large components into smaller, focused blocks.

- ❌ **Bad (Monolithic Layout & Logic):**

  ```tsx
  type Diff = { id: string; type: string; content: string };

  const Workspace = () => {
    const [diffs, setDiffs] = useState<Diff[]>([]);
    return (
      <ScrollView>
        {diffs.map((diff) => (
          <View key={diff.id}>
            <Text style={{ color: diff.type === 'add' ? 'green' : 'red' }}>{diff.content}</Text>
            <TouchableOpacity onPress={() => api.post(`/commit/${diff.id}`)}>
              <Text>Commit</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  };
  ```

- ✅ **Good (Isolated Layout & Item Blocks):**

  ```tsx
  type Diff = { id: string; type: string; content: string };

  const Workspace = () => {
    const { diffs, handleCommit } = useWorkspaceData();
    return (
      <ScrollView>
        <DiffList items={diffs} onCommit={handleCommit} />
      </ScrollView>
    );
  };

  type DiffListProps = { items: Diff[]; onCommit: (id: string) => void };

  const DiffList = ({ items, onCommit }: DiffListProps) =>
    items.map((item) => <DiffItem key={item.id} item={item} onCommit={onCommit} />);

  type DiffItemProps = { item: Diff; onCommit: (id: string) => void };

  const DiffItem = ({ item, onCommit }: DiffItemProps) => (
    <View>
      <Text style={{ color: item.type === 'add' ? 'green' : 'red' }}>{item.content}</Text>
      <TouchableOpacity onPress={() => onCommit(item.id)}>
        <Text>Commit</Text>
      </TouchableOpacity>
    </View>
  );

  export { Workspace };
  ```

### Don't Repeat Yourself (DRY)

Extract repeated formatting expressions, calculations, or logic configurations into utility helpers.

- ❌ **Bad:**

  ```tsx
  const dateA = new Date(s.createdAt).toLocaleDateString('en-US', { hour: '2-digit' });

  const dateB = new Date(l.timestamp).toLocaleDateString('en-US', { hour: '2-digit' });
  ```

- ✅ **Good:**

  ```tsx
  const formatTime = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { hour: '2-digit' });

  export { formatTime };
  // Use: const dateA = formatTime(s.createdAt);
  ```

## TypeScript Conventions

### Prefer Types Over Interfaces

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

### No `any` Type

Never use `any`. Every function, hook, component, and utility must have explicit, typed parameters and return values.

- ❌ **Bad:**

  ```tsx
  const Button = ({ props }: any) => (
    <TouchableOpacity onPress={props.action}>
      <Text>Go</Text>
    </TouchableOpacity>
  );

  const fetchData = async (id: any): Promise<any> => {
    return api.get(`/items/${id}`);
  };

  const useData = (params: any) => {
    const [data, setData] = useState<any>(null);
    // ...
  };
  ```

- ✅ **Good:**

  ```tsx
  type ButtonProps = { title: string; onPress: () => void };

  const Button = ({ title, onPress }: ButtonProps) => (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );

  type Item = { id: string; name: string };

  const fetchData = async (id: string): Promise<Item> => {
    return api.get(`/items/${id}`);
  };

  type FetchParams = { id: string };

  const useData = (params: FetchParams) => {
    const [data, setData] = useState<Item | null>(null);
    // ...
  };

  export { Button, fetchData, useData };
  ```

### Explicit Type Imports

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

## Export & Import Conventions

### Post-Declared Exports (No Inline Exports)

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
  type ComponentProps = { id: string };

  const useData = () => {};

  const MyComponent = () => {};

  export default MyComponent;
  export { useData };
  export type { ComponentProps };
  ```

### Clean Exports via Barrel Files

Use index.ts files within directories to aggregate and expose public features cleanly. This avoids deeply nested, messy import paths throughout the application.

- ❌ **Bad:**
  ```tsx
  import { Button } from '../../components/Button';
  import { Card } from '../../components/Card';
  ```
- ✅ **Good:**

  ```tsx
  // components/index.ts
  export { Button } from './Button';
  export { Card } from './Card';

  // In your screen file:
  import { Button, Card } from '../../components';
  ```

### Path Aliases Over Deep Relative Imports

Use path aliases (`@/*`) for cross-module imports to avoid deeply nested relative paths. Use relative imports only within a self-contained module or folder.

- ❌ **Bad:**
  ```tsx
  import { Button } from '../../../components/Button';
  ```
- ✅ **Good:**

  ```tsx
  import { Button } from '@/components/Button';
  ```

  **Exception (self-contained module/folder):**

  ```tsx
  import { formatTime } from './utils/date';
  ```

## Style & Naming Conventions

### Arrow Functions Only

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

### File Naming Conventions

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

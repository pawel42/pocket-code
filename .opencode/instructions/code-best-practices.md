# Code Best Practices

Agents must follow these clean code architectural guidelines to ensure codebase maintainability.

## Self-Documenting Code

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

## Single Responsibility Principle (SRP)

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

## Don't Repeat Yourself (DRY)

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

## Component Prop Explicit Typing

To guarantee contract enforcement, avoid utilizing `any`. Explicitly declare prop shapes with TypeScript. Always type code across the entire codebase.

- ❌ **Bad:**
  ```tsx
  const Button = ({ props }: any) => (
    <TouchableOpacity onPress={props.action}>
      <Text>Go</Text>
    </TouchableOpacity>
  );
  ```
- ✅ **Good:**

  ```tsx
  type ButtonProps = { title: string; onPress: () => void };

  const Button = ({ title, onPress }: ButtonProps) => (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );

  export { Button };
  ```

## Clean Exports via Barrel Files (index.ts)

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

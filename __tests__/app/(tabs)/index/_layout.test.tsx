import { render, screen } from '@testing-library/react-native';

import IndexTabLayout from '@/app/(tabs)/index/_layout';

jest.mock('expo-router', () => {
  const React = require('react');
  const { Text, View } = require('react-native');

  const StackScreen = ({ options }: { options?: Record<string, unknown> }) => {
    const headerRight = options?.headerRight as (() => React.ReactElement) | undefined;
    return (
      <View testID="stack-screen">
        <Text testID="stack-screen-title">{(options?.title as string) ?? ''}</Text>
        {headerRight?.()}
      </View>
    );
  };

  const Stack = ({ children }: { children?: React.ReactNode }) => (
    <View testID="stack">{children}</View>
  );
  Stack.Screen = StackScreen;

  const Link = ({ children, ...props }: Record<string, unknown>) => (
    <Text testID="link" {...props}>
      {children}
    </Text>
  );

  return { Stack, Link };
});

jest.mock('expo-symbols', () => {
  const React = require('react');
  const { Text, View } = require('react-native');

  const SymbolView = (props: Record<string, unknown>) => (
    <View testID="symbol-view">
      <Text testID="symbol-name">{JSON.stringify(props.name)}</Text>
    </View>
  );

  return { SymbolView };
});

jest.mock('@/components/useColorScheme', () => ({
  useColorScheme: () => 'light',
}));

describe('(tabs)/index/_layout', () => {
  it('renders a Stack with Stack.Screen', () => {
    render(<IndexTabLayout />);

    expect(screen.getByTestId('stack')).toBeTruthy();
    expect(screen.getByTestId('stack-screen')).toBeTruthy();
  });

  it('sets the screen title to Tab One', () => {
    render(<IndexTabLayout />);

    expect(screen.getByTestId('stack-screen-title')).toHaveTextContent('Tab One');
  });

  it('renders a header right button with a Link', () => {
    render(<IndexTabLayout />);

    const link = screen.getByTestId('link');
    expect(link).toBeTruthy();
  });

  it('renders a SymbolView in the header right', () => {
    render(<IndexTabLayout />);

    const symbolView = screen.getByTestId('symbol-view');
    expect(symbolView).toBeTruthy();
    const symbolName = screen.getByTestId('symbol-name');
    expect(JSON.parse(symbolName.children[0] as string)).toEqual({
      ios: 'info.circle',
      android: 'info',
      web: 'info',
    });
  });
});

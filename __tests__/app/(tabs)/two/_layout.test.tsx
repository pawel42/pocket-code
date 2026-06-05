import { render, screen } from '@testing-library/react-native';

import TwoTabLayout from '@/app/(tabs)/two/_layout';

jest.mock('expo-router', () => {
  const React = require('react');
  const { Text, View } = require('react-native');

  const StackScreen = ({ options }: { options?: Record<string, unknown> }) => (
    <View testID="stack-screen">
      <Text testID="stack-screen-title">{(options?.title as string) ?? ''}</Text>
    </View>
  );

  const Stack = ({ children }: { children?: React.ReactNode }) => (
    <View testID="stack">{children}</View>
  );
  Stack.Screen = StackScreen;

  return { Stack };
});

describe('(tabs)/two/_layout', () => {
  it('renders a Stack with Stack.Screen', () => {
    render(<TwoTabLayout />);

    expect(screen.getByTestId('stack')).toBeTruthy();
    expect(screen.getByTestId('stack-screen')).toBeTruthy();
  });

  it('sets the screen title to Tab Two', () => {
    render(<TwoTabLayout />);

    expect(screen.getByTestId('stack-screen-title')).toHaveTextContent('Tab Two');
  });
});

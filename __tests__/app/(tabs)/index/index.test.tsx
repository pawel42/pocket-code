import { render, screen } from '@testing-library/react-native';

import TabOneScreen from '@/app/(tabs)/index/index';

jest.mock('@/components/Themed', () => {
  const React = jest.requireActual('react');
  const RNText = jest.requireActual('react-native').Text;
  const RNView = jest.requireActual('react-native').View;

  const ThemedText = (props) => React.createElement(RNText, props, props.children);

  const ThemedView = (props) => React.createElement(RNView, props, props.children);

  return { Text: ThemedText, View: ThemedView };
});

jest.mock('@/components/EditScreenInfo', () => {
  const React = jest.requireActual('react');
  const RNText = jest.requireActual('react-native').Text;

  const MockEditScreenInfo = ({ path }) =>
    React.createElement(RNText, { testID: 'edit-screen-info' }, path);
  MockEditScreenInfo.displayName = 'MockEditScreenInfo';

  return MockEditScreenInfo;
});

describe('Tab One screen', () => {
  it('renders the title text', () => {
    render(<TabOneScreen />);

    expect(screen.getByText('Tab One')).toBeTruthy();
  });

  it('renders EditScreenInfo with correct path', () => {
    render(<TabOneScreen />);

    const editInfo = screen.getByTestId('edit-screen-info');
    expect(editInfo).toHaveTextContent('app/(tabs)/index/index.tsx');
  });
});

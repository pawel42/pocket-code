import { render, screen } from '@testing-library/react-native';

import TabLayout from '@/app/(tabs)/_layout';

jest.mock('expo-router/unstable-native-tabs', () => {
  const React = require('react');
  const { Text, View } = require('react-native');

  const NativeTabsTriggerIcon = (props: Record<string, unknown>) => (
    <Text testID="tab-icon">{JSON.stringify(props)}</Text>
  );

  const NativeTabsTriggerLabel = ({ children }: { children?: string }) => (
    <Text testID="tab-label">{children}</Text>
  );

  const NativeTabsTrigger = ({ children, name }: { children?: React.ReactNode; name?: string }) => (
    <View testID={`tab-trigger-${name}`}>{children}</View>
  );
  NativeTabsTrigger.Label = NativeTabsTriggerLabel;
  NativeTabsTrigger.Icon = NativeTabsTriggerIcon;

  const NativeTabs = ({ children, ...props }: Record<string, unknown>) => (
    <View testID="native-tabs" {...props}>
      {children}
    </View>
  );
  NativeTabs.Trigger = NativeTabsTrigger;

  return { NativeTabs };
});

jest.mock('@/components/useColorScheme', () => ({
  useColorScheme: () => 'light',
}));

describe('(tabs) layout', () => {
  it('renders NativeTabs with correct props', () => {
    render(<TabLayout />);

    const nativeTabs = screen.getByTestId('native-tabs');
    expect(nativeTabs).toBeTruthy();
    expect(nativeTabs.props.tintColor).toBe('#2f95dc');
    expect(nativeTabs.props.backgroundColor).toBe('#fff');
    expect(nativeTabs.props.labelStyle).toEqual({ color: '#000' });
    expect(nativeTabs.props.disableTransparentOnScrollEdge).toBe(true);
  });

  it('renders two tab triggers with correct names', () => {
    render(<TabLayout />);

    expect(screen.getByTestId('tab-trigger-index')).toBeTruthy();
    expect(screen.getByTestId('tab-trigger-two')).toBeTruthy();
  });

  it('renders tab labels correctly', () => {
    render(<TabLayout />);

    const labels = screen.getAllByTestId('tab-label');
    expect(labels).toHaveLength(2);
    expect(labels[0]).toHaveTextContent('Tab One');
    expect(labels[1]).toHaveTextContent('Tab Two');
  });

  it('renders tab icons with correct SF symbols', () => {
    render(<TabLayout />);

    const icons = screen.getAllByTestId('tab-icon');
    expect(icons).toHaveLength(2);

    const icon0Props = JSON.parse(icons[0].children[0] as string);
    expect(icon0Props.sf).toBe('chevron.left.forwardslash.chevron.right');

    const icon1Props = JSON.parse(icons[1].children[0] as string);
    expect(icon1Props.sf).toEqual({ default: 'gearshape', selected: 'gearshape.fill' });
  });

  it('renders tab icons with correct Material icons', () => {
    render(<TabLayout />);

    const icons = screen.getAllByTestId('tab-icon');
    const icon0Props = JSON.parse(icons[0].children[0] as string);
    expect(icon0Props.md).toBe('code');

    const icon1Props = JSON.parse(icons[1].children[0] as string);
    expect(icon1Props.md).toEqual({ default: 'settings', selected: 'settings_filled' });
  });
});

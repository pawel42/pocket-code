import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useMemo } from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

const TabLayout = () => {
  const colorScheme = useColorScheme();
  const labelStyle = useMemo(() => ({ color: Colors[colorScheme].text }), [colorScheme]);

  return (
    <NativeTabs
      tintColor={Colors[colorScheme].tint}
      backgroundColor={Colors[colorScheme].background}
      labelStyle={labelStyle}
      disableTransparentOnScrollEdge
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Tab One</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="chevron.left.forwardslash.chevron.right" md="code" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="two">
        <NativeTabs.Trigger.Label>Tab Two</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'gearshape', selected: 'gearshape.fill' }}
          md={{ default: 'settings', selected: 'settings_filled' }}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default TabLayout;

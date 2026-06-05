import { Link, Stack } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useCallback } from 'react';
import { Pressable } from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

const ICON_NAME = { ios: 'info.circle', android: 'info', web: 'info' };

const IndexTabLayout = () => {
  const colorScheme = useColorScheme();

  const headerRight = useCallback(
    () => (
      <Link href="/modal" asChild>
        <Pressable style={{ marginRight: 15 }}>
          {({ pressed }) => (
            <SymbolView
              name={ICON_NAME}
              size={25}
              tintColor={Colors[colorScheme].text}
              style={{ opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </Link>
    ),
    [colorScheme]
  );

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Tab One', headerRight }} />
    </Stack>
  );
};

export default IndexTabLayout;

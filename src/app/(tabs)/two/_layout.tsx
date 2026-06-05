import { Stack } from 'expo-router';

const TwoTabLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Tab Two' }} />
    </Stack>
  );
};

export default TwoTabLayout;

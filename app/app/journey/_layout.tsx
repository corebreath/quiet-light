import { Stack } from 'expo-router';
import { Colors } from '../../src/constants/theme';

export default function JourneyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
        animation: 'slide_from_right',
      }}
    />
  );
}

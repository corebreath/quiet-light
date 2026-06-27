import { Redirect } from 'expo-router';
import { View } from 'react-native';
import { useStore } from '../src/store/useStore';
import { Colors } from '../src/constants/theme';

export default function Index() {
  const { state, loaded } = useStore();

  if (!loaded) {
    return <View style={{ flex: 1, backgroundColor: Colors.background }} />;
  }

  return state.onboardingComplete
    ? <Redirect href="/(tabs)/home" />
    : <Redirect href="/onboarding/welcome" />;
}

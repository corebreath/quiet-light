import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { QuietLight } from '../../src/components/ui/QuietLight';
import { Colors, Fonts, Spacing, Radius } from '../../src/constants/theme';

export default function WelcomeScreen() {
  const lightOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    lightOpacity.value = withTiming(1, { duration: 1000 });
    titleOpacity.value = withDelay(1200, withTiming(1, { duration: 1200 }));
    subtitleOpacity.value = withDelay(2600, withTiming(1, { duration: 1200 }));
    buttonOpacity.value = withDelay(4000, withTiming(1, { duration: 800 }));
  }, []);

  const lightStyle = useAnimatedStyle(() => ({ opacity: lightOpacity.value }));
  const titleStyle = useAnimatedStyle(() => ({ opacity: titleOpacity.value }));
  const subtitleStyle = useAnimatedStyle(() => ({ opacity: subtitleOpacity.value }));
  const buttonStyle = useAnimatedStyle(() => ({ opacity: buttonOpacity.value }));

  return (
    <View style={styles.container}>
      <Animated.View style={lightStyle}>
        <QuietLight size={80} brightness={65} pulsing />
      </Animated.View>

      <Animated.Text style={[styles.title, titleStyle]}>
        Inside you, there is a light{'\n'}that never goes out.
      </Animated.Text>

      <Animated.Text style={[styles.subtitle, subtitleStyle]}>
        No matter what happens outside,{'\n'}it is always there. Always safe.
      </Animated.Text>

      <Animated.View style={buttonStyle}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/onboarding/name')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Begin</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  title: {
    fontFamily: Fonts.light,
    fontSize: 26,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 38,
    marginTop: Spacing.xl,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    marginTop: Spacing.lg,
  },
  button: {
    marginTop: Spacing.xl,
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: Radius.pill,
    backgroundColor: Colors.quietLight,
  },
  buttonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 17,
    color: Colors.background,
  },
});

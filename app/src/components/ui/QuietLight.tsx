// The Quiet Light — the core visual symbol of the app.
// Represents the real self: always present, never fully extinguished.
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { Colors } from '../../constants/theme';

interface Props {
  size?: number;
  brightness?: number;  // 0–100
  pulsing?: boolean;
}

export function QuietLight({ size = 80, brightness = 50, pulsing = true }: Props) {
  const pulse = useSharedValue(0);

  useEffect(() => {
    if (pulsing) {
      pulse.value = withRepeat(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
        -1,
        true
      );
    }
  }, [pulsing]);

  const animStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulse.value, [0, 1], [1, 1.08]);
    const opacity = interpolate(pulse.value, [0, 1], [0.85, 1]);
    return { transform: [{ scale }], opacity };
  });

  const alpha = Math.max(0.15, brightness / 100);
  const haloSize = size * 2.2;
  const coreSize = size * 0.55;

  return (
    <View style={[styles.container, { width: haloSize, height: haloSize }]}>
      {/* Outer glow */}
      <Animated.View
        style={[
          styles.halo,
          animStyle,
          {
            width: haloSize,
            height: haloSize,
            borderRadius: haloSize / 2,
            backgroundColor: `rgba(255, 217, 125, ${alpha * 0.08})`,
          },
        ]}
      />
      {/* Mid glow */}
      <View
        style={[
          styles.halo,
          {
            width: size * 1.4,
            height: size * 1.4,
            borderRadius: (size * 1.4) / 2,
            backgroundColor: `rgba(255, 217, 125, ${alpha * 0.15})`,
          },
        ]}
      />
      {/* Core light */}
      <Animated.View
        style={[
          styles.core,
          animStyle,
          {
            width: coreSize,
            height: coreSize,
            borderRadius: coreSize / 2,
            backgroundColor: Colors.quietLight,
            opacity: alpha,
            shadowColor: Colors.quietLight,
            shadowRadius: size * 0.4,
            shadowOpacity: alpha * 0.9,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: {
    position: 'absolute',
  },
  core: {
    elevation: 12,
  },
});

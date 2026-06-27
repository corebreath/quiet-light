import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WeatherState } from '../../store/useStore';
import { Colors, Radius, Fonts } from '../../constants/theme';

const WEATHER: Record<WeatherState, { emoji: string; label: string; color: string }> = {
  sunny:        { emoji: '☀️', label: 'Bright',       color: Colors.sunny },
  partlyCloudy: { emoji: '⛅', label: 'Mixed',        color: Colors.partlyCloudy },
  stormy:       { emoji: '⛈️', label: 'Stormy',       color: Colors.stormy },
  foggy:        { emoji: '🌫️', label: 'Foggy',        color: Colors.foggy },
  windy:        { emoji: '💨', label: 'Swirling',     color: Colors.windy },
};

interface Props {
  weather: WeatherState;
  selected?: boolean;
  onPress?: () => void;
  size?: 'sm' | 'lg';
}

export function WeatherIcon({ weather, selected, onPress, size = 'lg' }: Props) {
  const { emoji, label, color } = WEATHER[weather];
  const isSmall = size === 'sm';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={[
        styles.container,
        isSmall ? styles.small : styles.large,
        selected && { borderColor: color, borderWidth: 2, backgroundColor: `${color}22` },
      ]}
      activeOpacity={0.75}
    >
      <Text style={isSmall ? styles.emojiSm : styles.emojiLg}>{emoji}</Text>
      {!isSmall && (
        <Text style={[styles.label, { color }]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

export { WEATHER };

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: Colors.surfaceCard,
  },
  large: {
    width: 64,
    height: 72,
    paddingVertical: 8,
  },
  small: {
    width: 40,
    height: 40,
  },
  emojiLg: { fontSize: 28 },
  emojiSm: { fontSize: 20 },
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: 11,
    marginTop: 4,
  },
});

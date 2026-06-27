import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QuietLight } from '../../src/components/ui/QuietLight';
import { WeatherIcon, WEATHER } from '../../src/components/inner-world/WeatherIcon';
import { useStore } from '../../src/store/useStore';
import type { WeatherState } from '../../src/store/useStore';
import { Colors, Fonts, Spacing, Radius } from '../../src/constants/theme';

const WEATHER_STATES: WeatherState[] = ['sunny', 'partlyCloudy', 'stormy', 'foggy', 'windy'];

const CHARACTERS: Record<string, { emoji: string }> = {
  owl: { emoji: '🦉' },
  fox: { emoji: '🦊' },
  turtle: { emoji: '🐢' },
};

export default function HomeScreen() {
  const { state, update } = useStore();
  const char = CHARACTERS[state.characterId] ?? CHARACTERS.owl;
  const weather = WEATHER[state.currentWeather];
  const chapterNum = state.chaptersComplete.length + 1;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Hello, {state.childName || 'friend'} {char.emoji}
          </Text>
          <Text style={styles.tagline}>Your quiet light is always with you.</Text>
        </View>

        <View style={styles.lightSection}>
          <QuietLight size={90} brightness={state.lightBrightness} pulsing />
          <Text style={styles.brightnessLabel}>
            {state.lightBrightness}% bright today
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How does it feel inside?</Text>
          <View style={styles.weatherRow}>
            {WEATHER_STATES.map((w) => (
              <WeatherIcon
                key={w}
                weather={w}
                size="sm"
                selected={state.currentWeather === w}
                onPress={() => update({ currentWeather: w })}
              />
            ))}
          </View>
          <Text style={styles.weatherLabel}>
            {weather.emoji} {weather.label} inside
          </Text>
        </View>

        <View style={styles.cardsRow}>
          <NavCard
            emoji="🌿"
            title="Practice"
            subtitle="3 or 10 minutes"
            onPress={() => router.push('/(tabs)/practice')}
          />
          <NavCard
            emoji="📖"
            title="Journey"
            subtitle={`Chapter ${chapterNum}`}
            onPress={() => router.push('/(tabs)/journey')}
          />
        </View>

        <NavCard
          emoji="🪞"
          title="Echo Journal"
          subtitle="What belongs to you?"
          onPress={() => router.push('/(tabs)/echo')}
          wide
        />

        {state.totalSessions > 0 && (
          <Text style={styles.sessionsNote}>
            {state.totalSessions} practice{state.totalSessions === 1 ? '' : 's'} completed
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function NavCard({
  emoji, title, subtitle, onPress, wide = false,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  wide?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.card, wide && styles.cardWide]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={styles.cardEmoji}>{emoji}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl },
  header: { paddingTop: Spacing.lg, marginBottom: Spacing.sm },
  greeting: {
    fontFamily: Fonts.bold,
    fontSize: 22,
    color: Colors.textPrimary,
  },
  tagline: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  lightSection: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  brightnessLabel: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
  },
  section: { marginBottom: Spacing.lg },
  sectionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  weatherRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  weatherLabel: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },
  cardWide: {
    flex: 0,
    width: '100%',
  },
  cardEmoji: { fontSize: 28, marginBottom: Spacing.xs },
  cardTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  cardSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  sessionsNote: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
});

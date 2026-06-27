import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WeatherIcon } from '../../src/components/inner-world/WeatherIcon';
import { useStore } from '../../src/store/useStore';
import type { WeatherState } from '../../src/store/useStore';
import { Colors, Fonts, Spacing, Radius } from '../../src/constants/theme';

const WEATHER_STATES: WeatherState[] = ['sunny', 'partlyCloudy', 'stormy', 'foggy', 'windy'];

const PROMPTS = [
  'Take a slow breath. Feel where your feet meet the ground.',
  'Now go inside. What\'s the weather like in your inner world right now?',
  'Whatever it is — sunny or stormy — it\'s okay. It\'s just weather. It will change.',
];

export default function CheckinScreen() {
  const [step, setStep] = useState(0);
  const { state, update, completeSession } = useStore();

  const handleWeatherSelect = (w: WeatherState) => {
    update({ currentWeather: w });
    completeSession();
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Morning Check-in</Text>
        <Text style={styles.counter}>{step + 1} of {PROMPTS.length}</Text>

        <View style={styles.promptCard}>
          <Text style={styles.prompt}>{PROMPTS[step]}</Text>
        </View>

        {step < PROMPTS.length - 1 ? (
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => setStep((s) => s + 1)}
            activeOpacity={0.8}
          >
            <Text style={styles.nextText}>I'm ready →</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.weatherSection}>
            <Text style={styles.weatherLabel}>Tap your weather:</Text>
            <View style={styles.weatherRow}>
              {WEATHER_STATES.map((w) => (
                <WeatherIcon
                  key={w}
                  weather={w}
                  selected={state.currentWeather === w}
                  onPress={() => handleWeatherSelect(w)}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing.lg, paddingBottom: Spacing.xl },
  back: { marginBottom: Spacing.lg },
  backText: { fontFamily: Fonts.regular, fontSize: 15, color: Colors.textSecondary },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.textPrimary,
  },
  counter: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 4,
    marginBottom: Spacing.lg,
  },
  promptCard: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    minHeight: 120,
    justifyContent: 'center',
  },
  prompt: {
    fontFamily: Fonts.light,
    fontSize: 20,
    color: Colors.textPrimary,
    lineHeight: 30,
  },
  nextBtn: {
    alignSelf: 'center',
    backgroundColor: Colors.quietLight,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: Radius.pill,
  },
  nextText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.background,
  },
  weatherSection: { marginTop: Spacing.md },
  weatherLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  weatherRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

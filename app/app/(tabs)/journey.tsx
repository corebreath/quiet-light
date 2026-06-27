import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../../src/store/useStore';
import { Colors, Fonts, Spacing, Radius } from '../../src/constants/theme';

const CHAPTERS = [
  { id: 'ch1', title: 'The Light Inside', subtitle: 'Discover your quiet center' },
  { id: 'ch2', title: 'The Weather of Feelings', subtitle: 'Feelings come and go like weather' },
  { id: 'ch3', title: 'The Still Pond', subtitle: 'You are the water, not the ripple' },
  { id: 'ch4', title: 'The Voices in the Wind', subtitle: 'Not every thought is yours' },
  { id: 'ch5', title: 'The Echo', subtitle: 'Feelings can belong to others' },
  { id: 'ch6', title: 'The Shadow Friend', subtitle: 'The confused part of you' },
  { id: 'ch7', title: 'The Quiet Chamber', subtitle: 'Your safe place inside' },
  { id: 'ch8', title: 'The Gardener', subtitle: 'Growing your light over time' },
];

export default function JourneyScreen() {
  const { state } = useStore();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>The Journey</Text>
        <Text style={styles.subheading}>
          {state.chaptersComplete.length} of {CHAPTERS.length} chapters complete
        </Text>

        {CHAPTERS.map((ch, i) => {
          const isComplete = state.chaptersComplete.includes(ch.id);
          const isNext = !isComplete && i === state.chaptersComplete.length;
          const isLocked = !isComplete && !isNext;

          return (
            <TouchableOpacity
              key={ch.id}
              style={[styles.card, isLocked && styles.cardLocked]}
              onPress={() => !isLocked && router.push(`/journey/${ch.id}` as any)}
              activeOpacity={isLocked ? 1 : 0.75}
              disabled={isLocked}
            >
              <View style={[
                styles.circle,
                isComplete && styles.circleComplete,
                isNext && styles.circleNext,
              ]}>
                <Text style={styles.circleText}>
                  {isComplete ? '✓' : String(i + 1)}
                </Text>
              </View>

              <View style={styles.cardBody}>
                <Text style={[styles.chTitle, isLocked && styles.textLocked]}>
                  {ch.title}
                </Text>
                <Text style={styles.chSubtitle}>{ch.subtitle}</Text>
              </View>

              {isNext && (
                <View style={styles.nextBadge}>
                  <Text style={styles.nextBadgeText}>Next</Text>
                </View>
              )}
              {isLocked && <Text style={styles.lockIcon}>🔒</Text>}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing.lg, paddingBottom: Spacing.xl },
  heading: {
    fontFamily: Fonts.bold,
    fontSize: 26,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subheading: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  cardLocked: { opacity: 0.4 },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleComplete: { backgroundColor: Colors.success },
  circleNext: { backgroundColor: Colors.quietLight },
  circleText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  cardBody: { flex: 1 },
  chTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  textLocked: { color: Colors.textMuted },
  chSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  nextBadge: {
    borderWidth: 1,
    borderColor: Colors.quietLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  nextBadgeText: {
    fontFamily: Fonts.semiBold,
    fontSize: 11,
    color: Colors.quietLight,
  },
  lockIcon: { fontSize: 16 },
});

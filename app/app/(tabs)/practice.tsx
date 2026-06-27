import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, Spacing, Radius } from '../../src/constants/theme';

const PRACTICES = [
  {
    id: 'checkin',
    emoji: '🌤️',
    title: 'Morning Check-in',
    duration: '2 min',
    description: 'Notice how your world feels inside today.',
    path: '/practice/checkin',
  },
  {
    id: 'short',
    emoji: '⚡',
    title: 'Quick Quieting',
    duration: '3 min',
    description: 'A fast return to your still center.',
    path: '/practice/short',
  },
  {
    id: 'pond',
    emoji: '🏞️',
    title: 'The Still Pond',
    duration: '5–8 min',
    description: 'Watch your thoughts like ripples on water.',
    path: '/practice/pond',
  },
  {
    id: 'long',
    emoji: '🌙',
    title: 'Deep Practice',
    duration: '10–15 min',
    description: 'A full journey to your quiet center.',
    path: '/practice/long',
  },
  {
    id: 'chamber',
    emoji: '🏛️',
    title: 'Quiet Chamber',
    duration: 'As long as you need',
    description: 'Your safe space, always here.',
    path: '/practice/chamber',
  },
];

export default function PracticeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Practices</Text>
        <Text style={styles.subheading}>Choose what feels right today.</Text>

        {PRACTICES.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={styles.card}
            onPress={() => router.push(p.path as any)}
            activeOpacity={0.75}
          >
            <Text style={styles.cardEmoji}>{p.emoji}</Text>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{p.title}</Text>
              <Text style={styles.cardDesc}>{p.description}</Text>
            </View>
            <Text style={styles.duration}>{p.duration}</Text>
          </TouchableOpacity>
        ))}
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
    fontSize: 15,
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
  cardEmoji: { fontSize: 32 },
  cardBody: { flex: 1 },
  cardTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  cardDesc: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  duration: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: Colors.textMuted,
  },
});

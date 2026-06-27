import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useStore } from '../../src/store/useStore';
import { Colors, Fonts, Spacing, Radius } from '../../src/constants/theme';

const CHARACTERS = [
  { id: 'owl', emoji: '🦉', name: 'Owl', trait: 'wise and still' },
  { id: 'fox', emoji: '🦊', name: 'Fox', trait: 'curious and brave' },
  { id: 'turtle', emoji: '🐢', name: 'Turtle', trait: 'grounded and safe' },
];

export default function CharacterScreen() {
  const [selected, setSelected] = useState('');
  const { state, update } = useStore();

  const handleContinue = () => {
    if (selected) {
      update({ characterId: selected, onboardingComplete: true });
      router.replace('/(tabs)/home');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.question}>
        Choose a guide,{'\n'}{state.childName || 'friend'}.
      </Text>
      <Text style={styles.subtitle}>They'll walk beside you on this journey.</Text>

      <View style={styles.grid}>
        {CHARACTERS.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={[styles.card, selected === c.id && styles.cardSelected]}
            onPress={() => setSelected(c.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.emoji}>{c.emoji}</Text>
            <Text style={styles.charName}>{c.name}</Text>
            <Text style={styles.trait}>{c.trait}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, !selected && styles.buttonDisabled]}
        onPress={handleContinue}
        disabled={!selected}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Begin my journey</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  question: {
    fontFamily: Fonts.light,
    fontSize: 26,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 36,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: Colors.quietLight,
    backgroundColor: `${Colors.quietLight}18`,
  },
  emoji: { fontSize: 40, marginBottom: Spacing.sm },
  charName: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  trait: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  button: {
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: Radius.pill,
    backgroundColor: Colors.quietLight,
  },
  buttonDisabled: { opacity: 0.35 },
  buttonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 17,
    color: Colors.background,
  },
});

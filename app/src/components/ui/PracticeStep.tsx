import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, Radius } from '../../constants/theme';

interface Props {
  step: number;
  total: number;
  instruction: string;
  note?: string;
}

export function PracticeStep({ step, total, instruction, note }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{step} of {total}</Text>
      <Text style={styles.instruction}>{instruction}</Text>
      {note ? <Text style={styles.note}>{note}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  counter: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  instruction: {
    fontFamily: Fonts.light,
    fontSize: 20,
    color: Colors.textPrimary,
    lineHeight: 30,
  },
  note: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    fontStyle: 'italic',
  },
});

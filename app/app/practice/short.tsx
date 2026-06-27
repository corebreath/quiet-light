import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QuietLight } from '../../src/components/ui/QuietLight';
import { useStore } from '../../src/store/useStore';
import { Colors, Fonts, Spacing, Radius } from '../../src/constants/theme';

const STEPS = [
  'Sit comfortably. Feel your feet on the ground.',
  'Take a slow breath in... and let it go.',
  'Notice the quiet inside you. It\'s always there — like a small flame that never goes out.',
  'If thoughts come, that\'s okay. Just notice them and let them pass. You are the one who notices.',
  'Rest here. You are safe inside yourself.',
];

export default function ShortPracticeScreen() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const { completeSession } = useStore();

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      completeSession();
      setDone(true);
    }
  };

  if (done) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.doneContainer}>
          <QuietLight size={80} brightness={80} pulsing />
          <Text style={styles.doneTitle}>Well done.</Text>
          <Text style={styles.doneText}>Your light got a little brighter.</Text>
          <TouchableOpacity style={styles.doneBtn} onPress={() => router.back()}>
            <Text style={styles.doneBtnText}>Return home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Quick Quieting</Text>
        <Text style={styles.counter}>{step + 1} of {STEPS.length}</Text>

        <View style={styles.lightArea}>
          <QuietLight size={70} brightness={50} pulsing />
        </View>

        <View style={styles.promptCard}>
          <Text style={styles.prompt}>{STEPS[step]}</Text>
        </View>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.8}>
          <Text style={styles.nextBtnText}>
            {step < STEPS.length - 1 ? 'Continue →' : 'Finish'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.lg },
  back: { marginBottom: Spacing.lg },
  backText: { fontFamily: Fonts.regular, fontSize: 15, color: Colors.textSecondary },
  title: { fontFamily: Fonts.bold, fontSize: 24, color: Colors.textPrimary },
  counter: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 4,
    marginBottom: Spacing.lg,
  },
  lightArea: { alignItems: 'center', marginBottom: Spacing.lg },
  promptCard: {
    flex: 1,
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  prompt: {
    fontFamily: Fonts.light,
    fontSize: 20,
    color: Colors.textPrimary,
    lineHeight: 30,
    textAlign: 'center',
  },
  nextBtn: {
    backgroundColor: Colors.quietLight,
    paddingVertical: 14,
    borderRadius: Radius.pill,
    alignItems: 'center',
  },
  nextBtnText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.background,
  },
  doneContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  doneTitle: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Colors.textPrimary,
    marginTop: Spacing.xl,
  },
  doneText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  doneBtn: {
    backgroundColor: Colors.quietLight,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: Radius.pill,
  },
  doneBtnText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.background,
  },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QuietLight } from '../../src/components/ui/QuietLight';
import { useStore } from '../../src/store/useStore';
import { Colors, Fonts, Spacing, Radius } from '../../src/constants/theme';

const STEPS = [
  {
    title: 'The Pond',
    text: 'Imagine a still pond inside you. When everything is quiet, the surface is perfectly smooth. You can see all the way to the bottom.',
  },
  {
    title: 'The Ripples',
    text: 'Now imagine a pebble drops in. Ripples spread out. A thought. A feeling. A memory. They ripple across the pond...',
  },
  {
    title: 'You are the water',
    text: "But notice — the pond doesn't become the ripple. The water watches the ripple. You are the pond. The thoughts and feelings are just ripples passing through.",
  },
  {
    title: 'Watch without following',
    text: "A thought appears: let it ripple and pass. Another comes: let it go too. You don't have to follow every ripple. You can just watch.",
  },
  {
    title: 'The stillness returns',
    text: 'As you stop feeding the ripples, the pond grows still again. This stillness is always here, underneath everything. This is you.',
  },
  {
    title: 'Practice now',
    text: "Close your eyes if you'd like. For one minute, just watch. Notice thoughts and feelings come and go. You are the watcher.",
  },
];

export default function PondScreen() {
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
        <View style={styles.center}>
          <QuietLight size={80} brightness={80} pulsing />
          <Text style={styles.doneTitle}>You are the pond.</Text>
          <Text style={styles.doneSubtitle}>Not the ripple.</Text>
          <TouchableOpacity style={styles.doneBtn} onPress={() => router.back()}>
            <Text style={styles.doneBtnText}>Return home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const current = STEPS[step];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>The Still Pond</Text>
        <Text style={styles.counter}>{step + 1} of {STEPS.length}</Text>

        <View style={styles.lightArea}>
          <QuietLight size={60} brightness={50} pulsing />
        </View>

        <View style={styles.promptCard}>
          <Text style={styles.stepTitle}>{current.title}</Text>
          <Text style={styles.stepText}>{current.text}</Text>
        </View>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.8}>
          <Text style={styles.nextBtnText}>
            {step < STEPS.length - 1 ? 'Continue →' : 'I practiced'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing.lg, paddingBottom: Spacing.xl },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
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
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    minHeight: 160,
  },
  stepTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.quietLight,
    marginBottom: Spacing.sm,
  },
  stepText: {
    fontFamily: Fonts.light,
    fontSize: 18,
    color: Colors.textPrimary,
    lineHeight: 28,
  },
  nextBtn: {
    backgroundColor: Colors.quietLight,
    paddingVertical: 14,
    borderRadius: Radius.pill,
    alignItems: 'center',
  },
  nextBtnText: { fontFamily: Fonts.semiBold, fontSize: 16, color: Colors.background },
  doneTitle: {
    fontFamily: Fonts.bold,
    fontSize: 30,
    color: Colors.textPrimary,
    marginTop: Spacing.xl,
  },
  doneSubtitle: {
    fontFamily: Fonts.light,
    fontSize: 18,
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
  doneBtnText: { fontFamily: Fonts.semiBold, fontSize: 16, color: Colors.background },
});

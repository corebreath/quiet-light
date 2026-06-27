import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QuietLight } from '../../src/components/ui/QuietLight';
import { useStore } from '../../src/store/useStore';
import { Colors, Fonts, Spacing, Radius } from '../../src/constants/theme';

const STEPS = [
  { title: 'Come inside', text: "Find a comfortable position. Let your body settle. You don't need to do anything right now — just be here." },
  { title: 'Feel the ground', text: "Notice your feet. Notice where you're sitting. The earth is holding you. You don't have to hold yourself up right now." },
  { title: 'Three breaths', text: 'Take three slow breaths. With each exhale, let go of anything you were holding onto. You can pick it up again later if you need it.' },
  { title: 'Find the quiet', text: "Somewhere inside you, there is a place that is always quiet. It doesn't get louder when life gets loud. It just stays still." },
  { title: 'The light', text: "In that quiet place, there is a small light. It was there before any of your problems. It will be there after. It's what you really are." },
  { title: 'Notice the weather', text: "What's the weather like in your world right now? Rain? Sun? Storm? Just notice it — like a sky watching its own clouds." },
  { title: 'You are not the weather', text: "The weather is real. But you are not the storm. You are the sky. The sky holds all kinds of weather without becoming any of them." },
  { title: 'What belongs to you?', text: "Is there a heavy feeling you've been carrying? Quietly ask: Is this mine? Did I make this? Or did I catch it from someone around me?" },
  { title: 'Return to the light', text: "Come back to that quiet flame inside you. Whatever the answer was — you're okay. The light is still here. It always will be." },
  { title: 'Slowly return', text: "When you're ready, take a breath. Feel your feet. Feel your hands. Gently come back to the room. Carry the quiet with you." },
];

export default function LongPracticeScreen() {
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
          <QuietLight size={90} brightness={90} pulsing />
          <Text style={styles.doneTitle}>You did something real today.</Text>
          <Text style={styles.doneSubtitle}>Your light is a little brighter for it.</Text>
          <TouchableOpacity style={styles.doneBtn} onPress={() => router.back()}>
            <Text style={styles.doneBtnText}>Return home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const current = STEPS[step];
  const brightness = Math.min(90, 35 + step * 6);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Deep Practice</Text>
        <Text style={styles.counter}>{step + 1} of {STEPS.length}</Text>

        <View style={styles.lightArea}>
          <QuietLight size={70} brightness={brightness} pulsing />
        </View>

        <View style={styles.promptCard}>
          <Text style={styles.stepTitle}>{current.title}</Text>
          <Text style={styles.stepText}>{current.text}</Text>
        </View>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.8}>
          <Text style={styles.nextBtnText}>
            {step < STEPS.length - 1 ? 'Continue →' : 'Complete'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.lg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  back: { marginBottom: Spacing.lg },
  backText: { fontFamily: Fonts.regular, fontSize: 15, color: Colors.textSecondary },
  title: { fontFamily: Fonts.bold, fontSize: 24, color: Colors.textPrimary },
  counter: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 4,
    marginBottom: Spacing.sm,
  },
  lightArea: { alignItems: 'center', marginBottom: Spacing.md },
  promptCard: {
    flex: 1,
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  stepTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.quietLight,
    marginBottom: Spacing.sm,
  },
  stepText: {
    fontFamily: Fonts.light,
    fontSize: 19,
    color: Colors.textPrimary,
    lineHeight: 29,
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
    fontSize: 24,
    color: Colors.textPrimary,
    marginTop: Spacing.xl,
    textAlign: 'center',
  },
  doneSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  doneBtn: {
    backgroundColor: Colors.quietLight,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: Radius.pill,
  },
  doneBtnText: { fontFamily: Fonts.semiBold, fontSize: 16, color: Colors.background },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QuietLight } from '../../src/components/ui/QuietLight';
import { useStore } from '../../src/store/useStore';
import { Colors, Fonts, Spacing, Radius } from '../../src/constants/theme';

const CHAPTERS: Record<string, { title: string; pages: string[] }> = {
  ch1: {
    title: 'The Light Inside',
    pages: [
      'Once, before anyone taught you anything, before you learned how to be afraid or angry or sad — there was a light inside you.',
      'It was quiet. It was warm. And it belonged only to you.',
      'People may have tried to change it. Life may have covered it with clouds. But the light never went out. Not even once.',
      'That light is what you really are. Not the clouds. Not the storms. The quiet, steady light underneath.',
      'In this journey, you will learn to find it again. And once you find it, you\'ll always know the way back.',
    ],
  },
  ch2: {
    title: 'The Weather of Feelings',
    pages: [
      'Have you ever woken up and felt like a storm was already happening inside you?',
      'Or maybe you felt foggy — like you couldn\'t quite see or think clearly.',
      'Feelings are like weather. They come, they move through you, and they go.',
      'Sunny days happen. Stormy days happen. Foggy days happen too. None of them last forever.',
      'You are not the storm. You are the sky that holds all kinds of weather — and keeps going.',
    ],
  },
  ch3: {
    title: 'The Still Pond',
    pages: [
      'Imagine a pond deep inside you. When everything is quiet, the surface is perfectly still.',
      'When a thought comes, it drops into the pond like a pebble. Ripples spread out.',
      'You might feel pulled to follow the ripple — to think about the thought, to worry, to react.',
      'But the pond doesn\'t become the ripple. You are the water. You can watch the ripples without being swept away.',
      'When you stop feeding the ripples, the pond goes still again. This stillness is always available to you.',
    ],
  },
  ch4: {
    title: 'The Voices in the Wind',
    pages: [
      'Not every thought in your head was made by you.',
      'Some thoughts were put there by people you love. By things you heard at school. By shows you watched. By worries that don\'t belong to you.',
      'These thoughts blow through you like voices in the wind. They\'re real — but they\'re not all yours.',
      'You can learn to notice: "Is this thought something I truly believe? Or is it just passing through?"',
      "You don't have to believe every thought you have. You are the one who watches thoughts — you are not the thoughts.",
    ],
  },
  ch5: {
    title: 'The Echo',
    pages: [
      'Sometimes you feel something strongly — anger, or sadness, or fear — and you don\'t know why.',
      'Here\'s a secret: feelings can travel. When someone near you is angry, that anger can move into you, like an echo bouncing off a wall.',
      'You might feel their sadness as your own. Their worry as your worry.',
      'This isn\'t your fault. It happens to everyone. But you can learn to notice it.',
      'The question to ask is: "Is this feeling mine? Did I make it? Or did I catch it from someone else?"',
    ],
  },
  ch6: {
    title: 'The Shadow Friend',
    pages: [
      'There is a part of you that sometimes acts in ways you don\'t like. Gets angry too fast. Says things you regret. Feels jealous or mean.',
      'Some people call this the Shadow. But the Shadow isn\'t bad — it\'s just confused.',
      'The Shadow learned to act this way to protect you. It was trying to help — it just doesn\'t know a better way yet.',
      '"I see you. I know you\'re scared. I don\'t need you to protect me this way anymore." You can say this quietly, inside.',
      'The Shadow gets smaller when you\'re kind to it. Because underneath, it just wants to be safe — just like you.',
    ],
  },
  ch7: {
    title: 'The Quiet Chamber',
    pages: [
      'Inside you, there is a room that belongs only to you.',
      'No one else can come in without your permission. No noise from outside can reach it unless you let it.',
      'In this room, your quiet light burns steadily. Always. Even on the worst days.',
      'Whenever life gets too loud, you can come here. Just close your eyes and remember: there is a room inside me. And I am safe there.',
      'You will practice finding this room. And the more you visit, the easier it gets to find.',
    ],
  },
  ch8: {
    title: 'The Gardener',
    pages: [
      'Imagine your inner world is a garden.',
      'Some plants grew on their own — fears planted by hard times, worries that took root without your permission.',
      'But you are the gardener. You get to decide what grows.',
      'Every time you practice coming back to your quiet center, you are watering the light inside you. It grows a little brighter.',
      'You can\'t fix everything at once. But you can tend your garden, a little bit, each day. That\'s all it takes.',
    ],
  },
};

export default function ChapterScreen() {
  const { chapter } = useLocalSearchParams<{ chapter: string }>();
  const [pageIdx, setPageIdx] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { state, update } = useStore();

  const content = CHAPTERS[chapter ?? 'ch1'];

  if (!content) {
    return (
      <SafeAreaView style={styles.safe}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.error}>Chapter not found.</Text>
      </SafeAreaView>
    );
  }

  const isLast = pageIdx === content.pages.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setPageIdx((p) => p + 1);
    } else {
      if (!state.chaptersComplete.includes(chapter!)) {
        update({ chaptersComplete: [...state.chaptersComplete, chapter!] });
      }
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <QuietLight size={80} brightness={75} pulsing />
          <Text style={styles.doneTitle}>Chapter complete.</Text>
          <Text style={styles.doneSub}>{content.title}</Text>
          <TouchableOpacity style={styles.doneBtn} onPress={() => router.back()}>
            <Text style={styles.doneBtnText}>Back to Journey</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const brightness = Math.min(85, 35 + pageIdx * 10);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.chapterTitle}>{content.title}</Text>
        <Text style={styles.counter}>{pageIdx + 1} of {content.pages.length}</Text>

        <View style={styles.lightArea}>
          <QuietLight size={60} brightness={brightness} pulsing />
        </View>

        <View style={styles.pageCard}>
          <Text style={styles.pageText}>{content.pages[pageIdx]}</Text>
        </View>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.8}>
          <Text style={styles.nextBtnText}>
            {isLast ? 'Complete chapter' : 'Continue →'}
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
  chapterTitle: { fontFamily: Fonts.bold, fontSize: 22, color: Colors.textPrimary },
  counter: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 4,
    marginBottom: Spacing.sm,
  },
  lightArea: { alignItems: 'center', marginBottom: Spacing.lg },
  pageCard: {
    flex: 1,
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  pageText: {
    fontFamily: Fonts.light,
    fontSize: 20,
    color: Colors.textPrimary,
    lineHeight: 32,
    textAlign: 'center',
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
    fontSize: 28,
    color: Colors.textPrimary,
    marginTop: Spacing.xl,
  },
  doneSub: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.quietLight,
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
  error: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textSecondary,
    padding: Spacing.lg,
  },
});

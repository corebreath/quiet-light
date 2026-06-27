import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QuietLight } from '../../src/components/ui/QuietLight';
import { Colors, Fonts, Spacing, Radius } from '../../src/constants/theme';

export default function ChamberScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backText}>← Leave quietly</Text>
        </TouchableOpacity>

        <View style={styles.center}>
          <QuietLight size={100} brightness={70} pulsing />
          <Text style={styles.title}>The Quiet Chamber</Text>
          <Text style={styles.body}>
            This is your safe place inside.
            {'\n\n'}
            Nothing from outside can reach you here.
            {'\n\n'}
            No one needs anything from you right now.
            {'\n\n'}
            You can just rest.
            {'\n\n'}
            Stay as long as you need.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.lg },
  back: { marginBottom: Spacing.md },
  backText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.textMuted,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  title: {
    fontFamily: Fonts.light,
    fontSize: 24,
    color: Colors.quietLight,
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  body: {
    fontFamily: Fonts.light,
    fontSize: 18,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 30,
  },
});

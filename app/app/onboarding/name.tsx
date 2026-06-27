import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useStore } from '../../src/store/useStore';
import { Colors, Fonts, Spacing, Radius } from '../../src/constants/theme';

export default function NameScreen() {
  const [name, setName] = useState('');
  const { update } = useStore();

  const handleContinue = () => {
    const trimmed = name.trim();
    if (trimmed) {
      update({ childName: trimmed });
      router.push('/onboarding/character');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.question}>What shall we call you?</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Your name..."
        placeholderTextColor={Colors.textMuted}
        autoFocus
        maxLength={20}
        returnKeyType="done"
        onSubmitEditing={handleContinue}
      />

      <TouchableOpacity
        style={[styles.button, !name.trim() && styles.buttonDisabled]}
        onPress={handleContinue}
        disabled={!name.trim()}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>That's me</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  question: {
    fontFamily: Fonts.light,
    fontSize: 28,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  input: {
    width: '100%',
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
    fontFamily: Fonts.regular,
    fontSize: 20,
    color: Colors.textPrimary,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  button: {
    marginTop: Spacing.lg,
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

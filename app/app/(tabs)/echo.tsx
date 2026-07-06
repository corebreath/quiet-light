import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Modal, Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../../src/store/useStore';
import type { EchoAnswer } from '../../src/store/useStore';
import { Colors, Fonts, Spacing, Radius } from '../../src/constants/theme';

const FEELINGS = [
  'Angry', 'Sad', 'Scared', 'Worried', 'Jealous',
  'Annoyed', 'Lonely', 'Ashamed', 'Frustrated', 'Embarrassed',
  'Hopeless', 'Numb',
];

const ANSWER_OPTIONS: Array<{
  value: EchoAnswer;
  label: string;
  desc: string;
  color: string;
}> = [
  { value: 'mine', label: 'Mine', desc: 'I made this feeling', color: Colors.echoMine },
  { value: 'notMine', label: 'Not mine', desc: 'I caught it from someone', color: Colors.echoNotMine },
  { value: 'unsure', label: 'Not sure', desc: "I don't know yet", color: Colors.echoUnsure },
];

export default function EchoScreen() {
  const { state, addEchoEntry } = useStore();
  const [showAdd, setShowAdd] = useState(false);
  const [selectedFeeling, setSelectedFeeling] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState<EchoAnswer | ''>('');

  const handleSave = () => {
    if (selectedFeeling && selectedAnswer) {
      addEchoEntry(selectedAnswer as EchoAnswer, selectedFeeling);
      setShowAdd(false);
      setSelectedFeeling('');
      setSelectedAnswer('');
    }
  };

  const handleClose = () => {
    setShowAdd(false);
    setSelectedFeeling('');
    setSelectedAnswer('');
  };

  const handleExport = async () => {
    const lines = state.echoEntries.map(
      (e) => `${e.date} — ${e.label} (${ANSWER_OPTIONS.find((o) => o.value === e.answer)?.label ?? e.answer})`
    );
    const message = `Echo Journal — ${state.echoEntries.length} entries\n\n${lines.join('\n')}\n\n---\nJSON backup:\n${JSON.stringify(state.echoEntries, null, 2)}`;
    try {
      await Share.share({ message, title: 'Echo Journal backup' });
    } catch {}
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.heading}>Echo Journal</Text>
            <Text style={styles.subheading}>Is this feeling mine?</Text>
          </View>
          <View style={styles.headerActions}>
            {state.echoEntries.length > 0 && (
              <TouchableOpacity style={styles.exportBtn} onPress={handleExport} activeOpacity={0.8}>
                <Text style={styles.exportBtnText}>Save a copy</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)} activeOpacity={0.8}>
              <Text style={styles.addBtnText}>+ Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        {state.echoEntries.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🪞</Text>
            <Text style={styles.emptyText}>
              When you notice a big feeling,{'\n'}write it here.{'\n\n'}
              Was it yours — or did you catch it?
            </Text>
          </View>
        ) : (
          state.echoEntries.slice(0, 30).map((entry, i) => {
            const opt = ANSWER_OPTIONS.find((o) => o.value === entry.answer)!;
            return (
              <View key={i} style={styles.entry}>
                <View style={[styles.dot, { backgroundColor: opt.color }]} />
                <View style={styles.entryBody}>
                  <Text style={styles.entryLabel}>{entry.label}</Text>
                  <Text style={styles.entryMeta}>{opt.label} · {entry.date}</Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      <Modal visible={showAdd} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>What feeling did you notice?</Text>

            <View style={styles.feelingGrid}>
              {FEELINGS.map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[
                    styles.chip,
                    selectedFeeling === f && styles.chipSelected,
                  ]}
                  onPress={() => setSelectedFeeling(f)}
                >
                  <Text style={[
                    styles.chipText,
                    selectedFeeling === f && styles.chipTextSelected,
                  ]}>
                    {f}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedFeeling ? (
              <>
                <Text style={styles.modalSub}>Is this feeling mine?</Text>
                <View style={styles.answerRow}>
                  {ANSWER_OPTIONS.map((opt) => (
                    <TouchableOpacity
                      key={opt.value}
                      style={[
                        styles.answerCard,
                        selectedAnswer === opt.value && {
                          borderColor: opt.color,
                          borderWidth: 2,
                        },
                      ]}
                      onPress={() => setSelectedAnswer(opt.value)}
                    >
                      <Text style={[styles.answerLabel, { color: opt.color }]}>
                        {opt.label}
                      </Text>
                      <Text style={styles.answerDesc}>{opt.desc}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            ) : null}

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={handleClose} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.saveBtn,
                  (!selectedFeeling || !selectedAnswer) && styles.saveBtnDisabled,
                ]}
                onPress={handleSave}
                disabled={!selectedFeeling || !selectedAnswer}
              >
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing.lg, paddingBottom: Spacing.xl },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  heading: { fontFamily: Fonts.bold, fontSize: 26, color: Colors.textPrimary },
  subheading: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  exportBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  exportBtnText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  addBtn: {
    backgroundColor: Colors.quietLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.pill,
  },
  addBtnText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: Colors.background,
  },
  empty: { alignItems: 'center', paddingTop: Spacing.xxl },
  emptyEmoji: { fontSize: 48, marginBottom: Spacing.md },
  emptyText: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  entryBody: { flex: 1 },
  entryLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  entryMeta: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
    padding: Spacing.lg,
    paddingBottom: 36,
  },
  modalTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  modalSub: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  feelingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surfaceCard,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipSelected: {
    backgroundColor: `${Colors.quietLight}20`,
    borderColor: Colors.quietLight,
  },
  chipText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  chipTextSelected: {
    color: Colors.quietLight,
    fontFamily: Fonts.semiBold,
  },
  answerRow: { flexDirection: 'row', gap: Spacing.sm },
  answerCard: {
    flex: 1,
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  answerLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
  },
  answerDesc: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  cancelBtn: { paddingHorizontal: 20, paddingVertical: 10 },
  cancelText: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: Colors.textSecondary,
  },
  saveBtn: {
    backgroundColor: Colors.quietLight,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: Radius.pill,
  },
  saveBtnDisabled: { opacity: 0.35 },
  saveBtnText: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    color: Colors.background,
  },
});

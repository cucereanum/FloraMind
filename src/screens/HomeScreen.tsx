import { useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import PlantCard from '../components/PlantCard';
import { usePlants } from '../hooks/usePlants';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { PlantCategory } from '../types';

export default function HomeScreen() {
  const { plants, addPlant, completeTask } = usePlants();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [category, setCategory] = useState<PlantCategory>('tropical');

  const canSubmit = name.trim().length > 0;
  const orderedCategories = useMemo<PlantCategory[]>(
    () => ['succulent', 'tropical', 'fern', 'herb', 'unknown'],
    [],
  );

  const handleSubmit = () => {
    if (!canSubmit) {
      return;
    }
    addPlant(name, category, room);
    setName('');
    setRoom('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>FloraMind</Text>
          <Text style={styles.subtitle}>A calm shelf for your everyday plants.</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Quick add</Text>
          <TextInput
            placeholder="Plant name"
            placeholderTextColor={colors.muted}
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Room (optional)"
            placeholderTextColor={colors.muted}
            style={styles.input}
            value={room}
            onChangeText={setRoom}
          />
          <View style={styles.categoryRow}>
            {orderedCategories.map((item) => {
              const isActive = category === item;
              return (
                <Pressable
                  key={item}
                  onPress={() => setCategory(item)}
                  style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                >
                  <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Pressable
            style={[styles.submit, !canSubmit && styles.submitDisabled]}
            onPress={handleSubmit}
            disabled={!canSubmit}
          >
            <Text style={styles.submitText}>Add plant</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your plants</Text>
          <Text style={styles.sectionMeta}>{plants.length} total</Text>
        </View>

        {plants.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No plants yet</Text>
            <Text style={styles.emptyBody}>Add your first plant to start tracking.</Text>
          </View>
        ) : (
          <FlatList
            data={plants}
            keyExtractor={(plant) => plant.id}
            renderItem={({ item }) => (
              <PlantCard
                plant={item}
                onCompleteWater={(plantId) => completeTask(plantId, 'water')}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  header: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.heading,
    fontSize: 30,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    marginTop: spacing.xs,
    color: colors.muted,
    fontSize: 15,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  formTitle: {
    ...typography.heading,
    fontSize: 18,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  input: {
    ...typography.body,
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
    color: colors.text,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  categoryChip: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  categoryText: {
    ...typography.body,
    color: colors.muted,
    textTransform: 'capitalize',
  },
  categoryTextActive: {
    color: colors.text,
    fontWeight: '600',
  },
  submit: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  submitDisabled: {
    opacity: 0.5,
  },
  submitText: {
    ...typography.body,
    color: colors.surface,
    fontWeight: '600',
  },
  sectionHeader: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    ...typography.heading,
    fontSize: 20,
    color: colors.text,
  },
  sectionMeta: {
    ...typography.body,
    color: colors.muted,
  },
  listContent: {
    paddingBottom: spacing.lg,
  },
  emptyState: {
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyTitle: {
    ...typography.heading,
    fontSize: 18,
    color: colors.text,
  },
  emptyBody: {
    ...typography.body,
    marginTop: spacing.xs,
    color: colors.muted,
  },
});

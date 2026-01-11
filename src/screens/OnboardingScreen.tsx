import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type OnboardingScreenProps = {
  onDone: () => void;
};

export default function OnboardingScreen({ onDone }: OnboardingScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.kicker}>Welcome to FloraMind</Text>
        <Text style={styles.title}>Care for plants in tiny, calm steps.</Text>
        <Text style={styles.body}>
          Add a plant, get gentle reminders, and keep a simple log. No pressure.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Get started in seconds</Text>
        <Text style={styles.cardBody}>
          Snap a photo, pick a type, and we do the schedule for you.
        </Text>
        <Pressable style={styles.cta} onPress={onDone}>
          <Text style={styles.ctaText}>Start tracking</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  hero: {
    marginTop: spacing.xl,
  },
  kicker: {
    ...typography.body,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: colors.muted,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.heading,
    fontSize: 32,
    color: colors.text,
  },
  body: {
    ...typography.body,
    marginTop: spacing.md,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 22,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    ...typography.heading,
    fontSize: 20,
    color: colors.text,
  },
  cardBody: {
    ...typography.body,
    marginTop: spacing.sm,
    color: colors.muted,
  },
  cta: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    borderRadius: 14,
    alignItems: 'center',
  },
  ctaText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
});

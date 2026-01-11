import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { Plant } from '../types';
import { getNextDue } from '../utils/care';

type PlantCardProps = {
  plant: Plant;
  onPress?: () => void;
};

export default function PlantCard({ plant, onPress }: PlantCardProps) {
  const nextDue = getNextDue(plant);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{plant.name}</Text>
          {plant.description ? <Text style={styles.description}>{plant.description}</Text> : null}
          <Text style={styles.meta}>
            {plant.room ? `${plant.room} - ` : ''}
            {plant.category}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.label}>Next up</Text>
        <Text style={styles.due}>
          {nextDue ? `${nextDue.type} | ${nextDue.label}` : 'Schedule coming soon'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    ...typography.heading,
    fontSize: 20,
    color: colors.text,
  },
  description: {
    ...typography.body,
    marginTop: spacing.xs,
    color: colors.muted,
  },
  meta: {
    ...typography.body,
    marginTop: spacing.xs,
    color: colors.muted,
    textTransform: 'capitalize',
  },
  footer: {
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  label: {
    ...typography.body,
    color: colors.muted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  due: {
    ...typography.body,
    marginTop: spacing.xs,
    color: colors.text,
    fontSize: 16,
    textTransform: 'capitalize',
  },
});

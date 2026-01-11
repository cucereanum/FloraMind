import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import { Plant } from "../types";
import { getNextDue } from "../utils/care";

type PlantCardProps = {
  plant: Plant;
  onCompleteWater: (plantId: string) => void;
};

export default function PlantCard({ plant, onCompleteWater }: PlantCardProps) {
  const nextDue = getNextDue(plant);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{plant.name}</Text>
          <Text style={styles.meta}>
            {plant.room ? `${plant.room} • ` : ""}
            {plant.category}
          </Text>
        </View>
        <Pressable style={styles.cta} onPress={() => onCompleteWater(plant.id)}>
          <Text style={styles.ctaText}>Watered</Text>
        </Pressable>
      </View>
      <View style={styles.footer}>
        <Text style={styles.label}>Next up</Text>
        <Text style={styles.due}>
          {nextDue
            ? `${nextDue.type} · ${nextDue.label}`
            : "Schedule coming soon"}
        </Text>
      </View>
    </View>
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
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    ...typography.heading,
    fontSize: 20,
    color: colors.text,
  },
  meta: {
    ...typography.body,
    marginTop: spacing.xs,
    color: colors.muted,
    textTransform: "capitalize",
  },
  cta: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
  },
  ctaText: {
    ...typography.body,
    color: colors.surface,
    fontWeight: "600",
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
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  due: {
    ...typography.body,
    marginTop: spacing.xs,
    color: colors.text,
    fontSize: 16,
    textTransform: "capitalize",
  },
});

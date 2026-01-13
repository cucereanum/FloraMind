import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import PlantCard from "@src/components/PlantCard";
import PlantFilter from "@src/components/PlantFilter";
import { HomeStackParamList } from "@src/navigation/types";
import { useAppSelector } from "@src/store/hooks";
import { colors } from "@src/theme/colors";
import { spacing } from "@src/theme/spacing";
import { typography } from "@src/theme/typography";
import type { PlantStatus } from "@src/types";
import { getNextDue } from "@src/utils/care";
import { startOfToday } from "@src/utils/date";

type HomeScreenNavigation = NativeStackNavigationProp<
  HomeStackParamList,
  "HomeList"
>;

export default function HomeScreen() {
  const plants = useAppSelector((state) => state.plants.items);
  const navigation = useNavigation<HomeScreenNavigation>();
  const [filter, setFilter] = useState<PlantStatus>("upcoming");

  const filteredPlants = useMemo(() => {
    const today = startOfToday();
    return plants.filter((plant) => {
      const nextDue = getNextDue(plant);
      const isOverdue = nextDue
        ? nextDue.dueDate.getTime() < today.getTime()
        : false;
      const hasHistory = plant.schedules.some((schedule) =>
        Boolean(schedule.lastCompleted)
      );

      if (filter === "history") {
        return hasHistory;
      }
      if (filter === "forgot") {
        return isOverdue;
      }
      return !isOverdue;
    });
  }, [filter, plants]);

  const headerMeta = useMemo(
    () => `${filteredPlants.length} total`,
    [filteredPlants.length]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FloraMind</Text>
        <Text style={styles.subtitle}>Your plants, calm and organized.</Text>
      </View>

      <PlantFilter value={filter} onChange={setFilter} />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Plant shelf</Text>
        <Text style={styles.sectionMeta}>{headerMeta}</Text>
      </View>

      {filteredPlants.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No plants yet</Text>
          <Text style={styles.emptyBody}>Tap + to add your first plant.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPlants}
          keyExtractor={(plant) => plant.id}
          renderItem={({ item }) => (
            <PlantCard
              plant={item}
              onPress={() =>
                navigation.navigate("PlantDetails", { plantId: item.id })
              }
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
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
  sectionHeader: {
    marginBottom: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    paddingBottom: spacing.xl,
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

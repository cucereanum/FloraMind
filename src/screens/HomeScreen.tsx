import { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import PlantCard from "../components/PlantCard";
import { HomeStackParamList } from "../navigation/RootNavigator";
import { loadPlants, savePlants } from "../storage/plants";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import type { Plant, PlantDraft } from "../types";
import { createPlant } from "../utils/plant";

type HomeScreenNavigation = NativeStackNavigationProp<
  HomeStackParamList,
  "Home"
>;
type HomeRoute = RouteProp<HomeStackParamList, "Home">;

export default function HomeScreen() {
  const [plants, setPlants] = useState<Plant[]>(() => loadPlants());
  const navigation = useNavigation<HomeScreenNavigation>();
  const route = useRoute<HomeRoute>();

  const headerMeta = useMemo(() => `${plants.length} total`, [plants.length]);

  useEffect(() => {
    savePlants(plants);
  }, [plants]);

  useEffect(() => {
    const params = route.params as HomeStackParamList["Home"];
    if (!params?.action || !params.payload) {
      return;
    }

    if (params.action === "create") {
      const draft = params.payload as PlantDraft;
      const next = createPlant({
        name: draft.name,
        category: draft.category ?? "unknown",
        description: draft.description,
        room: draft.room,
        photoUri: draft.photoUri,
        waterAmount: draft.waterAmount,
        waterDays: draft.waterDays,
      });
      setPlants((current) => [next, ...current]);
    }

    if (params.action === "update") {
      const updated = params.payload as Plant;
      setPlants((current) =>
        current.map((plant) =>
          plant.id === updated.id ? { ...plant, ...updated } : plant
        )
      );
    }

    navigation.setParams({ action: undefined, payload: undefined });
  }, [navigation, route.params]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>FloraMind</Text>
          <Text style={styles.subtitle}>Your plants, calm and organized.</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Plant shelf</Text>
          <Text style={styles.sectionMeta}>{headerMeta}</Text>
        </View>

        {plants.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No plants yet</Text>
            <Text style={styles.emptyBody}>Tap + to add your first plant.</Text>
          </View>
        ) : (
          <FlatList
            data={plants}
            keyExtractor={(plant) => plant.id}
            renderItem={({ item }) => (
              <PlantCard
                plant={item}
                onPress={() =>
                  navigation.navigate("PlantDetails", { plant: item })
                }
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}

        <Pressable
          style={styles.fab}
          onPress={() => navigation.navigate("PlantDetails")}
        >
          <Text style={styles.fabText}>+</Text>
        </Pressable>
      </View>
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
  fab: {
    position: "absolute",
    right: spacing.lg,
    bottom: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  fabText: {
    ...typography.heading,
    fontSize: 30,
    color: colors.text,
    marginTop: -2,
  },
});

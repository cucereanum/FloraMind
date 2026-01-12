import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeStackParamList } from "@src/navigation/RootNavigator";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { addPlant, updatePlant } from "@src/store/plantsSlice";
import { colors } from "@src/theme/colors";
import { spacing } from "@src/theme/spacing";
import { typography } from "@src/theme/typography";
import type { PlantDraft } from "@src/types";

type PlantDetailsProps = NativeStackScreenProps<
  HomeStackParamList,
  "PlantDetails"
>;

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function PlantDetailsScreen({
  route,
  navigation,
}: PlantDetailsProps) {
  const dispatch = useAppDispatch();
  const plantId = route.params?.plantId;
  const existing = useAppSelector((state) =>
    plantId ? state.plants.items.find((plant) => plant.id === plantId) : undefined,
  );

  const [name, setName] = useState(existing?.name ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [photoUri, setPhotoUri] = useState(existing?.photoUri ?? "");
  const [waterAmount, setWaterAmount] = useState(existing?.waterAmount ?? "");
  const [waterDays, setWaterDays] = useState<string[]>(
    existing?.waterDays ?? []
  );

  const canSave = name.trim().length > 0;

  const toggleDay = (day: string) => {
    setWaterDays((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day]
    );
  };

  const handleSave = () => {
    if (!canSave) {
      return;
    }

    if (existing) {
      dispatch(
        updatePlant({
          id: existing.id,
          updates: {
            name: name.trim(),
            description: description.trim() || undefined,
            photoUri: photoUri.trim() || undefined,
            waterAmount: waterAmount.trim() || undefined,
            waterDays,
          },
        }),
      );
      navigation.goBack();
      return;
    }

    const payload: PlantDraft = {
      name: name.trim(),
      description: description.trim() || undefined,
      category: "unknown",
      photoUri: photoUri.trim() || undefined,
      waterAmount: waterAmount.trim() || undefined,
      waterDays,
      room: undefined,
    };
    dispatch(addPlant(payload));
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>
        {existing ? "Plant details" : "Add a plant"}
      </Text>

      <View style={styles.photoCard}>
        {photoUri ? (
          <Image
            source={{ uri: photoUri }}
            style={styles.photo}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoPlaceholderText}>Add a photo URL</Text>
          </View>
        )}
        <TextInput
          placeholder="Photo URL (optional)"
          placeholderTextColor={colors.muted}
          style={styles.input}
          value={photoUri}
          onChangeText={setPhotoUri}
          autoCapitalize="none"
        />
      </View>

      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Plant name"
        placeholderTextColor={colors.muted}
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholder="Short note (optional)"
        placeholderTextColor={colors.muted}
        style={[styles.input, styles.multiline]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Water amount</Text>
      <TextInput
        placeholder="e.g. 200 ml"
        placeholderTextColor={colors.muted}
        style={styles.input}
        value={waterAmount}
        onChangeText={setWaterAmount}
      />

      <Text style={styles.label}>Water days</Text>
      <View style={styles.dayRow}>
        {daysOfWeek.map((day) => {
          const active = waterDays.includes(day);
          return (
            <Pressable
              key={day}
              onPress={() => toggleDay(day)}
              style={[styles.dayChip, active && styles.dayChipActive]}
            >
              <Text style={[styles.dayText, active && styles.dayTextActive]}>
                {day}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={!canSave}
      >
        <Text style={styles.saveButtonText}>
          {existing ? "Save changes" : "Save plant"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    ...typography.heading,
    fontSize: 26,
    color: colors.text,
    marginBottom: spacing.md,
  },
  photoCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  photo: {
    width: "100%",
    height: 160,
    borderRadius: 14,
    marginBottom: spacing.md,
  },
  photoPlaceholder: {
    width: "100%",
    height: 160,
    borderRadius: 14,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  photoPlaceholderText: {
    ...typography.body,
    color: colors.muted,
  },
  label: {
    ...typography.body,
    color: colors.muted,
    marginBottom: spacing.xs,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  input: {
    ...typography.body,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  dayRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: spacing.lg,
  },
  dayChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  dayChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  dayText: {
    ...typography.body,
    color: colors.muted,
  },
  dayTextActive: {
    color: colors.text,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: spacing.sm,
    alignItems: "center",
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    ...typography.body,
    color: colors.text,
    fontWeight: "600",
  },
});

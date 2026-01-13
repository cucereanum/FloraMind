import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { colors } from "@src/theme/colors";
import { spacing } from "@src/theme/spacing";
import { typography } from "@src/theme/typography";
import type { PlantStatus } from "@src/types";

type FilterOption = {
  label: string;
  value: PlantStatus;
};

type PlantFilterProps = {
  value: PlantStatus;
  onChange: (value: PlantStatus) => void;
};

export default function PlantFilter({ value, onChange }: PlantFilterProps) {
  const options = useMemo<FilterOption[]>(
    () => [
      { label: "Upcoming", value: "upcoming" },
      { label: "Forgot", value: "forgot" },
      { label: "History", value: "history" },
    ],
    []
  );
  const activeIndex = useMemo(
    () => options.findIndex((option) => option.value === value),
    [options, value]
  );
  const [menuWidth, setMenuWidth] = useState(0);
  const underlineX = useSharedValue(0);
  const underlineWidth = useSharedValue(0);

  useEffect(() => {
    if (menuWidth === 0) {
      return;
    }
    const tabWidth = menuWidth / options.length;
    underlineWidth.value = tabWidth;
    underlineX.value = withTiming(tabWidth * Math.max(activeIndex, 0), {
      duration: 200,
    });
  }, [activeIndex, menuWidth, options.length, underlineWidth, underlineX]);

  const underlineStyle = useAnimatedStyle(() => ({
    width: underlineWidth.value,
    transform: [{ translateX: underlineX.value }],
  }));

  return (
    <View
      style={styles.filterRow}
      onLayout={(event) => setMenuWidth(event.nativeEvent.layout.width)}
    >
      {options.map((option) => (
        <Pressable
          key={option.value}
          style={styles.filterItem}
          onPress={() => onChange(option.value)}
        >
          <Text
            style={[
              styles.filterText,
              option.value === value && styles.filterTextActive,
            ]}
          >
            {option.label}
          </Text>
        </Pressable>
      ))}
      <Animated.View style={[styles.filterUnderline, underlineStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: "row",
    marginBottom: spacing.lg,
    marginTop: spacing.md,
  },
  filterItem: {
    flex: 1,
    paddingBottom: spacing.sm,
    alignItems: "center",
  },
  filterText: {
    ...typography.body,
    color: colors.muted,
    fontSize: 15,
  },
  filterTextActive: {
    color: colors.text,
    fontWeight: "600",
  },
  filterUnderline: {
    position: "absolute",
    left: 0,
    bottom: 0,
    height: 3,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
});

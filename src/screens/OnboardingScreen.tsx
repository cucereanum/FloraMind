import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";

import { colors } from "@src/theme/colors";
import { spacing } from "@src/theme/spacing";
import { typography } from "@src/theme/typography";

type OnboardingScreenProps = {
  onDone: () => void;
};

type ProgressSegmentProps = {
  index: number;
  total: number;
  activeIndex: SharedValue<number>;
  progress: SharedValue<number>;
  trackWidth: SharedValue<number>;
};

function ProgressSegment({
  index,
  total,
  activeIndex,
  progress,
  trackWidth,
}: ProgressSegmentProps) {
  const animatedStyle = useAnimatedStyle(() => {
    let fill = 0;
    if (index < activeIndex.value) {
      fill = 1;
    } else if (index === activeIndex.value) {
      fill = progress.value;
    }
    return {
      width: trackWidth.value * fill,
    };
  }, []);

  return (
    <View
      style={[
        styles.progressTrack,
        index < total - 1 && styles.progressTrackSpacer,
      ]}
    >
      <Animated.View style={[styles.progressFill, animatedStyle]} />
    </View>
  );
}

export default function OnboardingScreen({ onDone }: OnboardingScreenProps) {
  const slides = useMemo(
    () => [
      {
        title: "Welcome to FloraMind",
        body: "Track the plants you already own without overthinking it.",
      },
      {
        title: "Gentle care cues",
        body: "We surface the next task so you never guess what comes next.",
      },
      {
        title: "Simple plant details",
        body: "Add notes, water amounts, and days that feel natural to you.",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const progress = useSharedValue(0);
  const activeIndex = useSharedValue(0);
  const rowWidth = useSharedValue(0);
  const trackWidth = useDerivedValue(() => {
    const gaps = spacing.sm * (slides.length - 1);
    if (rowWidth.value === 0) {
      return 0;
    }
    return (rowWidth.value - gaps) / slides.length;
  });

  const handleAdvance = useCallback(() => {
    setIndex((current) => {
      if (current >= slides.length - 1) {
        setCompleted(true);
        return current;
      }
      return current + 1;
    });
  }, [slides.length]);

  useEffect(() => {
    if (completed) {
      onDone();
    }
  }, [completed, onDone]);

  useEffect(() => {
    activeIndex.value = index;
    progress.value = 0;
    translateX.value = withTiming(-width * index, { duration: 500 });
    progress.value = withTiming(1, { duration: 5000 }, (finished) => {
      if (finished) {
        runOnJS(handleAdvance)();
      }
    });
  }, [activeIndex, handleAdvance, index, progress, translateX, width]);

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <View
        style={styles.progressRow}
        onLayout={(event) => {
          rowWidth.value = event.nativeEvent.layout.width;
        }}
      >
        {slides.map((_, idx) => (
          <ProgressSegment
            key={`progress-${idx}`}
            index={idx}
            total={slides.length}
            activeIndex={activeIndex}
            progress={progress}
            trackWidth={trackWidth}
          />
        ))}
      </View>

      <Animated.View
        style={[styles.slider, { width: width * slides.length }, sliderStyle]}
      >
        {slides.map((slide, idx) => (
          <View key={`slide-${idx}`} style={[styles.slide, { width }]}>
            <Text style={styles.kicker}>FloraMind</Text>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.body}>{slide.body}</Text>
          </View>
        ))}
      </Animated.View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>You are almost ready</Text>
        <Text style={styles.cardBody}>
          Sit back or tap below to skip ahead to your shelf.
        </Text>
        <Pressable style={styles.cta} onPress={onDone}>
          <Text style={styles.ctaText}>Skip</Text>
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
    justifyContent: "space-between",
  },
  progressRow: {
    flexDirection: "row",
    marginTop: spacing.md,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  progressTrackSpacer: {
    marginRight: spacing.sm,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
  },
  slider: {
    flexDirection: "row",
    marginTop: spacing.lg,
  },
  slide: {
    paddingRight: spacing.xl,
  },
  kicker: {
    ...typography.body,
    textTransform: "uppercase",
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
    alignItems: "center",
  },
  ctaText: {
    ...typography.body,
    color: colors.text,
    fontWeight: "600",
  },
});

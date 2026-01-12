import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@src/theme/colors';
import { spacing } from '@src/theme/spacing';
import { typography } from '@src/theme/typography';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.body}>Lightweight for now, more soon.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    ...typography.heading,
    fontSize: 26,
    color: colors.text,
  },
  body: {
    ...typography.body,
    marginTop: spacing.sm,
    color: colors.muted,
  },
});

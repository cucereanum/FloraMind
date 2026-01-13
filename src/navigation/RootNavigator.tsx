import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useOnboarding } from "@src/hooks/useOnboarding";
import { TabsNavigator } from "@src/navigation/TabsNavigator";
import OnboardingScreen from "@src/screens/OnboardingScreen";
import { colors } from "@src/theme/colors";

type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { seen, complete } = useOnboarding();
  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        id="root-stack"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        {!seen ? (
          <Stack.Screen name="Onboarding">
            {(props) => <OnboardingScreen {...props} onDone={complete} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Main" component={TabsNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

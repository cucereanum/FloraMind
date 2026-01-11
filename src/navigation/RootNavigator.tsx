import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useOnboarding } from "../hooks/useOnboarding";
import HomeScreen from "../screens/HomeScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import PlantDetailsScreen from "../screens/PlantDetailsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { colors } from "../theme/colors";
import type { Plant, PlantDraft } from "../types";

type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};

type TabsParamList = {
  Home: undefined;
  Settings: undefined;
};

export type HomeStackParamList = {
  HomeList:
    | { action?: "create" | "update"; payload?: Plant | PlantDraft }
    | undefined;
  PlantDetails: { plant?: Plant } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabsParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator id="home-stack">
      <HomeStack.Screen
        name="HomeList"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="PlantDetails"
        component={PlantDetailsScreen}
        options={{
          title: "Plant details",
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
        }}
      />
    </HomeStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tabs.Navigator
      id="main-tabs"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.surface },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          title: "My Plants",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="leaf" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export default function RootNavigator() {
  const { seen, complete } = useOnboarding();

  return (
    <NavigationContainer>
      <Stack.Navigator id="root-stack" screenOptions={{ headerShown: false }}>
        {!seen ? (
          <Stack.Screen name="Onboarding">
            {(props) => <OnboardingScreen {...props} onDone={complete} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

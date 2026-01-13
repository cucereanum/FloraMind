import { Pressable, StyleSheet, ViewStyle } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  RouteProp,
} from "@react-navigation/native";

import { HomeStackNavigator } from "@src/navigation/HomeStackNavigator";
import type { TabsParamList } from "@src/navigation/types";
import SettingsScreen from "@src/screens/SettingsScreen";
import { colors } from "@src/theme/colors";

const Tabs = createBottomTabNavigator<TabsParamList>();

export function TabsNavigator() {
  return (
    <Tabs.Navigator
      id="main-tabs"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: getTabBarStyle(route),
      })}
    >
      <Tabs.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          title: "My Plants",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="leaf" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Add"
        component={EmptyScreen}
        options={{
          tabBarLabel: "",
          tabBarButton: (props) => <AddTabButton {...props} />,
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

function getTabBarStyle(
  route: RouteProp<TabsParamList, keyof TabsParamList>
): ViewStyle | undefined {
  const focusedRoute = getFocusedRouteNameFromRoute(route) ?? "HomeList";
  if (route.name === "Home" && focusedRoute === "PlantDetails") {
    return { display: "none" } as const;
  }
  return {
    paddingHorizontal: 20,
  };
}

function EmptyScreen() {
  return null;
}

function AddTabButton() {
  const navigation = useNavigation<BottomTabNavigationProp<TabsParamList>>();
  return (
    <Pressable
      onPress={() => navigation.navigate("Home", { screen: "PlantDetails" })}
      style={styles.addTabButton}
    >
      <Ionicons name="add-circle" size={60} color={colors.primary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  addTabButton: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: "25%",
    bottom: 14,
  },
});

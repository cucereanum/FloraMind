import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { HomeStackParamList } from "@src/navigation/types";
import HomeScreen from "@src/screens/HomeScreen";
import PlantDetailsScreen from "@src/screens/PlantDetailsScreen";
import { colors } from "@src/theme/colors";

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      id="home-stack"
      screenOptions={{ contentStyle: { backgroundColor: colors.background } }}
    >
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

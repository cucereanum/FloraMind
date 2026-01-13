import type { NavigatorScreenParams } from "@react-navigation/native";

import type { Plant } from "@src/types";

export type HomeStackParamList = {
  HomeList: undefined;
  PlantDetails: { plantId?: Plant["id"] } | undefined;
};

export type TabsParamList = {
  Home: NavigatorScreenParams<HomeStackParamList> | undefined;
  Add: undefined;
  Settings: undefined;
};

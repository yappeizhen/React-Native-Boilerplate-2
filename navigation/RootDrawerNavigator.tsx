import * as React from "react";
import { Pressable } from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DrawerMenuButton from "../components/DrawerMenuButton";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import AboutUsScreen from "../screens/AboutUsScreen";
import { RootDrawerParamList } from "../types";
import AuthStackNavigator from "./AuthStackNavigator";
import HomeStackNavigator from "./HomeStackNavigator";

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function RootDrawerNavigator() {
  const colorScheme = useColorScheme();
  return (
    <Drawer.Navigator
      initialRouteName="Root"
      screenOptions={({ navigation }) => ({
        headerLeft: () => {
          return (
            <DrawerMenuButton
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          );
        },
      })}
    >
      <Drawer.Screen
        name="Root"
        component={HomeStackNavigator}
        options={({ navigation }) => ({
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={20} color={color} />
          ),
          title: "Home",
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Ionicons
                name="information-circle-outline"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <Drawer.Screen
        name="AboutUs"
        component={AboutUsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="people-outline" size={20} color={color} />
          ),
          title: "About Us",
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={AuthStackNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="logout" size={20} color={color} />
          ),
          headerShown: false,
          swipeEnabled: false,
          unmountOnBlur: true,
        }}
      />
    </Drawer.Navigator>
  );
}

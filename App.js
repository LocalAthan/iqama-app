import "react-native-gesture-handler";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MosquesPage from "./pages/MosquesPage";
import PrayerTimesPage from "./pages/PrayerTimesPage";
import React from "react";

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  return !fontsLoaded ? (
    <View style={[styles.center]}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MosquesPage}
          options={{ headerTitle: null, headerStyle: styles.emptyHeader }}
        />
        <Stack.Screen
          name="Prayer Times"
          component={PrayerTimesPage}
          options={{ headerTitle: null, headerStyle: styles.emptyHeader }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "white",
  },
  center: {
    flex: 1,
    justifyContent: "center",
  },
  emptyHeader: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
});

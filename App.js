import "react-native-gesture-handler";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  Image,
} from "react-native";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import React, { useEffect, useState } from "react";
import { API_URL } from "@env";
import typography from "./styles/typography";

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  const [isLoading, setLoading] = useState(true);
  const [mosques, setMosques] = useState([]);

  const getMosques = async () => {
    try {
      let response = await fetch(`${API_URL}/mosques`);
      console.log();
      let json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMosques();
      setMosques(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  return !fontsLoaded ? (
    <View style={[styles.center]}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={{ flex: 1 }} />
      <View style={styles.mosqueList}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={mosques}
          renderItem={({ item }) => (
            <View style={styles.mosqueItem}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.mosqueIcon}
                  source={{ uri: item.imageUrl ? item.imageUrl : undefined }}
                  defaultSource={{
                    uri: "/Users/yaser/Projects/iqama-app/assets/mosque_placeholder.png",
                  }}
                />
              </View>
              <View style={styles.mosqueInfo}>
                <View>
                  <Text style={styles.mosqueName}>{item.name}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
  },
  mosqueList: {
    flex: 0.75,
    backgroundColor: "white",
    paddingTop: 12,
    borderRadius: 25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mosqueItem: {
    flexDirection: "row",
    marginVertical: 12,
    marginHorizontal: 24,
  },
  mosqueInfo: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 16,
  },
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: "ghostwhite",
  },
  mosqueName: {
    flex: 1,
    fontFamily: typography.FONT_FAMILY_REGULAR,
    fontSize: typography.FONT_SIZE_LARGE,
  },
  mosqueIcon: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  imageContainer: {
    width: 50,
    height: 50,
  },
});

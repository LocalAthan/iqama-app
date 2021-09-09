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
import { TouchableHighlight } from "react-native-gesture-handler";

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  const [isLoading, setLoading] = useState(true);
  const [mosques, setMosques] = useState([]);
  const [currentMosque, setCurrentMosque] = useState();
  const [prayerTimes, setPrayerTimes] = useState();

  const getMosques = async () => {
    try {
      const response = await fetch(`${API_URL}/mosques`);
      let json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const getPrayerTimes = async (mosqueId) => {
    try {
      const response = await fetch(`${API_URL}/prayerTimes/${mosqueId}`);
      let json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMosques();
      setMosques(result);
      setCurrentMosque(result[0])
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    //TODO: fetch prayer times
    const fetchData = async () => {
      const result = await getPrayerTimes(currentMosque.id);
      setPrayerTimes(result)
      setLoading(false);
    };

    fetchData();
  }, [currentMosque]);

  return !fontsLoaded ? (
    <View style={[styles.center]}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={{ marginTop: 54, flex: 1 }}>
        <View style={{ backgroundColor: "white" }}>
          <View
            style={{
              marginVertical: 12,
              marginHorizontal: 24,
            }}
          >
            <Text
              style={{
                marginVertical: 12,
                fontFamily: typography.FONT_FAMILY_REGULAR,
                fontSize: typography.FONT_SIZE_LARGE,
              }}
            >
              {currentMosque?.name}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  flex: 1,
                  marginVertical: 12,
                  fontFamily: typography.FONT_FAMILY_REGULAR,
                  fontSize: typography.FONT_SIZE_LARGE,
                }}
              >
                Athan:
              </Text>
              <Text
                style={{
                  flex: 3,
                  marginVertical: 12,
                  fontFamily: typography.FONT_FAMILY_BOLD,
                  fontSize: typography.FONT_SIZE_LARGE,
                }}
              >
                {prayerTimes?.fajr.athan}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  flex: 1,
                  marginVertical: 12,
                  fontFamily: typography.FONT_FAMILY_REGULAR,
                  fontSize: typography.FONT_SIZE_LARGE,
                }}
              >
                Iqama:
              </Text>
              <Text
                style={{
                  flex: 3,
                  marginVertical: 12,
                  fontFamily: typography.FONT_FAMILY_BOLD,
                  fontSize: typography.FONT_SIZE_LARGE,
                }}
              >
                {prayerTimes?.fajr.iqama}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.mosqueList}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={mosques}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => setCurrentMosque(item)}
              underlayColor="#fcfcfc"
            >
              <View style={styles.mosqueItem}>
                <View style={styles.mosqueIconContainer}>
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
                <View style={styles.checkmarkIconContainer}>
                  <View>
                    <Image
                      style={styles.checkmarkIcon}
                      source={{
                        uri:
                          currentMosque == item
                            ? "/Users/yaser/Projects/iqama-app/assets/checkmark.png"
                            : undefined,
                      }}
                    />
                  </View>
                </View>
              </View>
            </TouchableHighlight>
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
  mosqueIconContainer: {
    width: 50,
    height: 50,
  },
  checkmarkIconContainer: {
    flex: 0.15,
    justifyContent: "center",
  },
  checkmarkIcon: {
    flex: 1,
    width: 20,
    height: 15,
    resizeMode: "contain",
  },
});

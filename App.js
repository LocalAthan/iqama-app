import "react-native-gesture-handler";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  Image,
  Linking,
  Platform,
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
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  const [isPrayersLoading, setisPrayersLoading] = useState(true);
  const [mosques, setMosques] = useState([]);
  const [currentMosque, setCurrentMosque] = useState();
  const [prayerTimes, setPrayerTimes] = useState();
  const [currentPrayer, setCurrentPrayer] = useState("Fajr");

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

  const onGoNowPressed = (address) => {
    const company = Platform.OS === "ios" ? "apple" : "google";
    Linking.openURL(`http://maps.${company}.com/maps?daddr=${address}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMosques();
      setMosques(result);
      setCurrentMosque(result[0]);
      setisPrayersLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    //TODO: fetch prayer times
    const fetchData = async () => {
      setisPrayersLoading(true);
      const result = await getPrayerTimes(currentMosque.id);
      setPrayerTimes(result);
      setisPrayersLoading(false);
    };

    fetchData();
  }, [currentMosque]);

  //TODO: make prayerTimes, currentMosque non-nullable
  const prayers = {
    Fajr: prayerTimes?.fajr,
    Dhuhr: prayerTimes?.dhuhr,
    Asr: prayerTimes?.asr,
    Maghrib: prayerTimes?.maghrib,
    Isha: prayerTimes?.isha,
  };

  return !fontsLoaded ? (
    <View style={[styles.center]}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.prayerBoxContainer}>
        <View style={styles.prayerBox}>
          <View style={styles.prayerBoxInfo}>
            <Text style={styles.prayerBoxMosque}>{currentMosque?.name}</Text>
            <FlatList
              data={Object.keys(prayers)}
              renderItem={({ item: prayerName }) => (
                <TouchableHighlight
                  underlayColor="white"
                  onPress={() => setCurrentPrayer(prayerName)}
                >
                  <View
                    style={
                      currentPrayer == prayerName
                        ? styles.selectedPrayerContainer
                        : styles.unselectedPrayerContainer
                    }
                  >
                    <Text
                      style={
                        currentPrayer == prayerName
                          ? styles.selectedPrayer
                          : styles.unselectedPrayer
                      }
                    >
                      {prayerName}
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
              horizontal={true}
            ></FlatList>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.prayerCall}>Athan:</Text>
              <ShimmerPlaceholder
                style={styles.prayerTimeContainer}
                visible={!isPrayersLoading}
              >
                <Text style={styles.prayerTime}>
                  {prayers[currentPrayer]?.athan}
                </Text>
              </ShimmerPlaceholder>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.prayerCall}>Iqama:</Text>
              <ShimmerPlaceholder
                style={styles.prayerTimeContainer}
                visible={!isPrayersLoading}
              >
                <Text style={styles.prayerTime}>
                  {prayers[currentPrayer]?.iqama}
                </Text>
              </ShimmerPlaceholder>
            </View>
            <TouchableHighlight
              underlayColor="white"
              onPress={() => onGoNowPressed(currentMosque.address)}
            >
              <View style={styles.goNowButton}>
                <Text style={styles.goNowText}>Go now</Text>
                <Image
                  style={styles.openLinkImage}
                  source={{
                    uri: "/Users/yaser/Projects/iqama-app/assets/open-link.png",
                  }}
                ></Image>
              </View>
            </TouchableHighlight>
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
  prayerBoxContainer: { marginTop: 54, flex: 1 },
  prayerBox: {
    backgroundColor: "white",
    marginTop: 54,
    marginHorizontal: 8,
    borderRadius: 25,
  },
  prayerBoxInfo: {
    marginVertical: 12,
    marginHorizontal: 24,
  },
  prayerBoxMosque: {
    marginVertical: 12,
    fontFamily: typography.FONT_FAMILY_REGULAR,
    fontSize: typography.FONT_SIZE_LARGE,
  },
  prayerCall: {
    flex: 1,
    marginVertical: 12,
    fontFamily: typography.FONT_FAMILY_REGULAR,
    fontSize: typography.FONT_SIZE_LARGE,
  },
  prayerTimeContainer: {
    justifyContent: "center",
    flex: 4,
    marginVertical: 16,
  },
  prayerTime: {
    marginVertical: -4,
    fontFamily: typography.FONT_FAMILY_BOLD,
    fontSize: typography.FONT_SIZE_LARGE,
  },
  goNowButton: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 12,
    height: 52,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  goNowText: {
    marginVertical: 12,
    fontSize: typography.FONT_SIZE_LARGE,
    fontWeight: "bold",
    color: "#6A6A6A",
  },
  openLinkImage: { marginLeft: 12, width: 15, height: 15 },
  unselectedPrayerContainer: {
    marginVertical: 12,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 20,
  },
  unselectedPrayer: {
    marginVertical: 6,
    marginHorizontal: 16,
    fontSize: typography.FONT_SIZE_LARGE,
    color: "#6A6A6A",
  },
  selectedPrayerContainer: {
    marginVertical: 12,
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#53A2EC",
    borderRadius: 20,
    backgroundColor: "#EAF4FD",
  },
  selectedPrayer: {
    marginVertical: 6,
    marginHorizontal: 16,
    fontSize: typography.FONT_SIZE_LARGE,
    fontFamily: typography.FONT_FAMILY_BOLD,
    color: "#53A2EC",
  },
});

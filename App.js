import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";

const Mosque = ({ name, imageUrl, address }) => (
  <View style={{ flexDirection: "row", marginVertical: 18 }}>
    <View style={styles.logo}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
    </View>
    <View style={{ paddingLeft: 12 }}>
      <Text
        style={{
          marginBottom: 8,
          fontFamily: "Montserrat_600SemiBold",
          fontWeight: "600",
          fontSize: 20,
        }}
      >
        {name}
      </Text>
      <Text
        style={{
          fontFamily: "Montserrat_400Regular",
          fontSize: 12,
        }}
      >
        {address}
      </Text>
    </View>
  </View>
);

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [mosques, setMosques] = useState([]);
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  const getMosques = async () => {
    try {
      let response = await fetch("https://304256f44f19.ngrok.io/mosques");
      let json = await response.json();
      setMosques(json);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMosques();
  }, []);

  return (
    <View style={styles.list}>
      {isLoading || !fontsLoaded ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={mosques}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Mosque
              name={item.name}
              imageUrl={item.imageUrl}
              address={item.address}
            ></Mosque>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 24,
    marginTop: 60,
  },
  logo: {
    width: 66,
    height: 58,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
});

import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Mosques from "../components/Mosques";
import { API_URL } from "@env";

const MosquesPage = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [mosques, setMosques] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMosques();
      setMosques(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.list}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Mosques
          mosques={mosques}
          onItemPress={(item) =>
            navigation.push("Prayer Times", { mosque: item })
          }
        ></Mosques>
      )}
    </View>
  );
};

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

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default MosquesPage;

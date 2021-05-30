import "react-native-gesture-handler";
import * as React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import typography from "../styles/typography";

const Mosques = ({ mosques, onItemPress }) => (
  <FlatList
    data={mosques}
    keyExtractor={(item) => String(item.id)}
    renderItem={({ item }) => (
      <Mosque
        name={item.name}
        imageUrl={item.imageUrl}
        address={item.address}
        onPress={() => onItemPress(item)}
      ></Mosque>
    )}
  />
);

const Mosque = ({ name, imageUrl, address, onPress }) => {
  return (
    <TouchableHighlight underlayColor="#DDDDDD" onPress={onPress}>
      <View style={styles.item}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: imageUrl ? imageUrl : undefined }}
            defaultSource={{
              uri: "/Users/yaser/Projects/iqama-app/assets/mosque_placeholder.png",
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    marginVertical: 18,
    marginHorizontal: 24,
  },
  imageContainer: {
    width: 66,
    height: 58,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  textContainer: {
    paddingLeft: 12,
  },
  name: {
    marginBottom: 8,
    fontFamily: typography.FONT_FAMILY_BOLD,
    fontSize: typography.FONT_SIZE_LARGE,
  },
  address: {
    fontFamily: typography.FONT_FAMILY_REGULAR,
    fontSize: typography.FONT_SIZE_TINY,
  },
});

export default Mosques;

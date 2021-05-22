import { API_URL } from "@env";
import React from "react";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, Image, StyleSheet } from "react-native";
import {
  Col,
  Row,
  Rows,
  Table,
  TableWrapper,
} from "react-native-table-component";
import typography from "../styles/typography";

const PrayerTimesPage = ({ route }) => {
  const { mosque } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([[]]);
  const tableHead = ["", "Adhan", "Iqama"];
  const tableTitle = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  useEffect(() => {
    const fetchData = async () => {
      const prayerTimes = await getPrayerTimes(mosque.id);
      setTableData([
        [prayerTimes.fajr.athan, prayerTimes.fajr.iqama],
        [prayerTimes.dhuhr.athan, prayerTimes.dhuhr.iqama],
        [prayerTimes.asr.athan, prayerTimes.asr.iqama],
        [prayerTimes.maghrib.athan, prayerTimes.maghrib.iqama],
        [prayerTimes.isha.athan, prayerTimes.isha.iqama],
      ]);
      setLoading(false);
    };

    fetchData();
  }, [mosque.id]);

  return isLoading ? (
    <View style={[styles.center]}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View style={styles.list}>
      <View
        style={{
          display: "flex",
          height: 150,
          marginHorizontal: 100,
        }}
      >
        <Image
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: "contain",
          }}
          source={{ uri: mosque.imageUrl }}
        />
      </View>
      <View style={styles.table}>
        <Table>
          <Row
            data={tableHead}
            style={styles.head}
            textStyle={styles.name}
            flexArr={[1, 1, 1]}
          />
          <TableWrapper style={styles.wrapper}>
            <Col
              data={tableTitle}
              style={styles.title}
              textStyle={styles.name}
            ></Col>
            <Rows
              data={tableData}
              flexArr={[1, 1]}
              style={styles.row}
              textStyle={styles.time}
            />
          </TableWrapper>
        </Table>
      </View>
    </View>
  );
};

const getPrayerTimes = async (id) => {
  try {
    let response = await fetch(`${API_URL}/prayerTimes/${id}`);
    let json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
    return;
  }
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
  },
  list: {
    flex: 1,
    backgroundColor: "white",
  },
  table: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  wrapper: { flexDirection: "row" },
  title: { backgroundColor: "#f6f8fa", justifyContent: "space-evenly" },
  row: { height: 40, marginVertical: 8, justifyContent: "space-evenly" },
  name: {
    textAlign: "center",
    fontFamily: typography.FONT_FAMILY_BOLD,
    fontSize: typography.FONT_SIZE_LARGE,
  },
  time: {
    textAlign: "center",
    fontFamily: typography.FONT_FAMILY_REGULAR,
    fontSize: typography.FONT_SIZE_LARGE,
  },
});

export default PrayerTimesPage;

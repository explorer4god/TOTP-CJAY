import React from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";

const notificationsData = [
  {
    id: "1",
    itemName: "Mr Adebo Charles",
    itemDate: "Dec 23, 2023 7:34",
    itemText: "840039403030",
    itemSubText: "Individual",
  },
  {
    id: "2",
    itemName: "Smith Charles",
    itemDate: "Dec 23, 2023 7:34",
    itemText: "840039403030",
    itemSubText: "Individual",
  },
  {
    id: "3",
    itemName: "Gok Charles",
    itemDate: "Dec 23, 2023 7:34",
    itemText: "840039403030",
    itemSubText: "Individual",
  },
  {
    id: "4",
    itemName: "Adebo Charles",
    itemDate: "Dec 23, 2023 7:34",
    itemText: "840039403030",
    itemSubText: "Individual",
  },
];

export const Data = ({ onPressItem }) => {
  const renderItem = ({ item }) => {
    const firstLetter = item.itemName.charAt(0).toUpperCase();

    return (
      <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8} onPress={() => onPressItem(item)}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{firstLetter}</Text>
        </View>
        <View style={styles.itemDetailsContainer}>
          <Text style={styles.itemName}>{item.itemName}</Text>
          <Text style={styles.itemSubText}>{item.itemSubText}</Text>
        </View>
        <View style={styles.itemDetailsContainer}>
          <Text style={styles.itemText}>{item.itemText}</Text>
          <Text style={styles.itemDate}>{item.itemDate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={notificationsData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#EBF2FA',
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  iconText: {
    fontSize: 18,
    fontFamily: "Inter-Medium",
  },
  itemDetailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    fontWeight: '500',
    color: '#16192C',
    marginBottom: 5,
  },
  itemDate: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    fontWeight: '500',
    color: '#A6B7D4',
    textAlign: "right",
    marginRight: 10,
  },
  itemText: {
    textAlign: "right",
    marginRight: 10,
    fontSize: 14,
    fontFamily: "Inter-Medium",
    fontWeight: '500',
    color: '#16192C',
  },
  itemSubText: {
    fontSize: 12,
    color: '#A6B7D4',
    fontFamily: "Inter-Medium",
    fontWeight: '500',
  },
});
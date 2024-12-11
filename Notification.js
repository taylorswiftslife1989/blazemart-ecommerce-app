import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Notification() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: "1", text: "Your order has been shipped." },
    { id: "2", text: "Your item has been delivered." },
    { id: "3", text: "New message from seller." },
    { id: "4", text: "Your order has been shipped." },
    { id: "5", text: "Your item has been delivered." },
    { id: "6", text: "New message from seller." },
    { id: "7", text: "Your order has been shipped." },
    { id: "8", text: "Your item has been delivered." },
    { id: "9", text: "New message from seller." },
    // Add more notifications as needed
  ]);

  const handleOptionPress = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  const handleMarkAsRead = () => {
    setModalVisible(false);
    Alert.alert("Notification", "Mark as read successfully");
  };

  const handleTurnOffNotification = () => {
    Alert.alert(
      "Turn off Notification",
      "Would you like to turn off this notification?",
      [
        {
          text: "No",
          onPress: () => setModalVisible(false),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setModalVisible(false);
            Alert.alert("Notification", "This notification has been muted");
          },
        },
      ]
    );
  };

  const handleDeleteNotification = () => {
    Alert.alert(
      "Delete Notification",
      "Would you like to delete this notification?",
      [
        {
          text: "No",
          onPress: () => setModalVisible(false),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setNotifications((prevNotifications) =>
              prevNotifications.filter(
                (notification) => notification.id !== selectedNotification.id
              )
            );
            setModalVisible(false);
            Alert.alert(
              "Notification",
              "Notification has been deleted successfully"
            );
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationText}>{item.text}</Text>
      <TouchableOpacity onPress={() => handleOptionPress(item)}>
        <Image
          source={require("./assets/option.png")}
          style={styles.optionIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={require("./assets/background.jpg")}
          style={styles.background}
        >
          {/* Top Navigation */}
          <View style={styles.topContainer}>
            <View style={{ flex: 1, position: "relative" }}>
              <View style={styles.searchIconContainer}>
                <Image
                  source={require("./assets/home/search.png")}
                  style={styles.searchIcon}
                />
              </View>
              <TextInput
                style={styles.searchBar}
                placeholder="Search Notifications..."
                placeholderTextColor="#000"
              />
            </View>
            <View style={styles.topIcons}>
              <TouchableOpacity
                onPress={() => navigation.navigate("MySavedPage")}
              >
                <Image
                  source={require("./assets/marketplace/heart.png")}
                  style={styles.topIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("MessagePage")}
              >
                <Image
                  source={require("./assets/marketplace/message.png")}
                  style={styles.topIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Notification Title Row */}
          <View style={styles.titleRow}>
            <View style={styles.cartAndTitle}>
              <View style={styles.cartContainer}>
                <Image
                  source={require("./assets/marketplace/cart.png")}
                  style={styles.cartIcon}
                />
              </View>
              <Text style={styles.title}>Notifications</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("MyProfile")}>
              <View style={styles.profileContainer}>
                <Image
                  source={require("./assets/marketplace/profile_icon.png")}
                  style={styles.profileIcon}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Main Notification Container */}
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.mainNotificationContainer}>
              {/* Notification List */}
              <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.notificationList}
              />
            </View>
          </ScrollView>

          {/* Bottom Navigation */}
          <View style={styles.bottomNavigation}>
            <TouchableOpacity
              style={styles.navCircle}
              onPress={() => navigation.navigate("Home")}
            >
              <Image
                source={require("./assets/navigation/home.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navCircle}
              onPress={() => navigation.navigate("Marketplace")}
            >
              <Image
                source={require("./assets/navigation/marketplace.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.marketplace_navCircle}>
              <Image
                source={require("./assets/navigation/notifications.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navCircle}
              onPress={() => navigation.navigate("ProfilePage")}
            >
              <Image
                source={require("./assets/navigation/profile.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      {/* Modal for Options */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleMarkAsRead}
            >
              <Text style={styles.modalOptionText}>Mark as Read</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleTurnOffNotification}
            >
              <Text style={styles.modalOptionText}>
                Turn off this Notification
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleDeleteNotification}
            >
              <Text style={styles.modalOptionText}>Delete Notification</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalOptionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EAF0FF",
  },
  backgroundContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 35,
    top: 40,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#FFF", // Ensure the search bar has a white background
    borderRadius: 10,
    paddingVertical: 10,
    paddingLeft: 50, // Add padding to the left for the icon
    position: "relative",
    zIndex: 1, // Ensure the search bar is below the icon
  },
  searchIconContainer: {
    position: "absolute",
    height: "100%",
    width: 45, // Adjust width as needed
    backgroundColor: "#4E56A0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    zIndex: 2, // Ensure the icon is above the search bar
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  topIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  topIcon: {
    width: 45,
    height: 45,
    marginLeft: 10,
    borderRadius: 30,
    backgroundColor: "#4E56A0",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginBottom: 20,
    paddingBottom: 30,
    paddingVertical: 10,
    top: 40,
  },
  cartAndTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4E56A0",
    marginLeft: 10,
  },
  profileIcon: {
    width: 28,
    height: 28,
    borderRadius: 25,
  },
  cartContainer: {
    backgroundColor: "#4E56A0",
    borderRadius: 30,
    padding: 5,
  },
  profileContainer: {
    backgroundColor: "#4E56A0",
    borderRadius: 40,
    padding: 11,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  cartIcon: {
    width: 40,
    height: 40,
  },
  mainNotificationContainer: {
    flex: 1,
  },
  notificationList: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  notificationContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  optionIcon: {
    width: 20,
    height: 20,
  },
  bottomNavigation: {
    height: 90,
    backgroundColor: "#7190BF",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  navCircle: {
    width: 60,
    height: 60,
    backgroundColor: "#4E56A0",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  marketplace_navCircle: {
    width: 60,
    height: 60,
    backgroundColor: "#4E56A0",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFF",
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalOption: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  modalOptionText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4E56A0",
  },
});

import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProductSelectedHome() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={require("./assets/background.jpg")}
          style={styles.background}
        >
          {/* Top Container with Search, Heart, and Message Icons */}
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
                placeholder="Search Products..."
                placeholderTextColor="#000"
              />
            </View>
            <View style={styles.topIcons}>
              <TouchableOpacity
                onPress={() => navigation.navigate("MySavedPage")}
              >
                <Image
                  source={require("./assets/home/heart.png")}
                  style={styles.topIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("MessagePage")}
              >
                <Image
                  source={require("./assets/home/message.png")}
                  style={styles.topIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Product Details Section */}
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.imageContainer}>
              <Image
                source={require("./assets/home/product.png")}
                style={styles.productImage}
              />
            </View>
            <View style={styles.productDetailsContainer}>
              <Text style={styles.productTitle}>Product Title</Text>
              <Text style={styles.productPrice}>₱1,000</Text>
              <Text style={styles.productDescription}>
                This is a detailed description of the product. It includes all
                the necessary information about the product.
              </Text>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.home_navCircle}
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
        <TouchableOpacity
          style={styles.navCircle}
          onPress={() => navigation.navigate("Notification")}
        >
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#7190BF", // Bottom portion color
  },
  backgroundContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 35,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#FFF",
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
  },
  topIcon: {
    width: 45,
    height: 45,
    marginLeft: 10,
    resizeMode: "contain",
    backgroundColor: "#4E56A0",
    borderRadius: 30,
  },
  scrollViewContent: {
    paddingBottom: 90, // To avoid overlap with bottom navigation
  },
  productDetailsContainer: {
    marginTop: 150, // Adjust to position below the image container
    marginHorizontal: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: -150, // Adjust to overlap the white box
    zIndex: 1,
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4E56A0",
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: "#4E56A0",
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  productDescription: {
    fontSize: 16,
    color: "#4E56A0",
    textAlign: "center",
  },
  bottomNavigation: {
    height: 95,
    backgroundColor: "#7190BF",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30,
  },
  navCircle: {
    width: 60,
    height: 60,
    backgroundColor: "#4E56A0",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  home_navCircle: {
    width: 65,
    height: 65,
    backgroundColor: "#4E56A0",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#fff",
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
});

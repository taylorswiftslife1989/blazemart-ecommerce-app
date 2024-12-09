import React, { useState } from "react";
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
  Dimensions,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const Divider = () => <View style={styles.divider} />;

export default function ProductSelectedHome() {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [messageNotificationVisible, setMessageNotificationVisible] =
    useState(false);

  const productImages = Array(10).fill(require("./assets/home/product.png"));

  const onScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const relatedProducts = Array.from({ length: 4 }, (_, i) => ({
    id: i.toString(),
    title: `Related Product ${i + 1}`,
    price: `₱${(i + 1) * 100}`,
    image: require("./assets/home/product.png"),
  }));

  const renderRelatedProductsGrid = () => {
    return (
      <View style={styles.relatedProductsContainer}>
        {relatedProducts.map((product) => (
          <View key={product.id} style={styles.relatedProductContainer}>
            <Image source={product.image} style={styles.relatedProductImage} />
            <Text style={styles.relatedProductTitle}>{product.title}</Text>
            <Text style={styles.relatedProductPrice}>{product.price}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderSection = (section) => {
    switch (section.type) {
      case "images":
        return (
          <View style={styles.imageContainer} key="images">
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
            >
              {productImages.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setActiveIndex(index);
                    setModalVisible(true);
                  }}
                >
                  <Image source={image} style={styles.productImage} />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.indicatorContainer}>
              {productImages.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    activeIndex === index && styles.activeIndicator,
                  ]}
                />
              ))}
            </View>
          </View>
        );
      //Seller Area
      case "seller":
        return (
          <View key="seller">
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Seller Information</Text>
            </View>
            <View style={styles.sellerInfoBox}>
              <View style={styles.sellerInfoContainer}>
                <TouchableOpacity
                  onPress={() => {
                    /* Handle profile icon click */
                  }}
                >
                  <Image
                    source={require("./assets/profile_icon.png")}
                    style={styles.profileIcon}
                  />
                </TouchableOpacity>
                <View style={styles.sellerDetails}>
                  <Text style={styles.sellerName}>Seller Name</Text>
                  <Text style={styles.sellerContact}>Contact Info</Text>
                </View>
              </View>
              <View style={styles.messageIconContainer}>
                <Image
                  source={require("./assets/message.png")}
                  style={styles.messageIcon}
                />
                <Text style={styles.sendMessageText}>
                  Send Seller a Message
                </Text>
              </View>
              <View style={styles.blankContainer} />
              <View style={styles.messageContainer}>
                <TextInput
                  style={styles.messageInput}
                  placeholder="Type your message..."
                  placeholderTextColor="#000"
                />
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={() => {
                    setMessageNotificationVisible(true);
                    setTimeout(() => {
                      setMessageNotificationVisible(false);
                    }, 3000); // Hide notification after 3 seconds
                  }}
                >
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Divider />
          </View>
        );
      //End Seller Area

      //Details Area
      case "details":
        return (
          <View key="details">
            <View style={styles.product_title_price_container}>
              <Text style={styles.productTitle}>Product Title</Text>
              <Text style={styles.productPrice}>₱1,000</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Details</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.productDescription}>
                This is a detailed description of the product. It includes all
                the necessary information about the product.
              </Text>
            </View>
            <Divider />
          </View>
        );
      //End Details Area
      case "moreListings":
        return (
          <View key="moreListings">
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>More Listings</Text>
              {/* Add more listings content here */}
            </View>
            {renderRelatedProductsGrid()}
            <Divider />
          </View>
        );
      case "relatedProducts":
        return (
          <View key="relatedProducts">
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>
                Products Related to this Item
              </Text>
              <Text style={styles.sectionSubtitle}>Sponsored</Text>
              {/* Add related products content here */}
            </View>
            {renderRelatedProductsGrid()}
          </View>
        );
      default:
        return null;
    }
  };

  const sections = [
    { type: "images" },
    { type: "details" },
    { type: "seller" },
    { type: "moreListings" },
    { type: "relatedProducts" },
  ];

  const handleSave = () => {
    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false);
    }, 3000);
  };

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
            {sections.map(renderSection)}
          </ScrollView>
        </ImageBackground>
      </View>

      {/* Chat Now and Save Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.chatNowButton]}>
          <Image
            source={require("./assets/home/message.png")}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Chat Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
        >
          <Image
            source={require("./assets/home/heart.png")}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
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

      {/* Modal for Image View */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalIndicator}>
              {activeIndex + 1} of {productImages.length}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseButton}>X</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / width
              );
              setActiveIndex(index);
            }}
          >
            {productImages.map((image, index) => (
              <Image key={index} source={image} style={styles.modalImage} />
            ))}
          </ScrollView>
        </View>
      </Modal>

      {/* Notification */}
      {notificationVisible && (
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationHeading}>Success</Text>
          <Text style={styles.notificationDescription}>
            This Product has been saved Successfully!
          </Text>
        </View>
      )}

      {/* Message Notification */}
      {messageNotificationVisible && (
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationHeading}>Message Sent</Text>
          <Text style={styles.notificationDescription}>
            Your message has been sent successfully!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#7190BF",
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
  product_title_price_container: {
    marginTop: 150, // Adjust to position below the image container
    marginHorizontal: 0,
    backgroundColor: "#4E56A0",
    padding: 10,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: 0,
    marginBottom: -150, // Adjust to overlap the white box
    zIndex: 1,
  },
  productImage: {
    width: width, // Ensure the image takes the full width of the screen
    height: "100%",
    resizeMode: "cover",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#4E56A0",
    paddingVertical: 5,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFF",
    marginHorizontal: 4,
    opacity: 0.5,
  },
  activeIndicator: {
    opacity: 1,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "left",
    alignSelf: "flex-start",
    top: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 17,
    fontWeight: "bold",
    left: 10,
    color: "#FFFFFF",
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  descriptionContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  productDescription: {
    fontSize: 16,
    color: "#4E56A0",
    textAlign: "left",
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 20,
    top: 10,
    fontWeight: "bold",
    color: "#4E56A0",
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#4E56A0",
    marginBottom: 10,
  },
  divider: {
    height: 1.5,
    backgroundColor: "#4E56A0",
    marginVertical: 5,
  },

  //Seller Area
  sellerInfoBox: {
    backgroundColor: "#5775A4",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sellerInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  sellerDetails: {
    flex: 1,
  },
  sellerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  sellerContact: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  messageIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 15,
  },
  sendMessageText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  blankContainer: {
    height: 20, // Adjust height as needed
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageInput: {
    flex: 1,
    height: 40,
    borderColor: "#4E56A0",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#FBB217",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  sendButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  //End Seller Area

  relatedProductsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  relatedProductContainer: {
    width: "48%",
    marginVertical: 5,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  relatedProductImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  relatedProductTitle: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  relatedProductPrice: {
    marginTop: 5,
    fontSize: 14,
    color: "#4E56A0",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 95,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 0,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 0,
    marginHorizontal: 0,
  },
  chatNowButton: {
    backgroundColor: "#FBB217",
  },
  saveButton: {
    backgroundColor: "#4E56A0",
  },
  buttonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
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
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1, // Ensure the header is above other content
  },
  modalIndicator: {
    color: "white",
    fontSize: 18,
  },
  modalCloseButton: {
    color: "white",
    textAlign: "center", // Centers the text inside the button
    backgroundColor: "#4E56A0",
    fontSize: 24,
    width: 40,
    height: 40,
    borderRadius: 20, // Optional, for a circular button
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
    display: "flex", // Ensures flexbox properties are applied
  },
  modalImage: {
    width: width, // Ensure the image takes the full width of the screen
    top: 100,
    height: "80%",
    resizeMode: "contain",
  },
  notificationContainer: {
    position: "absolute",
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: "#4E56A0",
    padding: 13,
    borderRadius: 10,
    alignItems: "center",
  },
  notificationHeading: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left",
  },
  notificationDescription: {
    color: "white",
    fontSize: 16,
    textAlign: "justified",
  },
});

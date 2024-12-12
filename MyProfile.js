import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  SafeAreaView,
  SectionList,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function MyProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);

  const [profileImage, setProfileImage] = useState(
    require("./assets/profile_icon.png")
  );
  const [fullName, setFullName] = useState("Full Name");
  const [email, setEmail] = useState("example123@domain.com");
  const [contactNumber, setContactNumber] = useState("09123456789");

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const savedImageUri = await AsyncStorage.getItem("profileImage");
        if (savedImageUri) {
          setProfileImage({ uri: savedImageUri });
        }
      } catch (error) {
        console.error("Failed to load profile image:", error);
      }
    };

    loadProfileImage();

    if (route.params) {
      const { profileImage, fullName, email, contactNumber } = route.params;
      if (profileImage) setProfileImage(profileImage);
      if (fullName) setFullName(fullName);
      if (email) setEmail(email);
      if (contactNumber) setContactNumber(contactNumber);
    }
  }, [route.params]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const localUri = result.uri;
      const filename = localUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append("photo", { uri: localUri, name: filename, type });

      // Upload the image to the server
      const response = await fetch("http://your-server-url/upload", {
        method: "POST",
        body: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const responseData = await response.json();
      const serverUri = responseData.uri;

      // Download the image to the local folder
      const localPath = `${FileSystem.documentDirectory}${filename}`;
      await FileSystem.downloadAsync(serverUri, localPath);

      setProfileImage({ uri: localPath });

      // Save the image URI to AsyncStorage
      try {
        await AsyncStorage.setItem("profileImage", localPath);
      } catch (error) {
        console.error("Failed to save profile image:", error);
      }
    }
  };

  const productItems = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i.toString(),
        title: `Product ${i + 1}`,
        price: `₱${(i + 1) * 100}`,
        image: require("./assets/home/product.png"),
      })),
    []
  );

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() =>
          navigation.navigate("ProductSelectedHome", {
            product: item,
          })
        }
      >
        <Image source={item.image} style={styles.productImage} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </TouchableOpacity>
    ),
    [navigation]
  );

  const sections = [
    {
      title: "Profile",
      data: [
        <View style={styles.profileContainer} key="profile">
          <ImageBackground
            source={require("./assets/profile/profile_cover.jpg")}
            style={styles.profileBox}
          >
            <TouchableOpacity onPress={pickImage}>
              <Image source={profileImage} style={styles.profileImage} />
            </TouchableOpacity>
          </ImageBackground>
          <View style={styles.profileNameContainer}>
            <Text style={styles.profileName}>{fullName}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Image
                source={require("./assets/edit.png")}
                style={styles.editIcon}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileDescription}>Trailblazer</Text>
        </View>,
      ],
    },
    {
      title: "Bio",
      data: [
        <View style={styles.bioContainer} key="bio">
          <View style={styles.bioItem}>
            <Image
              source={require("./assets/verified.png")}
              style={styles.bioIcon}
            />
            <Text style={styles.bioText}>Verified Trailblazer</Text>
          </View>
          <View style={styles.bioItem}>
            <Image
              source={require("./assets/phone.png")}
              style={styles.bioIcon}
            />
            <Text style={styles.bioText}>{contactNumber}</Text>
          </View>
          <View style={styles.bioItem}>
            <Image
              source={require("./assets/email.png")}
              style={styles.bioIcon}
            />
            <Text style={styles.bioText}>{email}</Text>
          </View>
        </View>,
      ],
    },
    {
      title: "Listings",
      data: productItems,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={require("./assets/background.jpg")}
          style={styles.background}
        >
          {/* Top Navigation */}
          <View style={styles.topNavigation}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("./assets/search_category/back.png")}
                style={styles.navIcon}
              />
            </TouchableOpacity>
            <Text style={styles.navTitle}>Profile</Text>
          </View>

          <SectionList
            sections={sections}
            keyExtractor={(item, index) => item.id || index.toString()}
            renderItem={({ item, section }) =>
              section.title === "Listings" ? (
                <View style={styles.productsMainContainer}>
                  <FlatList
                    data={productItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.productList}
                    contentContainerStyle={styles.flatListContent}
                  />
                </View>
              ) : (
                item
              )
            }
            renderSectionHeader={({ section: { title } }) =>
              title !== "Profile" && (
                <View style={styles.sectionContainer}>
                  {title === "Listings" && (
                    <View>
                      <View style={styles.sectionHeader}>
                        <Image
                          source={require("./assets/listing.png")}
                          style={styles.sectionIcon2}
                        />
                        <Text style={styles.sectionTitle}>{title}</Text>
                      </View>
                      <View style={styles.searchBarContainer}>
                        <Image
                          source={require("./assets/search_listing.png")}
                          style={styles.searchIcon}
                        />
                        <TextInput
                          style={styles.searchBar}
                          placeholder="Search Products..."
                          placeholderTextColor="#888"
                        />
                      </View>
                    </View>
                  )}
                  {title === "Bio" && (
                    <View style={styles.sectionHeader}>
                      <Image
                        source={require("./assets/bio_icon.png")}
                        style={styles.sectionIcon2}
                      />
                      <Text style={styles.sectionTitle}>{title}</Text>
                    </View>
                  )}
                  {title !== "Listings" && title !== "Bio" && (
                    <Text style={styles.sectionTitle}>{title}</Text>
                  )}
                </View>
              )
            }
            contentContainerStyle={styles.scrollViewContent}
          />
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
    backgroundColor: "#7190BF",
  },
  backgroundContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  topNavigation: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4E56A0",
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    position: "relative",
  },
  navIcon: {
    width: 30,
    height: 30,
  },
  navTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    left: 183,
    right: 140,
    transform: [{ translateY: 20 }],
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 0,
  },
  profileImage: {
    width: 180,
    height: 180,
    position: "absolute",
    borderColor: "#CDC684",
    borderWidth: 4,
    borderRadius: 100,
    top: -50,
    right: -10,
    zIndex: 1,
  },
  profileBox: {
    width: "100%",
    height: 180,
    backgroundColor: "#4E56A0",
    alignItems: "center",
    justifyContent: "center",
  },
  profileNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 55,
    paddingHorizontal: 63,
    alignSelf: "flex-start",
    top: -20,
    left: 8,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4e56a0",
  },
  editButton: {
    marginLeft: 10,
    borderRadius: 30,
    padding: 5,
  },
  editIcon: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  profileDescription: {
    fontSize: 15,
    alignSelf: "flex-start",
    paddingHorizontal: 90,
    top: -25,
    fontWeight: "bold",
    color: "#4e56a0",
    marginBottom: -10, // Adjusted to remove extra space
  },
  scrollViewContent: {
    paddingBottom: 90,
  },
  bioContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 45,
    marginVertical: 5, // Adjusted to remove extra space
  },
  bioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bioIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
  },
  sectionContainer: {
    marginVertical: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
  },
  sectionIcon: {
    width: 60,
    height: 60,
    margin: 10,
    marginRight: 20,
    left: 10,
    backgroundColor: "#201b51",
    borderRadius: 40,
    borderColor: "#CDC684",
    borderWidth: 4,
  },
  sectionIcon2: {
    width: 60,
    height: 60,
    margin: 10,
    marginRight: 5,
    backgroundColor: "#201b51",
    borderRadius: 40,
    borderColor: "#CDC684",
    borderWidth: 4,
    right: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#201B51",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginHorizontal: 35,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  bioText: {
    fontSize: 16,
    color: "#4E56A0",
  },
  divider: {
    height: 3,
    backgroundColor: "#4E56A0",
    marginVertical: 10,
    marginHorizontal: 25,
  },
  productsMainContainer: {
    paddingHorizontal: 30,
  },
  productContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    paddingTop: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: (width - 40) / 2,
    height: 210,
  },
  productImage: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
  },
  productTitle: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#4E56A0",
  },
  productPrice: {
    marginTop: 5,
    fontSize: 14,
    color: "#4E56A0",
  },
  productList: {
    justifyContent: "space-between",
  },
  flatListContent: {
    paddingHorizontal: 10,
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

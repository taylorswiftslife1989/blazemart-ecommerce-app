import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const { width } = Dimensions.get("window");

export default function EditProfile() {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(
    require("./assets/profile_icon.png")
  );
  const [fullName, setFullName] = useState("First Name Last Name");
  const [email, setEmail] = useState("example123@domain.com");
  const [studentId, setStudentId] = useState("123456789");
  const [contactNumber, setContactNumber] = useState("09123456789");

  useEffect(() => {
    const loadProfileImage = async () => {
      const fileUri = `${FileSystem.documentDirectory}cache/profile_picture/current_profile.png`;
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        setProfileImage({ uri: fileUri });
      }
    };

    loadProfileImage();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const fileUri = `${FileSystem.documentDirectory}cache/profile_picture/current_profile.png`;
      await FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}cache/profile_picture`,
        { intermediates: true }
      );
      await FileSystem.copyAsync({
        from: result.uri,
        to: fileUri,
      });
      setProfileImage({ uri: fileUri });
    }
  };

  const handleSave = () => {
    navigation.navigate("MyProfile", {
      profileImage,
      fullName,
      email,
      studentId,
      contactNumber,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={require("./assets/background.jpg")}
          style={styles.background}
        >
          <View style={styles.topNavigation}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("./assets/search_category/back.png")}
                style={styles.navIcon}
              />
            </TouchableOpacity>
            <Text style={styles.navTitle}>Edit Profile</Text>
          </View>

          <ImageBackground
            source={require("./assets/profile/profile_cover.jpg")}
            style={styles.profileCover}
          >
            <TouchableOpacity onPress={pickImage}>
              <Image source={profileImage} style={styles.profileImage} />
            </TouchableOpacity>
          </ImageBackground>

          <Text style={styles.updateProfileText}>Update Profile</Text>

          <View style={styles.mainContainer}>
            <View style={styles.innerContainer}>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
              />
              <View style={styles.divider} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
              <View style={styles.divider} />
              <TextInput
                style={styles.input}
                placeholder="Student ID"
                value={studentId}
                onChangeText={setStudentId}
              />
              <View style={styles.divider} />
              <TextInput
                style={styles.input}
                placeholder="Contact Number"
                value={contactNumber}
                onChangeText={setContactNumber}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </ImageBackground>
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
  profileCover: {
    width: "100%",
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    position: "absolute",
    top: -40,
    right: width / 2 - 280,
    borderColor: "#FFF",
    borderWidth: 4,
  },
  updateProfileText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4E56A0",
    textAlign: "center",
    marginTop: 40,
  },
  mainContainer: {
    backgroundColor: "#4E56A0",
    padding: 20,
    marginTop: 20,
  },
  innerContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
  },
  input: {
    fontSize: 16,
    color: "#4E56A0",
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#4E56A0",
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: "#4E56A0",
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

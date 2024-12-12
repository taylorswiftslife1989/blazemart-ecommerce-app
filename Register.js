import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Animated,
  ImageBackground,
  Platform,
  StatusBar,
  View,
  Image,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { supabase } from "./supabase"; // Import your configured Supabase client
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [corUri, setCorUri] = useState(null);
  const [corName, setCorName] = useState(null); // To display file name
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fade-in effect
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleBackPress = () => {
    navigation.navigate("Login"); // Replace "Login" with the name of your login screen
  };

  const handleUploadCOR = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
        multiple: false,
      });

      console.log("DocumentPicker result:", result);

      if (result.canceled) {
        Alert.alert("Cancelled", "You did not select any file.");
      } else {
        const fileUri = result.assets[0].uri;
        const fileName = result.assets[0].name;
        setCorUri(fileUri);
        setCorName(fileName);
        Alert.alert(
          "File Selected",
          `COR file selected successfully:\n${fileName}`
        );
      }
    } catch (error) {
      console.error("Error selecting file:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred during file selection."
      );
    }
  };

  const handleSignUp = async () => {
    if (
      !fullname ||
      !email ||
      !studentId ||
      !username ||
      !password ||
      !confirmPassword ||
      !corUri
    ) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      // Upload COR to Supabase storage
      const fileName = `${studentId}_cor.pdf`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("cor_bucket")
        .upload(fileName, {
          uri: corUri,
          name: fileName,
          type: "application/pdf",
        });

      if (uploadError) {
        console.error("Error uploading COR:", uploadError);
        Alert.alert("Error", "Failed to upload COR.");
        return;
      }

      const corUrl = supabase.storage.from("cor_bucket").getPublicUrl(fileName)
        .data.publicUrl;

      // Insert user data into the database
      const { data, error } = await supabase.from("users").insert([
        {
          fullname,
          email,
          student_id: studentId,
          username,
          password, // In production, use hashed passwords
          cor_url: corUrl,
        },
      ]);

      if (error) {
        console.error("Error signing up:", error);
        Alert.alert("Error", "Failed to register. Please try again.");
      } else {
        Alert.alert("Success", "Registration successful!", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  return (
    <ImageBackground
      source={require("./assets/background.jpg")}
      style={styles.background}
    >
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        backgroundColor="transparent"
        translucent
      />

      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />

      <SafeAreaView style={styles.safeArea}>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Registration Form</Text>
          <Text style={styles.subtitle}>Please fill in the details below:</Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Required"
            placeholderTextColor="#555"
            value={fullname}
            onChangeText={setFullname}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Required"
            placeholderTextColor="#555"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Student ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Required"
            placeholderTextColor="#555"
            value={studentId}
            onChangeText={setStudentId}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Required"
            placeholderTextColor="#555"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Required"
              placeholderTextColor="#555"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={
                  showPassword
                    ? require("./assets/hide_pass.png")
                    : require("./assets/show_pass.png")
                }
                style={styles.showHideButton}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Required"
              placeholderTextColor="#555"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Image
                source={
                  showConfirmPassword
                    ? require("./assets/hide_pass.png")
                    : require("./assets/show_pass.png")
                }
                style={styles.showHideButton}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>COR (PDF)</Text>
          <TouchableOpacity
            style={[styles.uploadButton, { backgroundColor: "#4E56A0" }]}
            onPress={handleUploadCOR}
          >
            <Text style={styles.uploadButtonText}>
              {corName ? `Selected: ${corName}` : "Upload COR"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.signUpButton, { backgroundColor: "#4E56A0" }]}
            onPress={handleSignUp}
          >
            <Text style={styles.signUpButtonText}>SIGN UP</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleBackPress}>
            <Text style={styles.loginPrompt}>
              Already have an account?{" "}
              <Text style={styles.loginText}>Back to login.</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // Reuse your original styles here
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#000",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#000",
    fontSize: 15,
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    color: "#000",
    fontSize: 16,
    marginTop: 5,
    textAlign: "left",
    width: "70%",
    alignSelf: "center",
  },
  input: {
    width: "75%",
    height: 43,
    backgroundColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginVertical: 3,
    textAlign: "center",
    borderColor: "#4E56A0",
    borderWidth: 2,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",

    width: "90%",
  },
  showHideButton: {
    width: 30,
    height: 30,
    marginLeft: 15,
  },
  uploadButton: {
    width: "75%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderColor: "#4E56A0",
    borderWidth: 2,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  signUpButton: {
    width: "75%",
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  loginPrompt: {
    marginTop: 10,
    fontSize: 15,
    textAlign: "center",
  },
  loginText: {
    color: "#4E56A0",
    fontWeight: "600",
  },
});

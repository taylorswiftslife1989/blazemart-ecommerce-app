import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Animated,
  Modal,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

export default function CreatePass() {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleDonePress = () => {
    // Start fade-in animation and show loading indicator
    setIsLoading(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Wait for 2 seconds, then show the success message and navigate
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIsLoading(false);
        Alert.alert(
          "Account Recovery",
          "Account Password has been changed successfully.\nYou are now redirected back to the Login Page.",
          [{ text: "OK", onPress: () => navigation.navigate("Login") }]
        );
      });
    }, 2000);
  };

  return (
    <ImageBackground
      source={require("./assets/background.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Account Recovery</Text>
        <Text style={styles.subtitle}>Create new password</Text>

        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="#555"
          secureTextEntry={!showPassword}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          placeholderTextColor="#555"
          secureTextEntry={!showPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />

        <View style={styles.showPasswordContainer}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              { borderColor: showPassword ? "#FFFFFF" : "#FFFFFF" },
            ]}
            onPress={() => setShowPassword(!showPassword)}
          >
            <View
              style={[
                styles.radioButtonInner,
                { backgroundColor: showPassword ? "#FFFFFF" : "transparent" },
              ]}
            />
          </TouchableOpacity>
          <Text style={styles.showPasswordText}>Show Password</Text>
        </View>

        <TouchableOpacity style={styles.doneButton} onPress={handleDonePress}>
          <LinearGradient
            colors={["#D66464", "#703434"]}
            style={styles.doneButtonGradient}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Dimmed Overlay with Loading Indicator */}
      {isLoading && (
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </Animated.View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    marginVertical: 10,
    borderColor: "#F2A4A4",
    borderWidth: 3,
    textAlign: "center",
  },
  showPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    minHeight: 20,
    paddingHorizontal: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  showPasswordText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  passwordText: {
    color: "#703434",
    fontSize: 16,
  },
  doneButton: {
    width: "80%",
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    borderColor: "#F2A4A4",
    borderWidth: 3,
    marginTop: 20,
  },
  doneButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
});

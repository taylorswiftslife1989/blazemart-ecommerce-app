import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Animated,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "./supabase"; // Import Supabase client

export default function Login() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const moveAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    Animated.sequence([
      Animated.timing(moveAnim, {
        toValue: -150,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const { data, error } = await supabase
        .from("users") // Replace with your table name
        .select("*")
        .eq("username", username)
        .eq("password", password); // Replace with the actual column names

        console.log("Data:", data);
        console.log("Error:", error);

      if (error) {
        setErrorMessage("Error during authentication. Please try again.");
        console.error(error);
      } else if (data.length === 0) {
        setErrorMessage("Invalid username or password.");
      } else {
        navigation.navigate("Home"); // Navigate to the dashboard
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require("./assets/background.jpg")} style={styles.background}>
      <Animated.View style={[styles.container, { transform: [{ translateY: moveAnim }] }]}>
        <Image source={require("./assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>BLAZEMART</Text>
        <Text style={styles.subtitle}>
          "Shop Smart, BlazeMart"{"\n"}The Trailblazers' Marketplace
        </Text>
      </Animated.View>

      <Animated.View style={[styles.fadeContainer, { opacity: fadeAnim }]}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#555"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#555"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <LinearGradient
            colors={["#4E56A0", "#252A55"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPass")} disabled={loading}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Don’t have an account?{" "}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate("Register")}
          >
            {"\n"}Create your Account here
          </Text>
        </Text>
      </Animated.View>

      {loading && (
        <Animated.View style={[styles.loadingOverlay, { opacity: fadeAnim }]}>
          <ActivityIndicator size="100" color="#fff" />
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
    paddingHorizontal: 20,
  },
  fadeContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 30, // Moved up by 100 pixels from 200 to 100
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 430,
    marginBottom: 20,
  },
  title: {
    color: "#000",
    fontSize: 45,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    color: "#333",
    fontSize: 17,
    textAlign: "center",
    fontWeight: "800",
    fontStyle: "italic",
    marginVertical: 10,
  },
  input: {
    width: "75%",
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 5,
    textAlign: "center",
    borderColor: "#7190BF",
    borderWidth: 2,
  },
  forgotPassword: {
    color: "#000",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "right",
    width: "80%",
    marginTop: 5,
    textDecorationLine: "underline",
  },
  button: {
    width: "45%",
    height: 70,
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 15,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Times New Roman",
    fontSize: 35,
    fontWeight: "bold",
  },
  registerText: {
    color: "#000",
    fontSize: 16,
    marginTop: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  registerLink: {
    color: "#4e5d94",
    textDecorationLine: "underline",
    fontWeight: "800",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  adminButton: {
    width: 50, // Adjust based on desired size
    height: 50,
    backgroundColor: "#4E56A0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20, // Add spacing after the "Create your Account Here" button
  },
  adminIcon: {
    width: 30, // Adjust to fit icon size
    height: 30,
  },
});

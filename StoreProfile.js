import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";

export default function StoreProfile() {
  const [savedImageUri, setSavedImageUri] = useState(null);

  useEffect(() => {
    const loadProfileImage = async () => {
      const fileUri = `${FileSystem.documentDirectory}profile_picture/profile_image.png`;
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        setSavedImageUri(fileUri);
      }
    };

    loadProfileImage();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Picture</Text>
      {savedImageUri && (
        <Image source={{ uri: savedImageUri }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderColor: "#FFF",
    borderWidth: 4,
  },
});

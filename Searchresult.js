import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function SearchResult() {
  const navigation = useNavigation();
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const productItems = Array.from({ length: 30 }, (_, i) => ({
    id: i.toString(),
    title: `Product ${i + 1}`,
    price: `₱${(i + 1) * 100}`,
  }));

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image
        source={require("./assets/marketplace/sample_product.jpg")}
        style={styles.productImage}
      />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </View>
  );

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const handleFilterClose = () => {
    setFilterModalVisible(false);
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
            <Text style={styles.navTitle}>Search Result</Text>
          </View>

          <Text style={styles.searchResultText}>Search Result of: </Text>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={handleFilterPress}
          >
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>

          <FlatList
            data={productItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.productList}
          />

          {/* Filter Modal */}
          <Modal
            visible={isFilterModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={handleFilterClose}
          >
            <View style={styles.modalOuterContainer}>
              <View style={styles.modalInnerContainer}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleFilterClose}
                >
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Filter Products</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Price"
                    keyboardType="numeric"
                  />
                  <TextInput style={styles.modalInput} placeholder="Sort by" />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Condition"
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Availability"
                  />
                  <TouchableOpacity
                    style={styles.applyButton}
                    onPress={handleFilterClose}
                  >
                    <Text style={styles.applyButtonText}>Apply Filters</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
  searchResultText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4E56A0",
    textAlign: "center",
    marginTop: 20,
  },
  filterButton: {
    backgroundColor: "#4E56A0",
    padding: 10,
    borderRadius: 10,
    margin: 20,
    alignItems: "center",
  },
  filterButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  productList: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  productContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: (width - 40) / 2, // Adjust width for 2 columns
  },
  productImage: {
    width: "100%",
    height: 150,
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
  modalOuterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
  },
  modalInnerContainer: {
    width: "90%",
    backgroundColor: "#4E56A0",
    borderRadius: 10,
    padding: 10,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 18,
    zIndex: 1,
    backgroundColor: "#4E56A0",
    padding: 3,
    paddingHorizontal: 10,
    borderRadius: 40,
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#cccccc",
    borderRadius: 10,
    padding: 10,
  },
  modalTitle: {
    fontSize: 18,
    color: "#4E56A0",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalInput: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: "#4E56A0",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

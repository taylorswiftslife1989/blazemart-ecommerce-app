import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";

const MessagePage = ({ navigation }) => {
  const [chats, setChats] = useState([
    {
      id: 1,
      title: "Billie • iPhone 15 (128gb)",
      message: "Hi, is this product still available?",
      image: require("./assets/messaging/product.jpg"),
      starred: false,
      selected: false,
    },
    {
      id: 2,
      title: "Ariana • Scientific Calculator",
      message: "Yes, the product is still available.",
      image: require("./assets/messaging/product.jpg"),
      starred: false,
      selected: false,
    },
    {
      id: 3,
      title: "Lady • Makeup Set",
      message: "Product you viewed now SOLD.",
      image: require("./assets/messaging/product.jpg"),
      starred: false,
      selected: false,
    },
    {
      id: 4,
      title: "Taylor • Bodycon Dress",
      message: "You can now rate the Buyer.",
      image: require("./assets/messaging/product.jpg"),
      starred: false,
      selected: false,
    },
    {
      id: 5,
      title: "Katy • ROTC Uniform Set",
      message: "Product you viewed now SOLD.",
      image: require("./assets/messaging/product.jpg"),
      starred: false,
      selected: false,
    },
    {
      id: 6,
      title: "Bruno • Books TCW and...",
      message: "You can now rate the Buyer.",
      image: require("./assets/messaging/product.jpg"),
      starred: false,
      selected: false,
    },
  ]);

  const [selectMode, setSelectMode] = useState(false);

  const handleArchive = () => {
    const selectedChats = chats.filter((chat) => chat.selected);
    if (selectedChats.length > 0) {
      Toast.show({
        type: "success",
        text1: "Archived",
        text2: "Selected chats have been archived.",
        visibilityTime: 3000,
      });
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.selected ? { ...chat, backgroundColor: "black" } : chat
        )
      );
    }
  };

  const handleStar = () => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.selected ? { ...chat, starred: !chat.starred } : chat
      )
    );
  };

  const handleDelete = () => {
    const selectedChats = chats.filter((chat) => chat.selected);
    if (selectedChats.length > 0) {
      Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete the selected chats?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              setChats((prevChats) =>
                prevChats.map((chat) =>
                  chat.selected ? { ...chat, backgroundColor: "black" } : chat
                )
              );
              Toast.show({
                type: "success",
                text1: "Deleted",
                text2: "Selected chats have been deleted.",
                visibilityTime: 3000,
              });
            },
          },
        ]
      );
    }
  };

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    setChats((prevChats) =>
      prevChats.map((chat) => ({ ...chat, selected: false }))
    );
  };

  const toggleSelectChat = (id) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === id ? { ...chat, selected: !chat.selected } : chat
      )
    );
  };

  const handleScreenTap = () => {
    if (selectMode) {
      setSelectMode(false);
      setChats((prevChats) =>
        prevChats.map((chat) => ({ ...chat, selected: false }))
      );
    }
  };

  const selectAllChats = () => {
    setChats((prevChats) =>
      prevChats.map((chat) => ({ ...chat, selected: true }))
    );
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.chatContainer,
        item.selected && styles.selectedChatContainer,
        item.backgroundColor && { backgroundColor: item.backgroundColor },
      ]}
      onPress={() => selectMode && toggleSelectChat(item.id)}
      onLongPress={() => {
        setSelectMode(true);
        toggleSelectChat(item.id);
      }}
    >
      <Image source={item.image} style={styles.chatImage} />
      <View style={styles.chatDetails}>
        <Text style={styles.chatTitle}>{item.title}</Text>
        <Text style={styles.chatMessage}>{item.message}</Text>
      </View>
      {item.starred && (
        <Image
          source={require("./assets/messaging/star_chat.png")}
          style={styles.actionIcon}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleScreenTap}
      activeOpacity={1}
    >
      <Image
        source={require("./assets/messaging/background.jpg")}
        style={styles.backgroundImage}
      />
      {/* Top Navigation */}
      <View style={styles.topNavigation}>
        {selectMode ? (
          <>
            <TouchableOpacity onPress={selectAllChats}>
              <Text style={styles.navText}>Select All</Text>
            </TouchableOpacity>
            <Text style={[styles.navTitle, styles.navTitleSelectMode]}>
              Chats
            </Text>
            <View style={styles.navActions}>
              <TouchableOpacity onPress={handleStar}>
                <Image
                  source={require("./assets/messaging/star_icon.png")}
                  style={styles.navIcon_option}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleArchive}>
                <Image
                  source={require("./assets/messaging/archive.png")}
                  style={styles.navIcon_option}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete}>
                <Image
                  source={require("./assets/messaging/delete.png")}
                  style={styles.navIcon_option}
                />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Image
                source={require("./assets/messaging/back.png")}
                style={styles.navIcon}
              />
            </TouchableOpacity>
            <Text style={styles.navTitle}>Chats</Text>
            <View style={styles.navActions}>
              <TouchableOpacity onPress={toggleSelectMode}>
                <Image
                  source={require("./assets/messaging/option.png")}
                  style={styles.navIcon}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderChatItem}
        contentContainerStyle={styles.chatList}
      />
      <Toast />
    </TouchableOpacity>
  );
};

export default MessagePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    resizeMode: "cover",
    zIndex: -1,
  },
  topNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#4E56A0",
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  navIcon: {
    width: 30,
    height: 30,
  },
  navIcon_option: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  navTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  navTitleSelectMode: {
    color: "#4E56A0", // Change the color when in select mode
  },
  navText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  navActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  chatList: {
    padding: 10,
  },
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  selectedChatContainer: {
    backgroundColor: "#dfdfdf",
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatDetails: {
    flex: 1,
  },
  chatTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },
  chatMessage: {
    fontSize: 12,
    color: "#666",
  },
  chatActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
});

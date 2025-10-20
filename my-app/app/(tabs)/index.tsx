import React, { useContext, useState } from "react";
import {View ,Text ,FlatList , Image , TouchableOpacity, TextInput, StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FavoritesContext } from "@/app/context/FavoritesContext";

const DATA = [
  { id: "1", title: "Black Simple Lamp", price: 12, image: require("@/assets/images/lamp.jpg") },
  { id: "2", title: "Minimal Stand", price: 25, image: require("@/assets/images/stand.jpg") },
  { id: "3", title: "Coffee Chair", price: 20, image: require("@/assets/images/chair.jpg") },
  { id: "4", title: "Simple Desk", price: 50, image: require("@/assets/images/desk.jpg") },
];

export default function HomeScreen() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Filter products based on search text (case-insensitive)
  const filteredData = DATA.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: any) => {
    const isFavorite = favorites.includes(item.id);

    return (
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} />
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => toggleFavorite(item.id)}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={22}
            color={isFavorite ? "#E53935" : "#444"}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top bar with search button */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
          <Image
            source={require("@/assets/images/search.png")}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Find All You Need</Text>
        {/* empty space to balance the layout */}
        <View style={{ width: 30 }} />
      </View>

      {showSearch && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchText}
          onChangeText={setSearchText}
        />
      )}

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, paddingTop: 50 },
  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  searchIcon: { width: 30, height: 30 },
  header: { fontSize: 22, fontWeight: "700", textAlign: "center", flex: 1 },
  searchInput: { height: 40, borderColor: "#ccc", borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 10 },
  card: { backgroundColor: "#ffffff", borderRadius: 12, marginBottom: 20, width: "48%", padding: 10, position: "relative" },
  image: { width: "100%", height: 220, borderRadius: 10 },
  heartIcon: { position: "absolute", top: 12, right: 12, backgroundColor: "#fff", borderRadius: 50, padding: 4 },
  title: { fontSize: 14, fontWeight: "600", marginTop: 10 },
  price: { fontSize: 13, color: "#4F63AC", marginTop: 4 },
});

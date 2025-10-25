import React, { useContext } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FavoritesContext } from "@/app/context/FavoritesContext";
import { DATA } from "@/app/data";

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  // useMemo, et uuenduks ainult siis, kui favorites muutub
  const favoriteItems = React.useMemo(
    () => DATA.filter((item) => favorites.includes(item.id)),
    [favorites]
  );

  const renderItem = ({ item }: any) => {
    const isFavorite = favorites.includes(item.id);

    return (
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} />
        <TouchableOpacity style={styles.heartIcon} onPress={() => toggleFavorite(item.id)}>
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
      <Text style={styles.header}>My Favorites</Text>
      {favoriteItems.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet.</Text>
      ) : (
        <FlatList
          data={favoriteItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, paddingTop: 50 },
  header: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 20 },
  emptyText: { textAlign: "center", marginTop: 50, fontSize: 16, color: "#888" },
  card: { backgroundColor: "#f9f9f9", borderRadius: 12, marginBottom: 20, width: "48%", padding: 10, position: "relative" },
  image: { width: "100%", height: 150, borderRadius: 10 },
  heartIcon: { position: "absolute", top: 12, right: 12, backgroundColor: "#fff", borderRadius: 50, padding: 4 },
  title: { fontSize: 14, fontWeight: "600", marginTop: 10 },
  price: { fontSize: 13, color: "#4F63AC", marginTop: 4 },
});

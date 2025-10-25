import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FavoritesContext } from "@/app/context/FavoritesContext";
import { DATA } from "@/app/data";

export default function DetailScreen() {
  const { productId } = useLocalSearchParams();
  const router = useRouter();
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const product = DATA.find((item) => item.id === String(productId));
  if (!product) return <Text>Product not found</Text>;

  const isFavorite = favorites.includes(product.id);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Image source={product.image} style={styles.image} />

      <View style={styles.card}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => toggleFavorite(product.id)}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "#E53935" : "#4F63AC"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => router.back()}
          >
            <Text style={styles.contactText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: { width: "100%", height: 400 },
  card: { backgroundColor: "#fff", borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -40, padding: 20, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 8 },
  price: { fontSize: 30, fontWeight: "700", marginBottom: 12 },
  description: { fontSize: 14, color: "#606060", lineHeight: 22 },
  buttonsContainer: { flexDirection: "row", marginTop: 20, alignItems: "center", justifyContent: "space-between" },
  iconButton: { width: 50, height: 50, borderRadius: 12, backgroundColor: "#F1F3FF", alignItems: "center", justifyContent: "center" },
  contactButton: { flex: 1, height: 50, marginLeft: 12, borderRadius: 12, backgroundColor: "#4F63AC", alignItems: "center", justifyContent: "center" },
  contactText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

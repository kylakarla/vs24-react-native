import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { push } from "expo-router/build/global-state/routing";
import { Ionicons } from "@expo/vector-icons";
import { FavoritesContext } from "@/app/context/FavoritesContext";
import { fetchProducts, Product } from "@/app/data";

export default function DetailScreen() {
  const { productId } = useLocalSearchParams();
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      const found = data.find((p) => p.id === String(productId)) || null;
      setProduct(found);
      setLoading(false);
    });
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F63AC" />
        <Text>Loading product...</Text>
      </View>
    );
  }

  if (!product) return <Text style={{ padding: 20 }}>Product not found</Text>;

  const isFavorite = favorites.includes(product.id);
  

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.card}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.buttonsContainer}>
          {/* Heart icon */}
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

          {/* Sinine Back nupp */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => push("/(tabs)")}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: { width: "100%", height: 400 },
  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -40,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 8 },
  price: { fontSize: 30, fontWeight: "700", marginBottom: 12 },
  description: { fontSize: 14, color: "#606060", lineHeight: 22 },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#F1F3FF",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#4F63AC",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: { color: "#fff", fontWeight: "600" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});

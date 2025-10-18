import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function GoogleButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable style={styles.googleButton} onPress={onPress}>
      <Ionicons name="logo-google" size={20} color="#fff" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  googleButton: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
});
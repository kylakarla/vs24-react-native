import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { UserContext } from "@/app/context/UserContext";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    router.replace("/signIn");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      {user ? (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user.name}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
      ) : (
        <Text style={{ textAlign: "center", marginTop: 50 }}>No user logged in</Text>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 26, fontWeight: "700", marginBottom: 30, textAlign: "center" },
  infoContainer: { marginBottom: 50 },
  label: { fontSize: 14, color: "#888", marginTop: 10 },
  value: { fontSize: 18, fontWeight: "600", marginTop: 2 },
  logoutButton: { backgroundColor: "#E53935", paddingVertical: 15, borderRadius: 8, alignItems: "center" },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

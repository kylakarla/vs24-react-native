import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import InputField from "@/components/forms/InputField_";
import GoogleButton from "@/components/forms/GoogleButton";
import { ButtonColors } from "@/constants/theme";
import {useRouter } from "expo-router";
import { push } from "expo-router/build/global-state/routing";
import { UserContext } from "@/app/context/UserContext";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }
    setUser({ name: "John Doe", email }); // Näide: staatiline nimi
    push("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#000" onPress={() => router.back()} />
        <Text style={styles.title}>Sign In</Text>
      </View>

      <InputField placeholder="E-mail" value={email} onChangeText={setEmail} />
      <InputField placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <Pressable style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.or}>Or sign in with</Text>
        <View style={styles.line} />
      </View>
      <GoogleButton onPress={() => {}} />

      <Text style={styles.footer}>
        Don’t have an account?{" "}
        <Text style={{ color: "#4F63AC" }} onPress={() => router.push("/signUp")}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  title: { fontSize: 26, fontWeight: "700", marginLeft: 10 },
  button: { backgroundColor: ButtonColors.signInBackground, paddingVertical: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: ButtonColors.signInText, fontSize: 16, fontWeight: "600" },
  divider: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
  line: { flex: 1, height: 1, backgroundColor: "#ccc" },
  or: { marginHorizontal: 10, fontSize: 14, color: "#888" },
  footer: { textAlign: "center", marginTop: 20, fontSize: 14, color: "#555" },
});

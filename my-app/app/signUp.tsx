import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import InputField from "@/components/forms/InputField_";
import GoogleButton from "@/components/forms/GoogleButton";
import { ButtonColors } from "@/constants/theme";
import {useRouter } from "expo-router";
import { push } from "expo-router/build/global-state/routing";
import { UserContext } from "@/app/context/UserContext";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  const handleSignUp = () => {
    if (!name || !email || !password) return;
    setUser({ name, email });
    push("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#000" onPress={() => router.back()} />
        <Text style={styles.title}>Sign Up</Text>
      </View>

      <InputField placeholder="Name" value={name} onChangeText={setName} />
      <InputField placeholder="E-mail" value={email} onChangeText={setEmail} />
      <InputField placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <Text style={styles.terms}>I agree with <Text style={{ color: "#4F63AC" }}>Terms & Privacy</Text></Text>

      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.or}>Or sign up with</Text>
        <View style={styles.line} />
      </View>
      <GoogleButton onPress={() => {}} />

      <Text style={styles.footer}>
        Already have an account?{" "}
        <Text style={{ color: "#4F63AC" }} onPress={() => router.push("/signIn")}>
          Sign In
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  title: { fontSize: 26, fontWeight: "700", marginLeft: 10 },
  terms: { fontSize: 14, marginBottom: 20 },
  button: { backgroundColor: ButtonColors.signUpBackground, paddingVertical: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: ButtonColors.signUpText, fontSize: 16, fontWeight: "600" },
  divider: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
  line: { flex: 1, height: 1, backgroundColor: "#ccc" },
  or: { marginHorizontal: 10, fontSize: 14, color: "#888" },
  footer: { textAlign: "center", marginTop: 20, fontSize: 14, color: "#555" },
});

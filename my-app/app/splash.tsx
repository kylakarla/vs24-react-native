import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import SignUpButton from "../components/buttons/SignUpButton";
import SignInButton from "../components/buttons/SignInButton";

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/splash_image.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>Welcome to My App!</Text>

      <SignUpButton onPress={() => router.push("/signUp")} />
      <SignInButton onPress={() => router.push("/signIn")} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  image: { width: 250, height: 250, marginBottom: 30 },
  text: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 40 },
});
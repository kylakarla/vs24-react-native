// components/forms/InputField.tsx
import React, { useState } from "react";
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

export default function InputField({ placeholder, secureTextEntry, value, onChangeText }: Props) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        value={value}
        onChangeText={onChangeText}
      />
      {secureTextEntry && (
        <Pressable
          style={styles.icon}
          onPress={() => setPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={20}
            color="#4F63AC"
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  icon: {
    position: "absolute",
    right: 15,
    top: 12,
  },
});

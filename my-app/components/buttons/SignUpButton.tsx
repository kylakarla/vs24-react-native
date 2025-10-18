import { ButtonColors } from "@/constants/theme";
import { Pressable, Text, StyleSheet } from "react-native";

export default function SignUpButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Sign Up</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "80%",
    paddingVertical: 15,
    backgroundColor: ButtonColors.signUpBackground,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  text: {
    color: ButtonColors.signUpText,
    fontSize: 16,
    fontWeight: "600",
  },
});



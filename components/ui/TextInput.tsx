import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const CustomTextInput = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { borderBottomWidth: 1 }]}
        placeholder="Ime"
        placeholderTextColor="#888"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Vaše prezime"
        placeholderTextColor="#ccc"
        value={lastName}
        onChangeText={setLastName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  input: {
    fontSize: 16,
    color: "#333",
    padding: 10,
  },
});

export default CustomTextInput;

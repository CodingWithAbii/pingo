import React from "react";
import {
  Text,
  StyleSheet,
  View,
  ViewProps,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";

type CourseProps = ViewProps & {
  title: string;
  description: string;
  image: any;
  onPress?: () => void;
};

const CourseCard: React.FC<CourseProps> = ({ title, description, image, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Za Android senku
  },
  image: {
    width: "100%",
    height: 140, // Dodao fiksnu visinu da ne bude linija
    backgroundColor: "#ddd",
  },
  textContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 14,
    color: "#4B4B4B",
    marginTop: 4,
  },
});

export default CourseCard;

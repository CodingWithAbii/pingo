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
  variant: string;
  title: string;
  description: string;
  image: any;
  onPress?: () => void;
};

const CourseCard: React.FC<CourseProps> = ({ title, description, image, onPress, variant }) => {
  return (
    <TouchableOpacity onPress={onPress} style={ variant === 'dark' ? styles.darkcard : styles.lightcard}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={ variant === 'dark' ? styles.darktitle : styles.lighttitle}>{title}</Text>
        <Text style={variant === 'dark' ? styles.darkdescription : styles.lightdescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  lightcard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#E5E5E5",
    borderBottomWidth: 4
  },
  darkcard: {
    width: "100%",
    backgroundColor: '#131F24',
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#37464F",
    borderBottomWidth: 4
  },
  image: {
    width: "100%",
    height: 140,
  },
  textContainer: {
    padding: 12,
  },
  lighttitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B4B4B",
  },
  darktitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B8BCBD",
  },
  lightdescription: {

    fontSize: 14,
    color: "#4B4B4B",
    marginTop: 4,
  },
   darkdescription: {
    fontSize: 14,
    color: "#B8BCBD",
    marginTop: 4,
  },
});

export default CourseCard;

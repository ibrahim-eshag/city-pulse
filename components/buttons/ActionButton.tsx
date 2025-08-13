import { fonts } from "@/assets/fonts";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IActionButtonProps {
  onPress: () => void;
  title: string;
  style?: any;
  children?: any;
  disabled?: boolean;
  titleStyle?: any;
}

const ActionButton = ({
  onPress,
  title,
  disabled,
  style,
  titleStyle,
  children,
}: IActionButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.container,
        style && { ...style },
        disabled && { backgroundColor: "lightgrey" },
      ]}
      onPress={onPress}
    >
      <View style={styles.childrenContainer}>
        {children}
        <Text style={[styles.text, titleStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    borderRadius: 12,
  },
  childrenContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontFamily: fonts.bold,
  },
});

export default ActionButton;

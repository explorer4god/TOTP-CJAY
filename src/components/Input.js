import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const Input = ({ label, icon, numberOfLines = 1, onIconPress, textInputWidth, placeholder, ...others }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={[styles.container, { width: textInputWidth || "100%" }]}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.inputContainer, { borderColor: isFocused ? "#6500E0" : "#D3D3D3" }]}>
        <TextInput
          style={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          {...others}
          multiline={numberOfLines > 1}
          numberOfLines={numberOfLines}
        />
      </View>

      {icon && (
        <TouchableOpacity activeOpacity={1} style={styles.icon} onPress={onIconPress}>
          {icon}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "90%",
    flexShrink: 1
  },
  label: {
    fontWeight: "400",
    fontSize: 14
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    height: 52,
    marginTop: 5,
    zIndex: 0, 
  },
  input: {
    height: 52,
    textAlignVertical: "center",
    paddingHorizontal: 10,
  },
  icon: {
    borderRadius: 10,
    paddingHorizontal: 5,
    zIndex: 100,
    position: "absolute",
    right: 5,
    top: 30,
    bottom: 5,
    justifyContent: "center",
  },
});

export default Input;
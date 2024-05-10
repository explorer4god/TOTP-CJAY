import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";

const Button = ({title, onPress, disabled, backgroundColor, loading, customStyles, ...others}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            disabled={disabled}
            onPress={disabled ? undefined : onPress}
            {...others}
        >
            <View
                style={[
                    styles.button,
                    customStyles,
                    { backgroundColor: disabled ? '#D3D3D3' : backgroundColor || '#6500E0' },
                ]}
            >
                {!loading ? (
                    <Text style={styles.text}>{title}</Text>
                ) : (
                    <ActivityIndicator style={styles.activity} color={'#fff'} size="large" />
                )}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
    },
    button: {
      margin: 10,
      height: 52,
      width: "90%",
      display: "flex",
      justifyContent: "center",
      borderRadius: 12,
      backgroundColor: '#6500E0',
    },
    text: {
      color: "#fff",
      fontSize: 14,
      lineHeight: 30,
      fontWeight: '400',
      fontFamily: 'Inter-Medium',
      textAlign: "center",
      textAlignVertical: "center",
    },
    activity: {
      height: "100%",
    },
})

export default Button;
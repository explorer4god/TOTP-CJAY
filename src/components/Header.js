import * as React from 'react';
import { View, Text, StyleSheet } from "react-native";

const Header = ({ topHeading, subHeading }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>{topHeading}</Text>
            <View style={styles.space}/>
            <Text style={styles.subText}>{subHeading}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        paddingHorizontal: "5%",
        marginBottom: 10,
    },
    textStyle: {
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontSize: 24
    },
    subText: {
        fontFamily: "Inter-Light",
        fontWeight: "400",
        fontSize: 14,
        color: '#666666'
    },
    space: {
        marginTop: '2%'
    }
})

export default Header;
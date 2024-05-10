import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import { Data } from '../components/Data';
import { colors } from '../utils/colors';
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

const Dashboard = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await auth().signOut();

            //reset the navigation stack to Login and remove the OTP-related screens
            navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
            })
        } catch (error) {
            showMessage({
                message: "Error Logout",
                description: error.message || 'Failed to logout.',
                type: "danger",
                floating: true,
                icon: "info",
                duration: 5000,
                style: {
                    marginTop: "10%",
                },
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <Header
                    topHeading={"Dashboard"}
                />
            </View>

            <View style={styles.filterWrapper}>
                <Data/>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title={"Logout"}
                    onPress={handleLogout}
                />
            </View>
        </View>
    )
}

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        flexGrow: 1,
    },
    headerWrapper: {
        marginTop: '15%'
    },
    filterWrapper: {
        paddingHorizontal: 20,
        marginTop: 20
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        paddingBottom: 20
    },
})
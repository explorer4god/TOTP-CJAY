import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import ScreenHeader from '../components/ScreenHeader';
import Input from '../components/Input';
import Button from '../components/Button';
import firestore from '@react-native-firebase/firestore';
import { showMessage } from 'react-native-flash-message';
import { colors } from '../utils/colors';

const Register = ({ route, navigation }) => {
    const { uid } = route.params || {};
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [loading, setLoading] = useState(false);

    const isButtonDisabled = !name || !dateOfBirth || !gender;

    const saveDetails = async () => {
        setLoading(true);
        if (!uid) {
            console.error("No UID provided.");
            return; // Stop the function if uid is not valid
        }
        try {
            await firestore().collection("users").doc(uid).set({
                name,
                dateOfBirth,
                gender,
            });

            //after saving details, navigate to Dashboard
            navigation.navigate("Dashboard");
        } catch (error) {
            showMessage({
                message: "Error saving details",
                description: error.message || 'Failed to save details.',
                type: "danger",
                floating: true,
                icon: "info",
                duration: 5000,
                style: {
                    marginTop: "10%",
                },
            });
        }
        setLoading(false); 
    }

    return (
        <View style={styles.container}>
            <ScreenHeader/>
            <Header topHeading={"Create Account"}/>
            <View style={styles.wrapper}>
                <Input
                    placeholder={"Name"}
                    value={name}
                    onChangeText={setName}
                />
                <Input
                    placeholder={"Date of birth"}
                    value={dateOfBirth}
                    onChangeText={setDateOfBirth}
                />
                <Input
                    placeholder={"Gender"}
                    value={gender}
                    onChangeText={setGender}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title={"Submit"}
                    disabled={isButtonDisabled}
                    onPress={saveDetails}
                    loading={loading}
                />
            </View>

        </View>
    )
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    wrapper: {
        paddingTop: 10,
        marginBottom: 20,
        paddingHorizontal: 20
    },
    label: {
        fontWeight: '400',
        fontSize: 14,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        paddingBottom: 20
    }
})
import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import Header from '../components/Header';
import Button from '../components/Button';
import PinInput from '../components/PinInput';
import PhoneInput from 'react-native-phone-input';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { showMessage } from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging';

const useCountdown = (initialState = 120) => {
    const [seconds, setSeconds] = useState(initialState);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        } else if (seconds <= 0) {
            setIsActive(false);
            setSeconds(initialState); // Reset countdown
        }
        return () => clearInterval(interval);
    }, [isActive, seconds, initialState]);

    return { seconds, isActive, setIsActive };
};


const Login = () => {
    const navigation = useNavigation()
    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState("");
    const [confirm, setConfirm] = useState(null);
    const [loading, setLoading] = useState(false);
    const [codeLoading, setCodeLoading] = useState(false);
    const [pickerData, setPickerData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const { seconds, isActive, setIsActive } = useCountdown();

    const phoneRef = useRef(null);
      
    useEffect(() => {
        if (phoneRef.current) {
            setPickerData(phoneRef.current.getPickerData());
        }
    }, []);

    const onPressFlag = () => {
        if (phoneRef.current) {
            phoneRef.current.focus();
        }
    };

    const selectCountry = () => {
        const countryCode = phoneRef.current.getValue();
        setSelectedCountry(countryCode);
    };

    const isButtonDisabled = !phoneNumber || loading;

    const signInWithPhoneNumber = async () => {
        setLoading(true);
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
        } catch (error) {
            showMessage({
                message: "Error sending code",
                description: error.message || 'Failed to send verification code.',
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

    const confirmCode = async () => {
        setCodeLoading(true)
        try {
            const userCredential = await confirm.confirm(code);
            const user = userCredential.user;

            //check if the user is new or existing
            const userDocument = await firestore()
                .collection("users")
                .doc(user.uid)
                .get();
            
                if (userDocument.exists) {
                    //user is existing, navigate to Dashboard
                    navigation.navigate("Dashboard")
                } else {
                    //user is new, naviagte to register
                    navigation.navigate("Register", { uid: user.uid});
                }
        } catch (error) {
            showMessage({
                message: "Invalid code",
                description: error.message || 'The code entered is incorrect.',
                type: "danger",
                floating: true,
                icon: "info",
                duration: 5000,
                style: {
                    marginTop: "10%",
                },
            });
        }
        setCodeLoading(false)
    }

    const otpVerification = () => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;

        const handleClick = () => setIsActive(true);

        return (
            <View style={styles.otpTextWrapper}>
                <Text style={[styles.otpText, styles.spacing]}>Didn't receive the OTP?</Text>
                {isActive ? (
                    <Text style={styles.secondOtpText}>
                        {`${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}
                    </Text>
                ) : (
                    <TouchableOpacity onPress={handleClick}>
                        <Text style={styles.secondOtpText}>Click here to resend</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const token = await messaging().getToken();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
            console.log('Device FCM Token:', token);
            return token;
        }
    };

    useEffect(() => {
        if (requestUserPermission()) {
            messaging()
            .getToken()
            .then((token) => {
                console.log(token);
            });
        } else {
            console.log("Permission not granted", authStatus);
        }

        //check whether an initial notification is available
        messaging()
        .getInitialNotification()
        .then(async (remoteMessage) => {
            if (remoteMessage) {
                console.log(
                    "Notification caused app to open from quit state:",
                    remoteMessage.notification
                );
            }
        });

        //assume a message-notification contains a "type" property in the payload 
        messaging().onNotificationOpenedApp((remoteMessage) => {
            console.log(
                "Notification caused app to open from background state:",
                remoteMessage.notification
            );
        });

        //register background handler
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            console.log("Message handled in the background!", remoteMessage);
        });

        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
        });

        return unsubscribe;
    }, []);
      
    return (
        <View style={styles.container}>
            <ScreenHeader/>
            {!confirm ? (
                <>
                    <Header topHeading={"Login to Dashboard"}/>
                    <View style={styles.wrapper}>
                        <Text style={styles.label}>Phone Number</Text>
                        <View style={styles.inputContainer}>
                            <PhoneInput
                                ref={(ref) => { this.phone = ref; }}
                                onPressFlag={this.onPressFlag}
                                style={styles.input}
                                initialCountry="ng"
                                textStyle={{ color: "#000" }}
                                onChangePhoneNumber={(e) => setPhoneNumber(e)}
                            />
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            title={"Send Code"}
                            disabled={isButtonDisabled}
                            onPress={signInWithPhoneNumber}
                            loading={loading}
                        />
                    </View>
                </>
            ) : (
                <>
                    <View>
                        <Header
                            topHeading={<Text style={styles.topText}>OTP Verification</Text>}
                            subHeading={<Text style={styles.bottomText}>We sent an (OTP) to {phoneNumber}</Text>}
                        />

                        <PinInput value={code} setValue={setCode} cellCount={6} />
                        <Header subHeading={otpVerification()} />

                        <Button 
                            title={'Submit'} 
                            disabled={code.length !== 6} 
                            onPress={confirmCode} 
                            loading={codeLoading}
                        />
                    </View>
                </>
            )}
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    wrapper: {
        paddingTop: 20,
        marginBottom: 20,
        paddingHorizontal: 20
    },
    label: {
        marginBottom: 5,
        fontWeight: '400',
        fontSize: 14,
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.secondary,
        height: 52,
        paddingLeft: 10,
    },
    input: {
        height: 52,
        textAlignVertical: 'center',
        paddingHorizontal: 5,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        paddingBottom: 20
    },
    topText: {
        fontSize: 24,
        fontWeight: "500",
        fontFamily: "Inter-Medium"
    },
    bottomText: {
        fontSize: 16,
        fontWeight: "400",
        color: "#666666",
        fontFamily: "Inter-Light"
    },
    otpTextWrapper: {
        flexDirection: "row",
        marginTop: -40
    },
    otpText: {
        fontSize: 16,
        fontWeight: "400",
        color: "grey",
    },
    secondOtpText: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.primary,
    },
})
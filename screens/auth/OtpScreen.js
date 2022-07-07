import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    TextInput
} from 'react-native'
import React, { Component, useState, useContext } from 'react'
import { Colors, Fonts, Sizes } from "../../constant/style";
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import AuthService from '../Service/AuthService';

const OtpScreen = ({ route, navigation }) => {
    const [Otp, setOTP] = useState('')
    const [loader, setLoader] = useState(false)
    let mobNum = route.params.num
    console.log(mobNum);
    const { authContext, AppUserData } = useContext(AuthContext);
    const VerifyOtp = () => {
        // setLoader(true)
        let data = {
            "user_mobile_number": mobNum,
            "user_otp": Otp
        }
        console.log("data", data);

        AuthService.Post('verify_otp', data)
            .then(Response => {
                setLoader(false)
                console.log("response", Response)
                if (Response.status === "success") {
                    authContext.signIn({
                        data: Response.data[0]
                    })
                    // navigation.navigate('HomeScreen');
                }
                else {
                    Alert.alert(Response.message)
                }
            })
            .catch(error => {
                setLoader(false)
                console.log(error);
            })

    }

    const moveTo = () => {
        if (Otp.length == 4) {
            VerifyOtp()
            // navigation.navigate('HomeScreen');
            // setTimeout(() => {
            //     navigation.navigate('HomeScreen');
            // }, 1000)
        }
        else {
            alert("Please enter All Value")
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            {loader == true ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>

                    <ActivityIndicator size={'large'} color={Colors.themeColor} />
                </View>
            )
                : (
                    <>
                        <StatusBar backgroundColor={Colors.themeColor} />
                        <View style={{ width: '100%' }}>
                            <Image
                                source={require('../../Assets/images/banner/graphic.png')}
                                style={{ width: 200, height: 200, resizeMode: "contain", position: 'absolute', right: -30, }} />
                            <AntDesign name="arrowleft" size={24} color="black" style={{ padding: 20, }} onPress={() => { navigation.goBack() }} />
                        </View>

                        <Image
                            source={require('../../Assets/images/banner/logo-top.jpg')}
                            style={styles.appLogoStyle}
                            resizeMode='contain'
                        />


                        <Text style={{
                            ...Fonts.grayColor18Bold,
                            textAlign: 'center',
                            lineHeight: 25
                            // ...Fonts.blackColor18Bold,
                            // textAlign: 'center',

                        }}>
                            
                             Please enter the 4-digit code sent {'\n'} to your mobile number ({mobNum})
                        </Text>

                        <View style={styles.inputContainer}>
                            {/* <TextInput> */}
                            <SmoothPinCodeInput
                                placeholder=""
                                editable={true}
                                autoFocus={true}
                                cellStyle={{
                                    borderRadius: 8,
                                    borderWidth: 2,
                                    borderColor: '#fff',
                                    backgroundColor: '#fff',
                                    shadowColor: '#F87B2C',
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 1.25,
                                    shadowRadius: 8.84,

                                    elevation: 8,
                                }}
                                cellStyleFocused={{
                                    borderColor: Colors.themeColor,
                                }}
                                cellSpacing={15}
                                codeLength={4}
                                value={Otp}
                                onTextChange={(txt) => setOTP(txt)}
                                textStyle={{ color: Colors.themeColor, fontSize: 24 }}
                            />
                            {/* </TextInput> */}
                        </View>

                        <View style={styles.butoonContainer}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text>Didn’t receive the otp code! </Text>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('LoginScreen');
                                }}><Text style={{
                                    ...Fonts.blackColor18Bold,
                                }}>Resend</Text></TouchableOpacity>
                            </View>
                            <LinearGradient
                                colors={['#F9B551', '#F87B2C']}
                                style={[styles.continueButtonStyle,{paddingVertical:10,marginTop:5}]}>
                                <TouchableOpacity
                                    onPress={() => { moveTo() }}>
                                    <Text style={{ ...Fonts.whiteColor16Bold, textAlign: 'center' }}>Continue</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </>
                )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({


    continueButtonStyle: {
        paddingHorizontal: 20,
        paddingVertical:5,
        backgroundColor: Colors.primaryColor,
        minWidth: '30%',
        alignSelf: "flex-end",
        borderRadius: 25,
    },
    appLogoStyle: {
        width: 180.0,
        height: 180.0,
        justifyContent: 'center',
        resizeMode: 'contain',
        position: 'relative',
        alignSelf: 'center'
    },
    inputContainer: {
        width: '90%',
        marginVertical: 50,
        justifyContent: 'space-around',
        alignSelf: 'center',
        alignItems: 'center'
    },
    butoonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        justifyContent: 'space-between'
    },

})

export default OtpScreen
import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    ImageBackground,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native'
import React, { Component, useState } from 'react'
import { Colors, Fonts, Sizes } from "../../constant/style";
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'

const LoginScreen = ({ navigation }) => {

    const SignInSchema = Yup.object().shape({
        mobileNumber: Yup.string()
            // .matches(phoneRegExp, 'Phone number is not valid')
            .min(10, 'min 10 digit is require ')
            .max(10, 'max 10 digit allowed')
            .required('Mobile Number Is Required To Continue')
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.themeColor} />
            <Image
                source={require('../../Assets/images/banner/graphic.png')}
                style={{ width: 200, height: 200, resizeMode: "contain", position: 'absolute', right: -30, }} />
            <Image
                source={require('../../Assets/images/banner/logo-top.jpg')}
                style={styles.appLogoStyle}
                resizeMode='contain'/>

            {/* SignIn Text */}

            <Text style={{
                ...Fonts.grayColor18Bold,
                textAlign: 'center',
                marginTop: 60
            }}>
                Signin with phone number
            </Text>

            {/* Input */}
            <Formik
                validationSchema={SignInSchema}
                initialValues={{ mobileNumber: '' }}
                onSubmit={values => {
                    console.log(values);
                    if (values) {
                        navigation.navigate('OtpScreen')
                    }
                    else {
                        alert("something went wrong")
                        return;
                    }
                }}>
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isValid,
                }) => (
                    <View>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Phone Number"
                            keyboardType='phone-pad'
                            onChangeText={handleChange('mobileNumber')}
                            onBlur={handleBlur('mobileNumber')}
                            value={values.mobileNumber}
                        />
                        {errors.mobileNumber && touched.mobileNumber && (
                            <View
                                style={{
                                    width: '90%',
                                    alignSelf: 'center',
                                    paddingTop: 10,
                                }}>
                                <Text style={{ fontSize: 12, color: 'red' }}>
                                    {errors.mobileNumber}
                                </Text>
                            </View>
                        )}
                        <LinearGradient
                            colors={['#F9B551', '#F87B2C']}
                            style={styles.continueButtonStyle}>
                            <TouchableOpacity
                                onPress={() =>
                                    handleSubmit()}>
                                <Text style={{ ...Fonts.whiteColor16Bold }}>Continue</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                )}
            </Formik>

            {/* OTP Text */}

            <Text style={{
                ...Fonts.blackColor16Bold,
                textAlign: 'center',
                marginTop: 35
            }}>
                We’ll send otp for verification
            </Text>

            {/* Facebook and Google Buttons */}

            {/* <TouchableOpacity style={styles.loginWithGoogleButtonStyle}>
                <Image
                    source={require('../../Assets/images/google.jpg')}
                    style={{ width: 30.0, height: 30.0, }}
                />
                <Text style={{ ...Fonts.blackColor16Bold, marginLeft: Sizes.fixPadding * 2.0 }}>
                    Continue with Google
                </Text>
                <AntDesign name="arrowright" size={24} color="#000" />
            </TouchableOpacity >
            <TouchableOpacity style={styles.loginWithGoogleButtonStyle}>
                <Image
                    source={require('../../Assets/images/facebook.jpg')}
                    style={{ width: 30.0, height: 30.0, }}
                />
                <Text style={{ ...Fonts.blackColor16Bold, marginLeft: Sizes.fixPadding * 2.0 }}>
                    Continue with Facebook
                </Text>
                <AntDesign name="arrowright" size={24} color="#000" />
            </TouchableOpacity> */}

            {/* End */}
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({

    textInput: {
        backgroundColor: Colors.whiteColor,
        marginTop: 30,
        padding: 15,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    mobileNumberWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderRadius: 40,
        marginHorizontal: Sizes.fixPadding * 2.0,
        height: 55.0,
        marginBottom: Sizes.fixPadding * 2.0,
        borderColor: 'rgba(128,128,128,0.12)',

    },
    loginWithGoogleButtonStyle: {
        flexDirection: 'row',
        width: "90%",
        alignSelf: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#3B5998',
        backgroundColor: Colors.whiteColor,
        borderRadius: 25,
        marginTop: Sizes.fixPadding * 2.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    continueButtonStyle: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: Colors.primaryColor,
        maxWidth: '50%',
        alignSelf: "flex-end",
        borderRadius: 25,
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    appLogoStyle: {
        width: 180.0,
        height: 180.0,
        alignSelf: 'center',
        resizeMode: 'contain',
        position: 'relative',
        top: 70

    }
})

export default LoginScreen

{/*  */ }
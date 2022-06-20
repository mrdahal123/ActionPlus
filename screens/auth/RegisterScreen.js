import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import React, { Component, useState } from 'react'
import { Colors, Fonts, Sizes } from "../../constant/style";
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import CustomTextInput from '../../Components/CustomTextInput';

const RegisterScreen = ({ navigation }) => {
    const RegisterSchema = Yup.object().shape({
        UserName: Yup.string()
        .required('UserName Is Required To Continue'),
        email:Yup.string()
        .required("email address is required")
        .matches(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
          password:Yup.string()
          .required("Password is required")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          ),
          confirmPassword:Yup.string()
          .required("confirm password is required")
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.themeColor} />
            <ScrollView style={{ flex: 1, }}>
            <Image
                source={require('../../Assets/images/banner/graphic.png')}
                style={{ width: 200, height: 200, resizeMode: "contain", position: 'absolute', right: -30, }} />
                    <AntDesign name="arrowleft" size={24} color="black" style={{ padding: 20 }} onPress={() => { navigation.goBack() }} />
                    <Image
                        source={require('../../Assets/images/banner/logo-top.jpg')}
                        style={styles.appLogoStyle}
                        resizeMode="contain"
                    />
                    <Text style={{
                        ...Fonts.blackColor18Bold,
                        textAlign: 'center',
                    }}>
                        Register Your Account
                    </Text>
                   
            <Formik
                validationSchema={RegisterSchema}
                initialValues=
                {{
                     UserName: 'saurav',
                     email:'Saurav@gmail.com',
                     password:'Saurav@123',
                     confirmPassword:'Saurav@123',
                     }}
                onSubmit={values => {
                    console.log(values);
                    if(values){
                        navigation.navigate('OtpScreen')
                    }
                    else{
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
                    <CustomTextInput
                        icon={require('../../Assets/images/banner/name.png')}
                        placeholder="User Name"
                        value={values.UserName}
                        onChangeText={handleChange('UserName')}
                        onBlur={handleBlur('UserName')}
                        isErrors={errors.UserName}
                        isTouched={touched.UserName}
                    />

                    <CustomTextInput
                        icon={require('../../Assets/images/banner/email.png')}
                        placeholder="email"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        isErrors={errors.email}
                        isTouched={touched.email}
                    />

                    <CustomTextInput
                        icon={require('../../Assets/images/banner/password.png')}
                        placeholder="password"
                        value={values.password}
                        type='password'
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        isErrors={errors.password}
                        isTouched={touched.password}
                    />

                    <CustomTextInput
                        icon={require('../../Assets/images/banner/password.png')}
                        placeholder="Confirm password"
                        value={values.confirmPassword}
                        type='password'
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        isErrors={errors.confirmPassword}
                        isTouched={touched.confirmPassword}
                    />

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
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    // textInput: {
    //     backgroundColor: Colors.whiteColor,
    //     marginTop: 30,
    //     padding: 15,
    //     width: '90%',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignSelf: 'center',
    //     alignItems: 'center',
    //     borderRadius: 25,
    //     shadowColor: "#000",
    //     shadowOffset: {
    //         width: 0,
    //         height: 5,
    //     },
    //     shadowOpacity: 0.34,
    //     shadowRadius: 6.27,

    //     elevation: 10,
    // },
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
        position: 'relative'

    }
})

export default RegisterScreen


//    style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff', }}
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal,
    Pressable,
    onPress,
    Alert,
    ImageBackground
} from 'react-native'
import React, { Component, useState, useContext, useEffect } from 'react'
import { Colors, Fonts, Sizes } from "../../constant/style";
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { styles } from './EditProfile.style'
import CustomTextInput from '../../Components/CustomTextInput';
import ImagePicker from 'react-native-image-crop-picker';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../Context/AuthContext';
import { ActivityIndicator } from 'react-native-paper';
import AuthService from '../Service/AuthService';
import GlobalButton from '../../Components/GlobalButton';

const EditProfile = ({ route, navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState('');
    const [localImage, setLocalImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false)
    const [loader, setLoader] = useState(false)
    const [userAllDetails, setUserAllDetails] = useState()

    const { authContext, appState } = useContext(AuthContext);
    const userProfile = route.params.data

    console.log("alldetails", userProfile)



    const SignInSchema = Yup.object().shape({
        name: Yup.string()
            .required('Please enter first name'),
        lastName: Yup.string()
            .required('Please enter last name'),
        email: Yup.string()
            .required('Please enter email'),
        mobileNumber: Yup.string()
            .required('Please enter mobileNumber')
    });

    const EditProfileApi = async (apiData) => {

        setLoader(true)
        try {
            let response = await AuthService.Post('edit_user_profiles', apiData);
            console.log('EditProfileApi response', response);
            setLoader(false)
            if (response.status === "success") {
                // authContext.signIn({
                //     data: response.data
                // })
                getProfileApi()
                navigation.navigate("HomeScreen")
            }
            else {
                Alert.alert(Response.message)
            }
            console.log("EditProfileApi", apiData);
        } catch (error) {
            setLoader(false)
            alert("image size is too large please select another one")
            console.log("Data", error);
            console.log("EditProfileApi", apiData);
        }
    }


    const getProfileApi = async () => {

        setLoader(true)
        let apiData = {
            "user_mobile_number": appState.data.user_mobile_number
        }
        console.log("getProfileApi", apiData);
        try {
            let response = await AuthService.Post('get_user_by_phone_number', apiData);
            console.log('getProfileApi response', response.data[0]);
            setLoader(false)
            setUserAllDetails(response.data[0])
        } catch (error) {
            setLoader(false)
            console.log("Data", error);
        }
    }

    const pickImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            console.log('image', image);
            setImage(image.data)
            setLocalImage(image.path)
            setModalVisible(false);
        });
    };

    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            console.log(image);
            setImage(image.data)
            setLocalImage(image.path)
            setModalVisible(false);
        });
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            {loader == true ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <ActivityIndicator size={30} color={Colors.themeColor} />
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    <View style={{ height: '25%', backgroundColor: Colors.themeColor, flexDirection: 'row', alignItems: 'flex-start', padding: 10 }}>
                        <AntDesign name="arrowleft" size={24} color="black" style={{ padding: 2, }} onPress={() => { navigation.goBack() }} />
                        <Text style={{ ...Fonts.blackColor20Bold, marginLeft: '30%',color:'#fff' }}>Edit profile</Text></View>
                    <View style={{ position: 'absolute', bottom: 0, top: '5%', alignSelf: 'center', zIndex: 100 }}>
                        {localImage == '' && appState.data.user_image == '' ? (
                            <Image source={require('../../Assets/images/banner/user.png')} style={styles.profile} />

                        ) : <Image source={{
                            uri:
                                localImage !== '' ? localImage : `data:image/jpeg;base64, ${userProfile.user_image}`
                        }} style={styles.profile} />
                        }
                        <TouchableOpacity onPress={() => { setModalVisible(true) }} style={styles.cameraIcon}>

                            <FontAwesome5 name="camera" size={24} color="#fff" />
                        </TouchableOpacity>

                    </View>
                    <View style={{ width: '90%', alignSelf: 'center', backgroundColor: '#fff', flexGrow: 1, position: 'absolute', bottom: 0, top: '15%', borderRadius: 20 }} />
                    <Modal transparent={true} visible={modalVisible}>
                        <Pressable
                            onPress={() => {
                                setModalVisible(false);
                            }}
                            style={{
                                backgroundColor: '#000000aa',
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <View
                                style={{
                                    backgroundColor: '#fff',
                                    padding: 20,
                                    borderRadius: 15,
                                    width: '90%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <LinearGradient
                                        colors={['#F9B551', '#F87B2C']}
                                        style={[styles.continueButtonStyle, { minWidth: '40%', justifyContent: 'space-between' }]}>
                                        <TouchableOpacity
                                            onPress={() => { pickImage() }}>
                                            <Text style={{ ...Fonts.whiteColor16Bold }}>Gallery</Text>
                                        </TouchableOpacity>
                                        <FontAwesome name="photo" size={24} color='#fff' />
                                    </LinearGradient>
                                    <LinearGradient
                                        onPress={() => { openCamera() }}
                                        colors={['#F9B551', '#F87B2C']}
                                        style={[styles.continueButtonStyle, { minWidth: '40%', justifyContent: 'space-between', }]}>
                                        <TouchableOpacity
                                            onPress={() => { openCamera() }}>
                                            <Text style={{ ...Fonts.whiteColor16Bold }}>Camera</Text>
                                        </TouchableOpacity>
                                        <FontAwesome5 name="camera" size={24} color="#fff" onPress={() => { openCamera() }} />
                                    </LinearGradient>
                                </View>
                            </View>
                        </Pressable>
                    </Modal>

                    <Formik
                        validationSchema={SignInSchema}
                        initialValues={{
                            name: userProfile && userProfile.first_name ? userProfile.first_name : '',
                            lastName: userProfile && userProfile.last_name ? userProfile.last_name : '',
                            email: userProfile && userProfile.user_email ? userProfile.user_email : '',
                            mobileNumber: userProfile && userProfile.user_mobile_number ? userProfile.user_mobile_number.toString() : '',

                        }}
                        onSubmit={values => {

                            console.log(values);
                            if (values) {
                                let imagePth = (image == '' && userProfile.user_image) ? userProfile.user_image : (image !== '') ? image : '';
                                let apiData = {
                                    "first_name": values.name,
                                    "last_name": values.lastName,
                                    "user_image": imagePth,
                                    "user_email": values.email,
                                    "user_mobile_number": values.mobileNumber,
                                }
                                EditProfileApi(apiData)
                                // navigation.navigate('OtpScreen')
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
                                <CustomTextInput
                                    icon={require('../../Assets/images/banner/name.png')}
                                    placeholder="First Name"
                                    placeholderTextColor={'#000'}
                                    value={values.name}
                                    onChangeText={
                                        handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    isErrors={errors.name}
                                    isTouched={touched.name}
                                />

                                <CustomTextInput
                                    icon={require('../../Assets/images/banner/name.png')}
                                    placeholder="Last Name"
                                    placeholderTextColor={'#000'}
                                    value={values.lastName}
                                    onChangeText={
                                        handleChange('lastName')}
                                    onBlur={handleBlur('lastName')}
                                    isErrors={errors.lastName}
                                    isTouched={touched.lastName}
                                    
                                />

                                <CustomTextInput
                                    icon={require('../../Assets/images/banner/email.png')}
                                    placeholder="Email"
                                    placeholderTextColor={'#000'}
                                    value={values.email}
                                    keyboardType={'email-address'}
                                    onChangeText={
                                        handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    isErrors={errors.email}
                                    isTouched={touched.email}
                                />

                                <CustomTextInput
                                    icon={require('../../Assets/images/banner/phone.png')}
                                    placeholder="Phone Number"
                                    placeholderTextColor={'#000'}
                                    value={values.mobileNumber}
                                    onChangeText={
                                        handleChange('mobileNumber')}
                                    onBlur={handleBlur('mobileNumber')}
                                    keyboardType={'number-pad'}
                                    isErrors={errors.mobileNumber}
                                    isTouched={touched.mobileNumber}
                                />  
                                <GlobalButton title={"Save"} onPress={() =>{handleSubmit()}} inlineStyle={{marginRight:20,marginTop:20}} />
                            </View>
                        )}
                    </Formik>

                   
                </View>
            )}
        </SafeAreaView>
    )
}

export default EditProfile


import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal
} from 'react-native'
import React, { Component, useState } from 'react'
import { Colors, Fonts, Sizes } from "../../constant/style";
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { styles } from './EditProfile.style'
import CustomTextInput from '../../Components/CustomTextInput';
// import ImagePicker from 'react-native-image-crop-picker';

const EditProfile = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false)

    // const pickImage = {
    //     ImagePicker.openPicker({
    //         width: 300,
    //         height: 400,
    //         cropping: true
    //     }).then(image => {
    //         console.log(image);

    //         setImage(image)
    //     });
    // };

    // const openCamera = {
    //     ImagePicker.openCamera({
    //         width: 300,
    //         height: 400,
    //         cropping: true,
    //     }).then(image => {
    //         console.log(image);
    //         setImage(image)
    //     });
    // }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <ScrollView>

                <View>
                    <Text style={{ ...Fonts.blackColor24Bold, textAlign: 'center', marginTop: 80 }}>Edit profile</Text>
                    {image == '' ? (
                        <Image source={require('../../Assets/images/user/user_6.jpg')} style={styles.profile} />
                    ) : <Image source={{ uri: image }} style={styles.profile} />}

                    <TouchableOpacity onPress={() => { setModalVisible(true) }} style={styles.cameraIcon}>

                        <FontAwesome5 name="camera" size={24} color="#fff" />
                    </TouchableOpacity>

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
                                    <TouchableOpacity onPress={()=>{pickImage()}}>Gallery</TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{openCamera()}}>Camera</TouchableOpacity>
                                </View>
                        </Pressable>
                    </Modal>

                </View>
                <CustomTextInput
                    icon={require('../../Assets/images/banner/name.png')}
                    placeholder="User Name"
                    value={name}
                    onChangeText={(text) => {
                        setName(text)
                    }}
                // isErrors={errors.email}
                // isTouched={touched.email}
                />

                <CustomTextInput
                    icon={require('../../Assets/images/banner/email.png')}
                    placeholder="Email"
                    value={email}
                    keyboardType={'email-address'}
                    onChangeText={(text) => {
                        setEmail(text)
                    }}
                // isErrors={errors.email}
                // isTouched={touched.email}
                />
                <CustomTextInput
                    icon={require('../../Assets/images/banner/phone.png')}
                    placeholder="Phone Number"
                    value={phone}
                    onChangeText={(text) => {
                        setPhone(text)
                    }}
                // isErrors={errors.email}
                // isTouched={touched.email}
                />
                <CustomTextInput
                    icon={require('../../Assets/images/banner/password.png')}
                    placeholder="Phone Number"
                    value={phone}
                    onChangeText={(text) => {
                        setPhone(text)
                    }}
                // isErrors={errors.email}
                // isTouched={touched.email}
                />

                <LinearGradient
                    colors={['#F9B551', '#F87B2C']}
                    style={styles.continueButtonStyle}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('HomeScreen')}>
                        <Text style={{ ...Fonts.whiteColor16Bold }}>Save</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditProfile


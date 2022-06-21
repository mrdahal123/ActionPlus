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
    FlatList,
} from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors, Fonts, Sizes } from "../../constant/style";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomTextInput from '../../Components/CustomTextInput';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


const AddnewAddress = ({ navigation }) => {

    const EditAddress = Yup.object().shape({
        FirstName: Yup.string()
            .required('Please enter your first name'),
        LastName: Yup.string()
            .required("enter your last name please"),
        PhoneNumber: Yup.string()
            .required("enter your mobile number please")
            .max(10, "maximum 10 digit please")
            .min(10, 'mobile Number must be minimum 10 digit'),
        email: Yup.string()
            .required("email address is required")
            .matches(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ),
        houseNo: Yup.string()
            .required("Confirm Your house/ Flat / Floor No Please"),
        socitey: Yup.string()
            .required("confirm Your Society/ Streat Name Please"),
        area: Yup.string()
            .required("confirm your Area Please"),
        city: Yup.string()
            .required("enter your city name please "),
        pinCode: Yup.string()
            .required("provide your city pin code please ")
            .max(6, "max six digit allow for pim code")
            .min(6, "PinCode Should be minimum 6 digit"),
        state: Yup.string()
            .required("confirm Your State Name please"),
        addType: Yup.string()
            .required("select your address type")
    });
    const type = [
        {
            id: "1",
            addressType: "Home",
        },
        {
            id: "2",
            addressType: "Work",
        },
        {
            id: "3",
            addressType: "Other",
        },
    ]
    // const [addType, setAddType] = useState('')
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            {/* <View style={{width:'90%',flexDirection:'row',alignSelf:'center',}}> 
            <AntDesign name="arrowleft" size={24} color="black" style={{ marginTop: 30, }} onPress={() => {navigation.goBack()}} />
            <Text>Edit Address</Text>
           </View> */}

            <ScrollView style={{ flex: 1, }}>
                <Formik
                    validationSchema={EditAddress}
                    initialValues=
                    {{
                        FirstName: '',
                        LastName: '',
                        PhoneNumber: '',
                        email: '',
                        houseNo: '',
                        socitey: '',
                        area: '',
                        city: '',
                        pinCode: '',
                        state: '',
                        addType: '',
                    }}
                    onSubmit={values => {


                        if (values) {
                            navigation.navigate('SelectAdd', {
                                data: values
                            });
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
                        setFieldValue,
                        values,
                        errors,
                        touched,
                        isValid,
                    }) => (
                        <>
                            <CustomTextInput
                                icon={ <FontAwesome5 name="user-alt" size={24} color="black" />}
                                placeholder="Confirm password"
                                value={values.confirmPassword}
                                iconType='icon'
                                type='password'
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                isErrors={errors.confirmPassword}
                                isTouched={touched.confirmPassword}
                            />
                            {/* <View style={styles.textInput}>
                                <FontAwesome5 name="user-alt" size={24} color="black" />
                                <TextInput
                                    style={{ marginLeft: 10, width: '90%' }}
                                    placeholder="First Name"
                                    value={values.FirstName}
                                    onChangeText={
                                        handleChange('FirstName')
                                    }
                                    onBlur={handleBlur('FirstName')}
                                />
                            </View> */}
                            {errors.FirstName && touched.FirstName && (
                                <View
                                    style={{
                                        width: '90%',
                                        alignSelf: 'center',
                                        paddingTop: 10,
                                    }}>
                                    <Text style={{ fontSize: 12, color: 'red' }}>
                                        {errors.FirstName}
                                    </Text>
                                </View>
                            )}
                            <View style={styles.textInput}>
                                <FontAwesome5 name="user-alt" size={24} color="black" />
                                <TextInput
                                    style={{ marginLeft: 10, width: '90%' }}

                                    placeholder="Last Name"
                                    value={values.LastName}
                                    onChangeText={
                                        handleChange('LastName')
                                    }
                                    onBlur={handleBlur('LastName')}
                                />
                            </View>
                            {errors.LastName && touched.LastName && (
                                <View
                                    style={{
                                        width: '90%',
                                        alignSelf: 'center',
                                        paddingTop: 10,
                                    }}>
                                    <Text style={{ fontSize: 12, color: 'red' }}>
                                        {errors.LastName}
                                    </Text>
                                </View>
                            )}
                            <View style={styles.textInput}>
                                <FontAwesome5 name="phone-alt" size={24} color="black" />
                                <TextInput
                                    style={{ marginLeft: 10, width: '90%' }}

                                    placeholder="Phone Number"
                                    value={values.PhoneNumber}
                                    onChangeText={
                                        handleChange('PhoneNumber')
                                    }
                                    onBlur={handleBlur('PhoneNumber')}
                                />
                            </View>
                            {errors.PhoneNumber && touched.PhoneNumber && (
                                <View
                                    style={{
                                        width: '90%',
                                        alignSelf: 'center',
                                        paddingTop: 10,
                                    }}>
                                    <Text style={{ fontSize: 12, color: 'red' }}>
                                        {errors.PhoneNumber}
                                    </Text>
                                </View>
                            )}
                            <View style={styles.textInput}>
                                <MaterialCommunityIcons name="email-multiple" size={24} color="black" />
                                <TextInput
                                    style={{ marginLeft: 10, width: '90%' }}

                                    placeholder="Email Address"
                                    value={values.email}
                                    onChangeText={
                                        handleChange('email')
                                    }
                                    onBlur={handleBlur('email')}
                                />
                            </View>
                            {errors.email && touched.email && (
                                <View
                                    style={{
                                        width: '90%',
                                        alignSelf: 'center',
                                        paddingTop: 10,
                                    }}>
                                    <Text style={{ fontSize: 12, color: 'red' }}>
                                        {errors.email}
                                    </Text>
                                </View>
                            )}
                            <View style={styles.textInput}>
                                <FontAwesome5 name="house-user" size={24} color="black" />
                                <TextInput
                                    style={{ marginLeft: 10, width: '90%' }}

                                    placeholder="House No / Flat No / Floor "
                                    value={values.houseNo}
                                    onChangeText={
                                        handleChange('houseNo')
                                    }
                                    onBlur={handleBlur('houseNo')}
                                />
                            </View>
                            {errors.houseNo && touched.houseNo && (
                                <View
                                    style={{
                                        width: '90%',
                                        alignSelf: 'center',
                                        paddingTop: 10,
                                    }}>
                                    <Text style={{ fontSize: 12, color: 'red' }}>
                                        {errors.houseNo}
                                    </Text>
                                </View>
                            )}
                            <View style={styles.textInput}>
                                <MaterialCommunityIcons name="sign-direction" size={24} color="black" />
                                <TextInput
                                    style={{ marginLeft: 10, width: '90%' }}

                                    placeholder="Society /Street Name"
                                    value={values.socitey}
                                    onChangeText={
                                        handleChange('socitey')
                                    }
                                    onBlur={handleBlur('socitey')}
                                />
                            </View>
                            {errors.socitey && touched.socitey && (
                                <View
                                    style={{
                                        width: '90%',
                                        alignSelf: 'center',
                                        paddingTop: 10,
                                    }}>
                                    <Text style={{ fontSize: 12, color: 'red' }}>
                                        {errors.socitey}
                                    </Text>
                                </View>
                            )}
                            <View style={styles.textInput}>
                                <Ionicons name="location-sharp" size={24} color="black" />
                                <TextInput
                                    style={{ marginLeft: 10, width: '90%' }}

                                    placeholder="Area"
                                    value={values.area}
                                    onChangeText={
                                        handleChange('area')
                                    }
                                    onBlur={handleBlur('area')}
                                />
                            </View>
                            {errors.area && touched.area && (
                                <View
                                    style={{
                                        width: '90%',
                                        alignSelf: 'center',
                                        paddingTop: 10,
                                    }}>
                                    <Text style={{ fontSize: 12, color: 'red' }}>
                                        {errors.area}
                                    </Text>
                                </View>
                            )}
                            <View style={{ width: '90%', flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between' }}>

                                <View style={[styles.textInput, { width: '45%' }]}>
                                    <FontAwesome5 name="city" size={24} color="black" />
                                    <TextInput
                                        style={{ marginLeft: 10, width: '40%' }}

                                        placeholder="City"
                                        value={values.city}
                                        onChangeText={
                                            handleChange('city')
                                        }
                                        onBlur={handleBlur('city')}
                                    />
                                </View>


                                <View style={[styles.textInput, { width: '45%' }]}>
                                    <Ionicons name="star-half-sharp" size={24} color="black" />
                                    <TextInput
                                        style={{ marginLeft: 10, width: '40%' }}

                                        placeholder="Pincode"
                                        value={values.pinCode}
                                        onChangeText={handleChange('pinCode')}
                                        onBlur={handleBlur('pinCode')}
                                    />

                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center' }}>


                                {errors.city && touched.city && (
                                    <View
                                        style={{
                                            width: '45%',
                                            alignSelf: 'center',
                                            paddingTop: 10,
                                        }}>
                                        <Text style={{ fontSize: 12, color: 'red' }}>
                                            {errors.city}
                                        </Text>
                                    </View>
                                )}
                                {errors.pinCode && touched.pinCode && (
                                    <View
                                        style={{
                                            width: '50%',
                                            alignSelf: 'center',
                                            paddingTop: 10,
                                        }}>
                                        <Text style={{ fontSize: 12, color: 'red' }}>
                                            {errors.pinCode}
                                        </Text>
                                    </View>
                                )}
                            </View>

                            <View style={styles.textInput}>
                                <FontAwesome5 name="font-awesome-flag" size={24} color="black" />
                                <TextInput
                                    style={{ marginLeft: 10, width: '90%' }}
                                    placeholder="State"
                                    value={values.state}
                                    onChangeText={
                                        handleChange('state')
                                    }
                                    onBlur={handleBlur('state')}
                                />
                            </View>
                            {errors.state && touched.state && (
                                <View
                                    style={{
                                        width: '90%',
                                        alignSelf: 'center',
                                        paddingTop: 10,
                                    }}>
                                    <Text style={{ fontSize: 12, color: 'red' }}>
                                        {errors.state}
                                    </Text>
                                </View>
                            )}


                            <View style={styles.checkButton}>

                                <LinearGradient
                                    colors={['#F9B551', '#F87B2C']}
                                    style={[styles.continueButtonStyle, { minWidth: 30, opacity: values.addType == 'Home' ? 1 : 0.7 }]}>
                                    <TouchableOpacity onPress={() => {
                                        setFieldValue('addType', 'Home')
                                    }
                                    }>
                                        <Text style={{ ...Fonts.whiteColor16Bold }}>Home</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                                <LinearGradient
                                    colors={['#F9B551', '#F87B2C']}
                                    style={[styles.continueButtonStyle, { minWidth: 30, opacity: values.addType == 'Work' ? 1 : 0.7 }]}>
                                    <TouchableOpacity onPress={() =>
                                        setFieldValue('addType', 'Work')
                                    }>
                                        <Text style={{ ...Fonts.whiteColor16Bold }}>Work</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                                <LinearGradient
                                    colors={['#F9B551', '#F87B2C']}
                                    style={[styles.continueButtonStyle, { minWidth: 30, opacity: values.addType == 'Other' ? 1 : 0.7 }]}>
                                    <TouchableOpacity onPress={() =>
                                        setFieldValue('addType', 'Other')
                                    }>
                                        <Text style={{ ...Fonts.whiteColor16Bold }}>Other</Text>
                                    </TouchableOpacity>
                                </LinearGradient>

                            </View>
                            {errors.addType && touched.addType && (
                                <View
                                    style={{
                                        width: '90%',
                                        alignSelf: 'center',
                                        paddingTop: 10,
                                    }}>
                                    <Text style={{ fontSize: 12, color: 'red' }}>
                                        {errors.addType}
                                    </Text>
                                </View>
                            )}

                            <LinearGradient
                                colors={['#F9B551', '#F87B2C']}
                                style={styles.continueButtonStyle}>
                                <TouchableOpacity onPress={(e) => {
                                    console.log('errors');
                                    console.log('errors', errors);
                                    handleSubmit(e)
                                }}>
                                    <Text style={{ ...Fonts.whiteColor16Bold }}>Save</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddnewAddress

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: Colors.whiteColor,
        marginTop: 30,
        marginBottom: 10,
        padding: 5,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 25,
        shadowColor: "#F9B551",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    continueButtonStyle: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        alignItems: 'center',
        minWidth: '30%',
        alignSelf: "flex-end",
        borderRadius: 25,
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    checkButton: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-around',
        alignSelf: 'center',
        marginVertical: 10,
    }
})


{/* Button */ }
// {type.map(item => {
//     return(
//     <View style={styles.checkButton}>
//     <LinearGradient
//         colors={['#F9B551', '#F87B2C']}
//         style={[styles.continueButtonStyle, { marginHorizontal: 5, minWidth: '25%' }]}>
//         <TouchableOpacity onPress={setAddType(item.addressType)}>
//             <Text style={{ ...Fonts.whiteColor16Bold }}>{item.addressType}</Text>
//         </TouchableOpacity>
//     </LinearGradient>
//         </View>
//     )
//    })}
//    <Text>{addType}</Text>
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
    Modal,
    Pressable,
    ActivityIndicator
} from 'react-native'
import React, { Component, useState, useEffect, useContext } from 'react'
import { Colors, Fonts, Sizes } from "../../constant/style";
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/FontAwesome5'
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';
import axios from "axios";
import AuthContext from '../../Context/AuthContext';
import * as ApiService from '../../Utils/Utils';
const SelectAdd = ({ navigation, route }) => {

    const { authContext, appState } = useContext(AuthContext);
    console.log(appState.data)
    let userData = appState.data

    let bookingData = route.params.data
    console.log("bookingData", bookingData);


    const [IsModalVisible, setIsModalVisible] = useState(false);
    const [existingData, setExistingData] = useState([]);
    const [editAddress, setEditAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [loader, setLoader] = useState(false)
    const [newData, setNewData] = useState([])
    const [FlatListData, setFlatListData] = useState([])
    const [existingFlatlistData, setExistingFlatlistData] = useState([])
    const [editText, setEditText] = useState('')

    const EditAddress = Yup.object().shape({
        FirstName: Yup.string()
            .required('Please enter your first name'),
        LastName: Yup.string()
            .required("Please enter your last name"),
        // PhoneNumber: Yup.string()
        //     .required("Please enter your mobile number")
        //     .max(10, "maximum 10 digit please")
        //     .min(10, 'mobile Number must be minimum 10 digit'),
        email: Yup.string()
            .required("Email address is required")
            .matches(
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                // /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ),
        houseNo: Yup.string()
            .required("Please enter your House No. /Flat No. /Floor"),
        socitey: Yup.string()
            .required("Please enter your Society / Street Name "),
        area: Yup.string()
            .required("Please enter your Area "),
        city: Yup.string()
            .required("Please enter your City "),
        pinCode: Yup.string()
            .required("Please enter your Pin Code ")
            .max(6, "max six digit allow for pim code")
            .min(6, "PinCode Should be minimum 6 digit"),
        state: Yup.string()
            .required("confirm Your State Name please"),
        addType: Yup.string()
            .required("Select the type of address")
    });

    const Address = async () => {
        setLoader(true)
        try {
            let response = await ApiService.PostMethode('address/get_address_by_phone_number', { "phone_number": userData });
            setLoader(false)
            console.log('existingData', response.data);
            setExistingData(response.data)
            response.data.map(item => {
                (
                    console.log("responseObject",item)
                )
            })
            
            setExistingFlatlistData(response.data)

        } catch (error) {
            setLoader(false)
        }
    }

    const AddAddress = async (apiData) => {
        setLoader(true)
        try {

            const response = await ApiService.PostMethode('address/add_customer_address', apiData)
            // setNewData(response.data)
            // {if(newData.length>0){
            //     const multipleAdd = newData.concat(existingData)
            //     setExistingData(multipleAdd)
            //     Address()
            // }}
            // setFlatListData([response.data])
            setIsModalVisible(false)
            Address();
            setLoader(false)
        } catch (error) {
            setLoader(false)
            setIsModalVisible(false)
            // setNewData([])
        }


    }
    const editAddressApi = async () => {
        setLoader(true)
        let data = {
            "id": selectedAddress._id,
            "first_name": selectedAddress.first_name,
            "last_name": selectedAddress.last_name,
            "phone_number": selectedAddress.phone_number,
            "email_address": selectedAddress.email_address,
            "house_number": selectedAddress.house_number,
            "street_name": selectedAddress.street_name,
            "area": selectedAddress.area,
            "city": selectedAddress.city,
            "pin_code": selectedAddress.pin_code,
            "address_type": selectedAddress.address_type,
        }
        console.log("editAddressdata", data);
        try {
            const response = await ApiService.PostMethode('address/edit_customers_address', data)

            console.log("editAddressData", response);

            setLoader(false)
            setIsModalVisible(false)
            setSelectedAddress('')
            // setExistingData([response?.data])
            setEditAddress([response?.data])
            // Address()
            // setIsModalVisible(false)

        } catch (error) {
            setLoader(false)
            console.log(error);
            setIsModalVisible(false)
        }

    }
    const BookingSuccess = (item) => {
        setLoader(true)
        let data = {
            "b_c_name": item.first_name,
            "b_c_time": bookingData.bookingTime,
            "b_c_date": bookingData.format,
            "service_provider_id": "",
            "service_provider_name": "",
            "b_c_service_id": "786545",
            "b_c_service_name": bookingData.serviceType,
            "b_c_seat_address": item.area,
            "b_c_city": item.city,
            "b_c_pin_code": item.pin_code,
            "b_c_floor": "5th",
            "b_c_flat_number":item.house_number,
            "b_c_state": item.b_c_state,
            "b_c_phone_number": item.phone_number,
            "b_c_amount": bookingData.finalPrice,
            "b_c_status": "0"

        }
        console.log("BookingSuccess", data);
        ApiService.PostMethode('bookings/add_bookings_customer', data)
            .then(response => {
                setLoader(false)
                console.log(response.status);
                if (response.status === "success") {
                    navigation.navigate("BookingSuccess")
                }
                else {
                    alert("something went wrong")
                }
            })
            .catch(error => {
                setLoader(false)
                console.log(error);

            })
    }

    console.log("selectedAddress",selectedAddress);
    useEffect(() => {
        Address()
    }, [])
    return (
        loader == true ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        ) : (
            <>
                <SafeAreaView style={{ flex: 1, }}>
                    {/* <StatusBar backgroundColor={Colors.primaryColor} /> */}
                    <ImageBackground
                        source={require('../../Assets/images/banner/background.png')}
                        style={{ flex: 1, padding: 10, backgroundColor: Colors.whiteColor }}>
                        <AntDesign name="arrowleft" size={24} color="black" style={{ marginTop: 30, }} onPress={() => {
                            navigation.goBack()
                        }} />

                        <Image
                            source={require('../../Assets/images/banner/logo-top.jpg')}
                            style={styles.appLogoStyle}
                            resizeMode="contain"
                        />

                        <Text style={{
                            ...Fonts.blackColor18Bold,
                            textAlign: 'center',
                            marginTop: 10
                        }}>
                            Select Address
                        </Text>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <FlatList
                                scrollEnabled={false}
                                data={ existingData}
                                keyExtractor={({ item, index }) => index}
                                renderItem={({ item, index }) => {
                                    return (
                                        <>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    BookingSuccess(item)
                                                    
                                                }}
                                                style={styles.AddContainer}>
                                                <Text style={{ textAlign: 'center' }}>Address Type {item.address_type}</Text>
                                                <View style={{ flexDirection: 'row', width: '60%', padding: 10 }}>
                                                    <FontAwesome name="user" size={24} color="black" />
                                                    <Text style={{ marginLeft: 10, color: "#000" }}>{item.first_name}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', width: '60%', padding: 10 }}>
                                                    <FontAwesome name="phone" size={24} color="black" />
                                                    <Text style={{ marginLeft: 10, color: "#000" }}>{item.phone_number}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', width: '60%', padding: 10 }}>
                                                    <Ionicons name="location-sharp" size={24} color="black" />
                                                    <Text style={{ marginLeft: 10, color: "#000" }}>{item.city} , {item.area} ,  {item.street_name}
                                                        , {item.pin_code}</Text>
                                                </View>
                                                <Feather name="edit" size={24} color={Colors.themeColor} style={{ alignSelf: 'flex-end', marginRight: 20 }} onPress={() => {
                                                    setIsModalVisible(true)
                                                    setEditText("edit")
                                                    setSelectedAddress(item)
                                                    console.log("setSelectedAddress",item);
                                                    // alert("working on this please wait for some time")
                                                }} />
                                            </TouchableOpacity>
                                        </>
                                    )
                                }}
                            />

                            <TouchableOpacity
                                onPress={() =>
                                    {setIsModalVisible(true)
                                    setEditText("Add")
                                console.log(editText);}
                                    // navigation.navigate('AddnewAddress')
                                }
                                style={[styles.AddContainer, { borderWidth: 1, borderStyle: 'dashed', alignItems: 'center', paddingVertical: 40 }]}>

                                <AntDesign name="plus" size={24} color="black" />
                                <Text>Add New Adress</Text>

                            </TouchableOpacity>

                        </ScrollView>

                        <Modal transparent={true} visible={IsModalVisible}>
                            
                            <ScrollView
                                style={{
                                    backgroundColor: '#000000aa',
                                    flex: 1,
                                }}>
                                <View
                                    style={{
                                        backgroundColor: '#fff',
                                        flex: 1,
                                        padding: 20,
                                        borderRadius: 0,
                                        width: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <AntDesign name="arrowleft" size={24} color="black" style={{ alignSelf: 'flex-start' }} onPress={() => {
                                        setIsModalVisible(false)
                                    }} />
                                    <Formik
                                        validationSchema={EditAddress}
                                        
                                        initialValues=
                                        {{
                                            FirstName: selectedAddress !=='' ? selectedAddress.first_name :'',
                                            LastName: selectedAddress !=='' ? selectedAddress.last_name: '',
                                            PhoneNumber:selectedAddress !=='' ? selectedAddress.phone_number:'',
                                            email: selectedAddress !=='' ? selectedAddress.email_address: '',
                                            houseNo:selectedAddress !=='' ? selectedAddress.house_number.toString(): '',
                                            socitey: selectedAddress !=='' ? selectedAddress.street_name: '',
                                            area:    selectedAddress !=='' ? selectedAddress.area:    '',
                                            city:    selectedAddress !=='' ? selectedAddress.city:    '',
                                            pinCode: selectedAddress !=='' ? selectedAddress.pin_code.toString(): '',
                                            state:   selectedAddress !=='' ? selectedAddress.state:    '',
                                            addType:   selectedAddress !=='' ? selectedAddress.address_type:   '',
                                        }}
                                        onSubmit={values => {
                                            if (values) {
                                                let apiData = {
                                                    first_name: values.FirstName,
                                                    last_name: values.LastName,
                                                    phone_number: userData,
                                                    email_address: values.email,
                                                    house_number: values.houseNo,
                                                    street_name: values.socitey,
                                                    area: values.area,
                                                    city: values.city,
                                                    pin_code: values.pinCode,
                                                    address_type: values.addType,
                                                }

                                                AddAddress(apiData)

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
                                            
                                                {editText == "Add" ? (


                                                    <Text style={{
                                                        ...Fonts.blackColor18Bold,
                                                        textAlign: 'center',
                                                        marginTop: 10
                                                    }}>Add Address</Text>
                                                ) : (

                                                   <>
                                                    <Text style={{
                                                        ...Fonts.blackColor18Bold,
                                                        textAlign: 'center',
                                                        marginTop: 10
                                                    }}> Edit Address</Text>
                                                    <Text>{JSON.stringify(selectedAddress)}</Text>
                                                    
                                                   </>
                                                )}
                                                <View style={styles.textInput}>
                                                    <FontAwesome5 name="user-alt" size={24} color="black" />
                                                    <TextInput
                                                        style={styles.inputStyle}
                                                        placeholderTextColor={'#000'}
                                                        placeholder="First Name"
                                                        value={values.FirstName}
                                                        onChangeText={
                                                            handleChange('FirstName')
                                                        }
                                                        onBlur={handleBlur('FirstName')}
                                                    />
                                                </View>
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
                                                        style={styles.inputStyle}
                                                        placeholderTextColor={'#000'}
                                                        placeholder="Last name"
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
                                                {/* <View style={styles.textInput}>
                                                    <FontAwesome5 name="phone-alt" size={24} color="black" />
                                                    <TextInput
                                                        style={styles.inputStyle}
                                                        keyboardType={'number-pad'}
                                                        maxLength={10}
                                                        placeholderTextColor={'#000'}
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
                                                )} */}
                                                <View style={styles.textInput}>
                                                    <MaterialCommunityIcons name="email-multiple" size={24} color="black" />
                                                    <TextInput
                                                        style={styles.inputStyle}
                                                        keyboardType={'email-address'}
                                                        placeholderTextColor={'#000'}
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
                                                        style={styles.inputStyle}
                                                        keyboardType={'number-pad'}
                                                        placeholder="House No. / Flat No. / Floo "
                                                        placeholderTextColor={'#000'}
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
                                                        style={styles.inputStyle}
                                                        placeholderTextColor={'#000'}
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
                                                        style={styles.inputStyle}
                                                        placeholderTextColor={'#000'}
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
                                                            style={styles.inputStyle}
                                                            placeholderTextColor={'#000'}
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
                                                            style={styles.inputStyle}
                                                            keyboardType={'number-pad'}
                                                            tex
                                                            maxLength={6}
                                                            placeholder="Pincode"
                                                            placeholderTextColor={'#000'}
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
                                                        style={styles.inputStyle}
                                                        placeholder="State"
                                                        placeholderTextColor={'#000'}
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

                                                {
                                                    selectedAddress && selectedAddress!=='' ?
                                                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                                                            <LinearGradient
                                                                colors={['#F9B551', '#F87B2C']}
                                                                style={styles.continueButtonStyle}>
                                                                <TouchableOpacity onPress={(e) => {
                                                                    // handleSubmit(e)
                                                                    editAddressApi()
                                                                }}>
                                                                    <Text style={{ ...Fonts.whiteColor16Bold }}>Update</Text>
                                                                </TouchableOpacity>
                                                            </LinearGradient>

                                                        </View>
                                                        : (
                                                <>
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
                                            </>
                                        )}
                                    </Formik>

                                </View>
                            </ScrollView>
                        </Modal>
                    </ImageBackground>
                </SafeAreaView>

            </>
        )



    )
}

export default SelectAdd

const styles = StyleSheet.create({
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
    },
    AddContainer: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 30,
        marginBottom: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 5,
    },
    iconImage: {
        width: 25, height: 25, resizeMode: 'contain',
    },
    textInput: {
        backgroundColor: Colors.whiteColor,
        marginTop: 30,
        marginBottom: 10,
        padding: 15,
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
    checkButton: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-around',
        alignSelf: 'center',
        marginVertical: 10,
    },
    inputStyle: {
        marginLeft: 20,
        width: '80%',
        alignItems: 'center',
        color: '#000'
    }
})
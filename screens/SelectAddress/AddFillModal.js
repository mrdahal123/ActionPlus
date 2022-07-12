import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Modal,
} from 'react-native'
import { Colors, Fonts, Sizes } from "../../constant/style";
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';

const AddFillModal = () => {

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

  return (
    <SafeAreaView>
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
                                            FirstName: existingData && existingData && existingData.first_name ? existingData.first_name : '',
                                            LastName: existingData && existingData && existingData.last_name ? existingData.last_name : '',
                                            PhoneNumber: existingData && existingData && existingData.phone_number ? existingData.phone_number : '',
                                            email: existingData && existingData && existingData.email_address ? existingData.email : "",
                                            houseNo: existingData && existingData && existingData.house_number ? existingData.house_number : '',
                                            socitey: existingData && existingData && existingData.street_name ? existingData.street_name : '',
                                            area: existingData && existingData && existingData.area ? existingData.area : '',
                                            city: existingData && existingData && existingData.city ? existingData.city : '',
                                            pinCode: existingData && existingData && existingData.pin_code ? existingData.pin_code : '',
                                            state: existingData && existingData && existingData.state ? existingData.state : '',
                                            addType: existingData && existingData && existingData.address_type ? existingData.address_type : '',
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
                                                {editText == '' ? (

                                                    <Text style={{
                                                        ...Fonts.blackColor18Bold,
                                                        textAlign: 'center',
                                                        marginTop: 10
                                                    }}>Edit Address</Text>
                                                ) : (

                                                    <Text style={{
                                                        ...Fonts.blackColor18Bold,
                                                        textAlign: 'center',
                                                        marginTop: 10
                                                    }}> Add Address</Text>
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

                                                {/* {
                                                    existingData && existingData && existingData.first_name ?
                                                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                                                            <LinearGradient
                                                                colors={['#F9B551', '#F87B2C']}
                                                                style={styles.continueButtonStyle}>
                                                                <TouchableOpacity onPress={(e) => {
                                                                    console.log('errors');
                                                                    console.log('errors', errors);
                                                                    // handleSubmit(e)
                                                                    editAddressApi()
                                                                }}>
                                                                    <Text style={{ ...Fonts.whiteColor16Bold }}>Update</Text>
                                                                </TouchableOpacity>
                                                            </LinearGradient>
                                                            <LinearGradient
                                                                colors={['#F9B551', '#F87B2C']}
                                                                style={styles.continueButtonStyle}>
                                                                <TouchableOpacity onPress={(e) => {
                                                                    console.log('errors');
                                                                    console.log('errors', errors);
                                                                    // handleSubmit(e)

                                                                }}>
                                                                    <Text style={{ ...Fonts.whiteColor16Bold }}>save</Text>
                                                                </TouchableOpacity>
                                                            </LinearGradient>
                                                        </View>
                                                        : ( */}
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
                                                        {/* )} */}
                                            </>
                                        )}
                                    </Formik>

                                </View>
                            </ScrollView>
                        </Modal>
    </SafeAreaView>
  )
}

export default AddFillModal

const styles = StyleSheet.create({})
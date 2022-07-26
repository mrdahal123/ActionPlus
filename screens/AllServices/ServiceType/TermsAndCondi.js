import React, { useState } from 'react'
import { StyleSheet,  View, SafeAreaView, Image, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import { Colors, Fonts } from '../../../constant/style';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient';
import GlobalButton from '../../../Components/GlobalButton';
import * as ApiService from '../../../Utils/Utils';
import AuthContext from '../../../Context/AuthContext';
import { ActivityIndicator } from 'react-native-paper';
import NavigationHeaders from '../../../Components/NavigationHeaders';
import Text from '../../../Components/Text';
import { object } from 'yup';

const TermsAndCondi = ({ route, navigation }) => {
    const [check, setCheck] = useState(false)
    const [loader, setLoader] = useState(false)
    const Address = route.params.data.itemData
    const BookingData = route.params.data.bookingData
    const serviceces = BookingData.serviceType

    console.log("BookingData",BookingData)
    console.log("BookingDatabookingTime ",BookingData.serviceType)
    console.log("Address",Address)
    console.log("serviceces",serviceces)

    let arr =[] ;
    serviceces && serviceces.map(item => {
        // console.log(item)
        arr.push(item)
    })
    console.log("arr",arr)
    const BookingSuccess = () => {
        setLoader(true)
        let data = {
            "b_c_name": Address.first_name,
            "b_c_time": BookingData.bookingTime,
            "b_c_date": BookingData.format,
            "service_provider_id": "",
            "service_provider_name": "",
            "b_c_service_id": "786545",
            "b_c_service_name":JSON.stringify(arr),
            "b_c_seat_address": Address.area,
            "b_c_city": Address.city,
            "b_c_pin_code": Address.pin_code,
            "b_c_floor": "5th",
            "b_c_flat_number": Address.house_number,
            "b_c_state": "Telangana",
            "b_c_phone_number": Address.phone_number,
            "b_c_amount": BookingData.finalPrice,
            "b_c_status": "0"

        }
        console.log("data", data);
        ApiService.PostMethode('bookings/add_bookings_customer', data)
            .then(response => {
                setLoader(false)
                console.log("BookingSuccess", response.status);
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

    const serviceInfo = [
        { type: "All rooms cobweb removal." },
        { type: "Sanitization of Dustbins." },
        { type: "Dinning table & chairs dustings & cleaning." },
        { type: "Hall sofa dusting , cleaning & Vacuuming." },
        { type: "TV cabinet ,book shelves, curtains dusting & cleaning." },
        { type: "All doors, Handles , tower bolt dusting and wiping with dry and wet cloth. " },
        { type: "All  wooden cupboards inside & outside dusting cleaning and vacuuming." },
        { type: "All electrical fixtures light , fan and fittings cleaning." },
        { type: "All kitchen cabinets dusting from inside and out side and vacuuming." },
        { type: "Dusting and wiping kitchen plat form & Gas stove." },
        { type: "Kitchen Chimney cleaning (Exterior). " },
        { type: "Wall marks to be cleaned." },
        { type: "Mirror ,glass and windows cleaning." },
        { type: "All balcony's sweeping and mopping .       " },
        { type: "All washrooms floor & tiles hand scrubbing, Mirror cleaning and water wash and mopping.  " },
        { type: "Railings dusting and cleaning. " },
        { type: "All rooms dry mop and wet mop and scrubbed with machine. " },
        { type: "All the dustbins have been emptied from the rooms return the large plastic bin to a designated point for disposal." }
    ]
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor, padding: 20 }}>
            <StatusBar backgroundColor={Colors.themeColor} />
            {loader == true ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <ActivityIndicator size={30} color={Colors.themeColor} />
                </View>
            ) : (
                <>
               
                    <View style={[styles.headerWrap,{ justifyContent:'space-around',}]}>
                    <NavigationHeaders title={"Terms and Conditions"} onPress={() => { navigation.goBack() }}/>
                    </View>

                    <FlatList
                        data={serviceInfo}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={({ item, index }) => index}
                        renderItem={({ item, index }) => {
                            return (
                                <>
                                    <View style={[styles.headerWrap, { width: '92%' }]}>
                                        <Feather name='check-circle' size={30} color={Colors.themeColor} />
                                        <Text style={[Fonts.blackColor14Bold, { marginLeft: 10 }]}>{item.type}</Text>
                                    </View>
                                </>
                            )
                        }} />
                    <View style={[styles.headerWrap, { justifyContent: 'space-between' }]}>
                        <Text style={Fonts.grayColor14Bold}>
                            Agree to terms and Conditions
                        </Text>
                        <TouchableOpacity onPress={() => {
                            setCheck(!check)
                        }} style={[styles.filterButton, { backgroundColor: check == true ? Colors.themeColor : null }]}>

                            {check == true ?
                                <FontAwesome5 name='check' size={20} color={'#fff'} /> : null}
                        </TouchableOpacity>
                    </View>

                    {check == true ? (<GlobalButton title={"Proceed"} onPress={() => {
                        BookingSuccess()
                        // navigation.navigate("BookingInfo")
                    }} />) : null}
                </>
            )}

        </SafeAreaView>
    )
}

export default TermsAndCondi

const styles = StyleSheet.create({
    headerWrap: {
        width: '100%',
        alignItems: 'center',
       
        flexDirection: 'row',
        marginVertical: 10,
        paddingHorizontal: 5
    },
    text:
    {
        textAlign: 'center', marginLeft: '20%', fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },

    filterButton: {
        width: 30,
        height: 30,
        borderRadius: 8,
        backgroundColor: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
    },

})
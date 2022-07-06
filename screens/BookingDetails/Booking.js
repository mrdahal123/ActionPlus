import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
    ActivityIndicator
} from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { Colors, Fonts, Sizes } from "../../constant/style";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import NavigationHeaders from '../../Components/NavigationHeaders';
import axios from 'axios';
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../Context/AuthContext';

const Booking = ({ navigation }) => {
    const { authContext, appState } = useContext(AuthContext);
    let userData = appState.data;
    const [loader, setLoader] = useState(false)
    const [bookingData, setBookingData] = useState('')

    const BookingApi = () => {
        setLoader(true)
        let data = {
            "phone_number":userData ,
        }
        console.log("data", data);
        ApiService.PostMethode('bookings/get_all_bookings_customer', data)
            .then(response => {
                setLoader(false)
                console.log(response);
                // let ApiRes = response.data.data
                // setBookingData(ApiRes)
            })
            .catch(error => {
                setLoader(false)
                console.log(error);
            })
    }
    useEffect(() => {
        BookingApi()
    }, [])
    const bookingDetails = [
        {
            time: "Today at 06:00 PM",
            serviceBookedL: "1 service",
            serviceType: "Home Cleaning Oatmeal Stout  * 2 Stone Peak Condition * 1 ",
            cost: ' 26.06',
        },
        {
            time: "Today at 07:00 PM",
            serviceBookedL: "1 service",
            serviceType: "Home Cleaning Oatmeal Stout  * 2 Stone Peak Condition * 1 ",
            cost: ' 20.06',
        },
        {
            time: "Today at 01:00 PM",
            serviceBookedL: "1 service",
            serviceType: "Home Cleaning Oatmeal Stout  * 2 Stone Peak Condition * 1 ",
            cost: ' 35.06',
        },
        {
            time: "Today at 12:00 PM",
            serviceBookedL: "1 service",
            serviceType: "Home Cleaning Oatmeal Stout  * 2 Stone Peak Condition * 1 ",
            cost: ' 30.06',
        },
        {
            time: "Today at 02:00 PM",
            serviceBookedL: "1 service",
            serviceType: "Home Cleaning Oatmeal Stout  * 2 Stone Peak Condition * 1 ",
            cost: ' 29.06',
        },
    ]
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            {loader == true ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <ActivityIndicator size={30} color={Colors.themeColor} />
                </View>
            ) : (
                <>
                    <ScrollView style={styles.wrapper}>
                        <NavigationHeaders onPress={() => { navigation.goBack() }} title='Booking' />
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <AntDesign name="arrowleft" size={24} color="black" onPress={() => { navigation.goBack() }} />
                    <Text style={{ ...Fonts.blackColor20Bold, textAlign: 'center', marginRight: '35%' }}>Booking</Text>
                </View>  */}
                        <FlatList
                            data={bookingData}
                            keyExtractor={({ item, index }) => index}
                            renderItem={({ item, index }) => {
                                return (
                                    <>
                                        <TouchableOpacity style={styles.booking} onPress={() => { navigation.navigate('BookingDetails') }}>
                                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                            <Text style={{ ...Fonts.blackColor16Bold, color: '#F9B551', }}>ID: #{item.b_c_service_id}</Text>
                                            <View style={{ alignItems: 'center', flexDirection: 'row' }} >
                                                <MaterialIcons name='loop' size={24} color='#FF0000' />
                                                <TouchableOpacity onPress={() => navigation.navigate('MaidService')}>
                                                    <Text style={{ color: '#FF0000', fontSize: 16, fontWeight: '700' }}> Re-book</Text>
                                                </TouchableOpacity>
                                            </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>

                                                <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>
                                                    {item.b_c_date}  At {item.b_c_time}
                                                </Text>
                                                <Text style={{ ...Fonts.blackColor16Bold, }}>{item.serviceBookedL}</Text>
                                                <Text><Text style={{ color: '#F9B551', }}>₹</Text> {item.b_c_amount}</Text>
                                            </View>
                                            <Text>Service Type - {item.b_c_service_name}</Text>
                                        </TouchableOpacity>
                                    </>
                                )
                            }}
                        />
                        {/* <TouchableOpacity style={styles.booking} onPress={() => { navigation.navigate('BookingDetails') }}>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>
                                Today at 01:00 PM
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                <Text style={{ ...Fonts.blackColor16Bold, }}>1 service</Text>
                                <Text style={{ color: '#000' }}><Text style={{ color: '#F9B551', }}>₹</Text> 29.06</Text>
                            </View>
                            <Text style={{ color: '#000' }}>Home Cleaning Oatmeal Stout  * 2 Stone Peak Condition * 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.booking} onPress={() => { navigation.navigate('BookingDetails') }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                <Text style={{ ...Fonts.blackColor16Bold, color: '#F9B551', }}># MRN893813</Text>
                                <View style={{ alignItems: 'center', flexDirection: 'row' }} >
                                    <MaterialCommunityIcons name='comment-question' size={24} color='#F9B551' />
                                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}> Support</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>
                                Today at 07:00 PM
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                <Text style={{ ...Fonts.blackColor16Bold, }}>1 service</Text>
                                <Text style={{ color: '#000' }}>
                                    <Text style={{ color: '#F9B551', }}>₹</Text> 39.06</Text>
                            </View>
                            <Text style={{ color: '#000' }}>Home Cleaning Oatmeal Stout  * 2 Stone Peak Condition * 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.booking} onPress={() => { navigation.navigate('BookingDetails') }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                <Text style={{ ...Fonts.blackColor16Bold, color: '#F9B551', }}># MRN893813</Text>
                                <View style={{ alignItems: 'center', flexDirection: 'row' }} >
                                    <MaterialIcons name='loop' size={24} color='#FF0000' />
                                    <TouchableOpacity onPress={() => navigation.navigate('MaidService')}>
                                        <Text style={{ color: '#FF0000', fontSize: 16, fontWeight: '700' }}> Re-book</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>
                                Today at 01:00 PM
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                <Text style={{ ...Fonts.blackColor16Bold, }}>1 service</Text>
                                <Text style={{ color: '#000' }}><Text style={{ color: '#F9B551', }}>₹</Text> 25.06</Text>
                            </View>
                            <Text style={{ color: '#000' }}>Home Cleaning Oatmeal Stout  * 2 Stone Peak Condition * 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.booking} onPress={() => { navigation.navigate('BookingDetails') }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                <Text style={{ ...Fonts.blackColor16Bold, color: '#F9B551', }}># MRN893813</Text>
                                <View style={{ alignItems: 'center', flexDirection: 'row' }} >
                                    <MaterialIcons name='loop' size={24} color='#FF0000' />
                                    <TouchableOpacity onPress={() => navigation.navigate('MaidService')}>
                                        <Text style={{ color: '#FF0000', fontSize: 16, fontWeight: '700' }}> Re-book</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>
                                Today at 01:00 PM
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                <Text style={{ ...Fonts.blackColor16Bold, }}>1 service</Text>
                                <Text style={{ color: '#000' }}><Text style={{ color: '#F9B551', }}>₹</Text> 25.06</Text>
                            </View>
                            <Text style={{ color: '#000' }}>Home Cleaning Oatmeal Stout  * 2 Stone Peak Condition * 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('BookingDetails') }} style={styles.booking}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                <Text style={{ ...Fonts.blackColor16Bold, color: '#F9B551', }}># MRN893813</Text>
                                <View style={{ alignItems: 'center', flexDirection: 'row' }} >
                                    <MaterialIcons name='loop' size={24} color='#FF0000' />
                                    <TouchableOpacity onPress={() => navigation.navigate('MaidService')}>
                                        <Text style={{ color: '#FF0000', fontSize: 16, fontWeight: '700' }}> Re-book</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>
                                Today at 01:00 PM
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                <Text style={{ ...Fonts.blackColor16Bold, }}>1 service</Text>
                                <Text style={{ color: '#000' }}><Text style={{ color: '#F9B551', }}>₹</Text> 25.06</Text>
                            </View>
                            <Text style={{ color: '#000' }}>Home Cleaning Oatmeal Stout  * 2 Stone Peak Condition * 1</Text>
                        </TouchableOpacity> */}
                    </ScrollView>
                </>
            )}
        </SafeAreaView>
    )
}

export default Booking

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 10,
    },
    booking: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 0.5,
        marginVertical: 10,


    }
})
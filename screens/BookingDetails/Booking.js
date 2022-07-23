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
    ActivityIndicator,
    RefreshControl
} from 'react-native'
import React, { Component, useEffect, useState, useContext, useCallback } from 'react'
import { Colors, Fonts, Sizes } from "../../constant/style";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import NavigationHeaders from '../../Components/NavigationHeaders';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../Context/AuthContext';

const Booking = ({ navigation }) => {
    const { appState } = useContext(AuthContext);
    let userData = appState.data.user_mobile_number;
    console.log("userData", userData)
    const [loader, setLoader] = useState(false)
    const [bookingData, setBookingData] = useState('');
    const [refreshing, setRefreshing] = React.useState(false);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false), BookingApi());
    }, []);

    const BookingApi = useCallback(async () => {
        setLoader(true)
        try {
            let response = await ApiService.PostMethode('bookings/get_bookings_by_customer_phone_number', { "phone_number": userData })
            console.log("response", response);
            setLoader(false)
            setBookingData(response.data)
        } catch (error) {
            setLoader(false)
        }
    }, [])

    useFocusEffect(
        React.useCallback(() => {

            const unsubscribe = BookingApi();
            return () => unsubscribe;
        }, [])
    )


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            {loader == true ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <ActivityIndicator size={30} color={Colors.themeColor} />
                </View>
            ) : (
                <>

                    {/* <ScrollView style={styles.wrapper} refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }> */}
                    <View style={{ marginVertical: 20 }}>
                        <NavigationHeaders onPress={() => { navigation.goBack() }} title='Booking' />
                    </View>
                    <View style={styles.wrapper}>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            // style={{ flexDirection: 'column-reverse' }}
                            data={bookingData}
                            keyExtractor={({ item, index }) => index}
                            ListEmptyComponent={() => {
                                return (
                                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', marginTop: '30%' }}>
                                        <Image source={require('../../Assets/images/gif/notFound.gif')}
                                            style={{ width: 350, height: 350, resizeMode: 'contain', }} />
                                        <Text style={Fonts.blackColor18Bold}>You have no bookings available</Text>
                                    </View>
                                )
                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <>
                                        <TouchableOpacity style={styles.booking} onPress={() => {
                                            navigation.navigate('BookingDetails', {
                                                data: item
                                            })
                                        }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,padding:10}}>
                                                <Text style={{ ...Fonts.blackColor16Bold, color: '#F9B551', }}>ID: #{item._id.slice(0, 20)}</Text>
                                                <View style={{ alignItems: 'center', flexDirection: 'row' }} >
                                                    <MaterialIcons name='loop' size={24} color='#FF0000' />
                                                    <TouchableOpacity onPress={() => navigation.navigate('AllService')}>
                                                        <Text style={{ color: '#FF0000', fontSize: 16, fontWeight: '700' }}> Re-book</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10,padding:10 }}>

                                                <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>
                                                    {item.b_c_date}  At {item.b_c_time}
                                                </Text>
                                                <Text style={{ ...Fonts.blackColor16Bold, }}>{item.serviceBooked}</Text>
                                                <Text><Text style={{ color: '#F9B551', }}>₹</Text> {item.b_c_amount}</Text>
                                            </View>
                                            <Text style={{padding:10}}>Service Type - {item.b_c_service_name}</Text>
                                            {/* <Text>Service Type - {item.b_c_service_name.slice(0, 70)}</Text> */}
                                        </TouchableOpacity>
                                    </>
                                )
                            }}
                        />
                    </View>
                </>
            )}
        </SafeAreaView>
    )
}

export default Booking

const styles = StyleSheet.create({
    wrapper: {
        flex:1,
        padding: 20,
        // marginVertical:20
    },
    booking: {
        // flexDirection:'column-reverse',
        width: '100%',
        padding: 15,
        backgroundColor: Colors.grayLightColor,
        borderRadius: 10,
        margin: 5,
        alignSelf: 'center'


    }
})
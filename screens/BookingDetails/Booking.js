import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView
} from 'react-native'
import React, { Component, useState } from 'react'
import { Colors, Fonts, Sizes } from "../../constant/style";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Booking = ({ navigation }) => {
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
            <ScrollView style={styles.wrapper}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <AntDesign name="arrowleft" size={24} color="black" onPress={() => { navigation.goBack() }} />
                    <Text style={{ ...Fonts.blackColor20Bold, textAlign: 'center', marginRight: '35%' }}>Booking</Text>
                </View>
                {/* <FlatList
                    data={bookingDetails}
                    keyExtractor={({ item, index }) => index}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <TouchableOpacity style={styles.booking}>
                                    <Text style={{ ...Fonts.blackColor17Bold,}}>
                                        {item.time}
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical:10 }}>
                                        <Text style={{ ...Fonts.blackColor16Bold,}}>{item.serviceBookedL}</Text>
                                        <Text><Text style={{ color: '#F9B551',}}>₹</Text> {item.cost}</Text>
                                    </View>
                                    <Text>{item.serviceType}</Text>
                                </TouchableOpacity>
                            </>
                        )
                    }}
                /> */}
                <TouchableOpacity style={styles.booking} onPress={() => { navigation.navigate('BookingDetails') }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>
                        Today at 01:00 PM
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={{ ...Fonts.blackColor16Bold, }}>1 service</Text>
                        <Text><Text style={{ color: '#F9B551', }}>₹</Text> 29.06</Text>
                    </View>
                    <Text>Home Cleaning Oatmeal Stout  * 2 Stone Peak Condition * 1</Text>
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
                        <Text><Text style={{ color: '#F9B551', }}>₹</Text> 39.06</Text>
                    </View>
                    <Text>Home Cleaning Oatmeal Stout  * 2 Stone Peak Condition * 1</Text>
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
                        <Text><Text style={{ color: '#F9B551', }}>₹</Text> 25.06</Text>
                    </View>
                    <Text>Home Cleaning Oatmeal Stout  * 2 Stone Peak Condition * 1</Text>
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
                        <Text><Text style={{ color: '#F9B551', }}>₹</Text> 25.06</Text>
                    </View>
                    <Text>Home Cleaning Oatmeal Stout  * 2 Stone Peak Condition * 1</Text>
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
                        <Text><Text style={{ color: '#F9B551', }}>₹</Text> 25.06</Text>
                    </View>
                    <Text>Home Cleaning Oatmeal Stout  * 2 Stone Peak Condition * 1</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Booking

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 15,
    },
    booking: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 0.5,
        marginVertical: 10,


    }
})
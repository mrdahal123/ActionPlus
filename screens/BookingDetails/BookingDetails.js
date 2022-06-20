import React, { useEffect, useState } from 'react'
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
    FlatList
} from 'react-native'
import { Colors, Fonts, Sizes } from "../../constant/style";
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const BookingDetails = ({ route, navigation }) => {
    const [id, setId] = useState('')
    useEffect(() => {
        let userBookingId = route.params.userBookingId
        setId(userBookingId)
        console.log(userBookingId);
    }, [])

    // const payment =[{

    // }]
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor, padding: 20 }}>
            <View style={{ flexDirection: 'row', }}>
                <AntDesign name="arrowleft" size={24} color="black" style={{ padding: 2, }} onPress={() => { navigation.goBack() }} />
                <Text style={{ ...Fonts.blackColor20Bold, marginLeft: '25%' }}>Booking Details</Text>
            </View>
            <View style={{ marginTop: 40 }}>
                <Text style={{ ...Fonts.blackColor20Bold, color: '#F9B551', }}># {id.id}</Text>
                <Text style={{ ...Fonts.blackColor18Bold, color: '#696969', }}>{id.DateTime}</Text>
            </View>
            <View style={{ marginVertical: 30, }}>
                <Text style={{ ...Fonts.blackColor20Bold, color: '#696969', }}>Booking Address</Text>
                <Text style={{ ...Fonts.blackColor17Bold, lineHeight: 25,color:"#000" }}>Postmaster , Dummani B.O, Chitradurga,Karnataka ,India (IN),Pin Code :-577531</Text>
            </View>
            <View style={{ marginVertical: 10, }}>
                <Text style={{ ...Fonts.blackColor20Bold, color: '#696969', }}>Pament Methode</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../Assets/images/gpay.jpg')} style={{ width: 50, height: 50, resizeMode: 'contain', }} />
                    <Text style={{ ...Fonts.blackColor18Bold, color: '#000', }}>Google Pay</Text>
                </View>
            </View>
            <View style={{ borderBottomWidth: 1, borderTopWidth: 0.8, borderBottomColor: '#696969', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }}>
                <Text style={{ ...Fonts.blackColor18Bold, color: '#696969', }}>Full Home Cleaning</Text>
                <Text style={{ ...Fonts.blackColor20Bold, color: '#696969', flexDirection: 'row' }}><Text style={{ ...Fonts.blackColor20Bold, color: '#F9B551' }}>₹</Text>  1500</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                <Text style={{ ...Fonts.blackColor18Bold, color: '#696969', }}>Total</Text>
                <Text style={{ ...Fonts.blackColor20Bold, color: '#696969', flexDirection: 'row' }}> <Text style={{ ...Fonts.blackColor20Bold, color: '#F9B551' }}>₹</Text> 2000</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                <Text style={{ ...Fonts.blackColor18Bold, color: '#696969', }}>internet Handeling Fee </Text>
                <Text style={{ ...Fonts.blackColor20Bold, color: '#696969', flexDirection: 'row' }}><Text style={{ ...Fonts.blackColor20Bold, color: '#F9B551' }}>₹</Text> 200</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                <Text style={{ ...Fonts.blackColor18Bold, color: '#696969', }}>Tip</Text>
                <Text style={{ ...Fonts.blackColor20Bold, color: '#696969', flexDirection: 'row' }}><Text style={{ ...Fonts.blackColor20Bold, color: '#F9B551' }}>₹</Text> 100</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Text style={{ ...Fonts.blackColor18Bold, color: '#696969', }}>Paid</Text>
                <Text style={{ ...Fonts.blackColor20Bold, color: '#696969', flexDirection: 'row' }}><Text style={{ ...Fonts.blackColor20Bold, color: '#F9B551' }}>₹</Text> 1800</Text>
            </View>
            <View style={{ borderTopWidth: 1, borderTopColor: '#696969', marginTop: 15 }} />

            <TouchableOpacity style={{width:'100%',backgroundColor:'#ffe0e5',borderRadius:8,flexDirection:'row',padding:20,marginVertical:15}}>
                <Image
                    source={require('../../Assets/images/banner/faq.png')}
                    style={{ width: 30.0, height: 30.0 }}
                />
                <Text style={{ ...Fonts.blackColor20Bold, color: '#000',marginLeft:10 }}>Need Support</Text>
            </TouchableOpacity>
            <LinearGradient
                    colors={['#F9B551', '#F87B2C']}
                    style={styles.continueButtonStyle}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MaidService')}>
                        <Text style={{ ...Fonts.whiteColor16Bold }}>Re-Book</Text>
                    </TouchableOpacity>
                </LinearGradient>
        </SafeAreaView>
    )
}

export default BookingDetails

const styles = StyleSheet.create({
    continueButtonStyle: {
       
        paddingHorizontal: 20,
        paddingVertical: 12,
        alignItems:'center',
        backgroundColor: Colors.primaryColor,
        minWidth: '30%',
        alignSelf: "flex-end",
        borderRadius: 25,
        justifyContent: 'center',
       
    },
})
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
    Alert
} from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import { Colors, Fonts, Sizes } from "../../constant/style";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './HomeScreen.style';
import CustomTextInput from '../../Components/CustomTextInput';
import Geolocation from '@react-native-community/geolocation';

export default function HomeScreen({ navigation }) {

    useEffect(() => {
        getUserCurrentLocation()
    }, [])

    const [search, setSearch] = useState('')
    const [location, setLocation] = useState([])


    const getUserCurrentLocation = () => {
        Geolocation.getCurrentPosition(position => {
            console.log('position', position.coords);
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            let locValue = { lat: latitude, long: longitude }
            console.log("locValue", locValue);
            setLocation(locValue)
        },
            error => Alert.alert('Error', JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }
    console.log('location', location);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Colors.themeColor} />
            <ScrollView>
                <View style={styles.wrapper}>
                    <View style={[styles.location, { justifyContent: 'space-between' }]}>
                        {/* <Image source={require('../../Assets/images/banner/location.png')}style={styles.iconImage} /> */}
                        <TouchableOpacity style={styles.logo}>
                            <Ionicons name="ios-location-sharp" size={30} color="#fff"  />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'column', marginRight: '30%' }}>
                            <Text style={{ ...Fonts.blackColor18Bold, }}>location</Text>
                            <Text style={{ ...Fonts.grayColor16Bold, }}>{location.lat}</Text>
                            <Text style={{ ...Fonts.grayColor16Bold, }}>{location.long}</Text>
                        </View>

                        {/* <FontAwesome5 name="history" size={30} color="#F9B551" onPress={() => { navigation.navigate("BookingHistory") }} /> */}

                        <TouchableOpacity
                            style={styles.imgShadow} onPress={() => {
                                navigation.navigate('Profile')
                            }} >

                            <Image source={require('../../Assets/images/user/user_9.jpg')} style={[styles.iconImage, { borderRadius: 100, }]} />
                        </TouchableOpacity>
                    </View>


                    <TextInput
                        style={styles.textInput}
                        placeholder="Search"
                        onChangeText={(text) => {
                            setSearch(text)
                        }}
                        value={search}
                    />

                    <View style={[styles.location, { justifyContent: 'space-between', }]}>
                        <Text style={{ ...Fonts.blackColor20Bold, }}>
                            Select Service
                        </Text>
                        <LinearGradient
                            colors={['#F9B551', '#F87B2C']}
                            style={styles.continueButtonStyle}>
                            <TouchableOpacity
                                onPress={() => {
                                    // alert("all Service type will be available soon")
                                    navigation.navigate("Booking")
                                }}>
                                <Text style={{ ...Fonts.whiteColor16Bold }}>See all</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>

                    {/* Services */}

                    <View style={styles.serviceType}>
                        <TouchableOpacity onPress={() => { navigation.navigate('MaidService') }}>
                            <Image source={require('../../Assets/images/banner/maid.png')} style={styles.iconImage} />
                            <Text style={{ ...Fonts.grayColor18Bold, marginTop: 5, textAlign: 'center' }}>Maid</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('PlumberService') }}>
                            <Image source={require('../../Assets/images/banner/plumber.png')} style={styles.iconImage} />
                            <Text style={{ ...Fonts.grayColor18Bold, marginTop: 5, textAlign: 'center' }}>Plumber</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('ElectricianService') }}>
                            <Image source={require('../../Assets/images/banner/electrician.png')} style={styles.iconImage} />
                            <Text style={{ ...Fonts.grayColor18Bold, marginTop: 5, textAlign: 'center' }}>Electrician</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Banner */}
                    <View style={styles.imgBanner}><Image source={require('../../Assets/images/banner/ad1.png')} resizeMode={'contain'} /></View>

                    <Text style={{ ...Fonts.blackColor20Bold, marginBottom: 10 }}>Best offers</Text>

                    {/* Banner */}
                    <View style={styles.imgBanner}><Image source={require('../../Assets/images/banner/best-offer.png')} resizeMode={'contain'} /></View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


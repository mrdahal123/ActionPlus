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
import React, { Component, useState, useEffect,useContext } from 'react'
import { Colors, Fonts, Sizes } from "../../constant/style";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './HomeScreen.style';
import CustomTextInput from '../../Components/CustomTextInput';
import Geolocation from '@react-native-community/geolocation';
import AuthContext from '../../Context/AuthContext';


export default function HomeScreen({ navigation }) {

    const { authContext, appState } = useContext(AuthContext);
    console.log(appState.data)

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
                        <View style={{ flexDirection: 'column', marginRight: '40%' }}>
                            <Text style={{ ...Fonts.blackColor20Bold, }}>Location</Text>
                            <Text style={{ ...Fonts.grayColor16Bold, }}>Chennai</Text>
                            {/* <Text style={{ ...Fonts.grayColor16Bold, }}>{location.lat}</Text>
                            <Text style={{ ...Fonts.grayColor16Bold, }}>{location.long}</Text> */}
                        </View>

                        {/* <FontAwesome5 name="history" size={30} color="#F9B551" onPress={() => { navigation.navigate("BookingHistory") }} /> */}

                        <TouchableOpacity
                            style={styles.imgShadow} onPress={() => {
                                navigation.navigate('Profile')
                            }} >

                            <Image source={require('../../Assets/images/banner/user.png')} style={[styles.iconImage, { borderRadius: 100, }]} />
                        </TouchableOpacity>
                    </View>


                    {/* <TextInput
                        style={styles.textInput}
                        placeholder="Search"
                        onChangeText={(text) => {
                            setSearch(text)
                        }}
                        value={search}
                        placeholderTextColor={'#000'}
                    /> */}

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
                                    navigation.navigate("AllService")
                                }}>
                                <Text style={{ ...Fonts.whiteColor16Bold }}>See all</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>

                    {/* Services */}

                    <View style={styles.serviceType}>
                        <TouchableOpacity onPress={() => { navigation.navigate('MaidService') }}>
                            <Image source={require('../../Assets/images/banner/maidRound.jpg')} style={styles.iconImageBanner} />
                            <Text style={{ ...Fonts.grayColor18Bold, marginTop: 5, textAlign: 'center' }}>Maid</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('PlumberService') }}>
                            <Image source={require('../../Assets/images/banner/plumbRound.jpg')} style={styles.iconImageBanner} />
                            <Text style={{ ...Fonts.grayColor18Bold, marginTop: 5, textAlign: 'center' }}>Plumber</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('ElectricianService') }}>
                            <Image source={require('../../Assets/images/banner/ElectRound.jpg')} style={styles.iconImageBanner} />
                            <Text style={{ ...Fonts.grayColor18Bold, marginTop: 5, textAlign: 'center' }}>Electrician</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Banner */}
                   <Image source={require('../../Assets/images/banner/action+banner1.png')} style={styles.imgBanner} resizeMode={'contain'} />

                    <Text style={{ ...Fonts.blackColor20Bold }}>Best offers</Text>

                    {/* Banner */}
                  <Image source={require('../../Assets/images/banner/action+banner2.png')} style={styles.imgBanner} resizeMode={'contain'} />
                  <Image source={require('../../Assets/images/banner/action+banner1.jpg')} style={styles.imgBanner} resizeMode={'contain'} />
                  <Image source={require('../../Assets/images/banner/action+banner2.jpg')} style={styles.imgBanner} resizeMode={'contain'} />
                  <Image source={require('../../Assets/images/banner/action+banner3.jpg')} style={styles.imgBanner} resizeMode={'contain'} />
                  <Image source={require('../../Assets/images/banner/action+banner4.jpg')} style={styles.imgBanner} resizeMode={'contain'} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


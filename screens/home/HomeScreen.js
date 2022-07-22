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
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, { Component, useState, useEffect, useContext } from 'react';
import { Colors, Fonts, Sizes } from '../../constant/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './HomeScreen.style';
import CustomTextInput from '../../Components/CustomTextInput';
import Geolocation from '@react-native-community/geolocation';
import AuthContext from '../../Context/AuthContext';
import AuthService from '../Service/AuthService';
import { useFocusEffect } from '@react-navigation/native';
import { SliderBox } from 'react-native-image-slider-box';
import GlobalButton from '../../Components/GlobalButton';

export default function HomeScreen({ navigation }) {
  const { authContext, appState } = useContext(AuthContext);
  // const userProfile = appState.data
  // console.log("appState,homescreen", appState)
  // console.log("alldetails", appState.data)
  // console.log("alldetails", userProfile)

  useEffect(() => {
    getUserCurrentLocation();
  }, []);

  const [location, setLocation] = useState([]);
  const [userAllDetails, setUserAllDetails] = useState('');
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [userCurrentAdd, setUserCurrentAdd] = useState('');
  const [userCurrentCity, setUserCurrentCity] = useState('');
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false), getProfileApi());
  }, []);

  const getUserCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('position', position.coords);
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let locValue = { lat: latitude, long: longitude };
        let cordinets = {
          latitude: latitude,
          longitude: longitude,
        };
        GetCurrentLocation(cordinets);
        setLocation(locValue);
      },
      // error => Alert.alert('Error', JSON.stringify(error)),
      // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      error => console.error('Error', JSON.stringify(error)),
    );
  };

  // Location

  const GetCurrentLocation = async cordinets => {
    setLoader(true);
    console.log('GetCurrentLocation', cordinets);
    try {
      let response = await AuthService.Post('get_location', cordinets);
      console.log('GetCurrentLocation response', response.data[0].city);
      setLoader(false);
      setUserCurrentCity(response.data[0].city);
      setUserCurrentAdd(response.data[0].formattedAddress);
    } catch (error) {
      setLoader(false);
      console.log('Data', error);
    }
  };

  const getProfileApi = async () => {
    setLoader(true);
    let apiData = {
      user_mobile_number: appState.data.user_mobile_number,
    };
    console.log('getProfileApi', apiData);
    try {
      let response = await AuthService.Post(
        'get_user_by_phone_number',
        apiData,
      );
      console.log('getProfileApi response', response.data[0]);
      setLoader(false);
      setUserAllDetails(response.data[0]);
    } catch (error) {
      setLoader(false);
      console.log('Data', error);
    }
  };


  const getAllService = () => {
    setLoader(true)
    let data = {}
    ApiService.PostMethode('category/get_all_category', data)
        .then(response => {
            console.log(response.data);
            setLoader(false)
            let apiValue = response.data
            let arr =[]
            apiValue.map(item => {
                console.log("jhadvfayfdfc",item.category_status)
                if(item.category_status==1){
                    arr.push(item)
                }
                else{
                    return
                }
            })
            setServiceType(arr)
        })
        .catch(error => {
            setLoader(false)
            console.log(error);
        })
}

// useEffect(()=>{
//   getAllService()
// },[])

  useFocusEffect(
    React.useCallback(() => {
      setUserAllDetails('');
      const unsubscribe = getProfileApi();
      return () => unsubscribe;
    }, []),
  );

  const SliderImage = [
    // "https://source.unsplash.com/1024x768/?nature",
    // "https://source.unsplash.com/1024x768/?water",
    // "https://source.unsplash.com/1024x768/?girl",
    // "https://source.unsplash.com/1024x768/?tree", // Network image
    require('../../Assets/images/banner/carousel1.png'), // Local
    require('../../Assets/images/banner/newBanner2.jpg'), // Local image
    require('../../Assets/images/banner/action+banner3.jpg'), // Local image
    require('../../Assets/images/banner/action+banner4.jpg'), // Local image
  ];

  console.log('location', location);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.themeColor} />
      {loader == true ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={30} color={Colors.themeColor} />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.wrapper}>
            <View style={[styles.location, { justifyContent: 'space-between' }]}>
              <View style={[styles.locationWrap, { marginTop: '8%' }]}>
                <TouchableOpacity style={styles.locationWrapper}>
                  <Ionicons
                    name="ios-location-sharp"
                    size={30}
                    color={Colors.themeColor}
                  />
                </TouchableOpacity>
                <Text style={{ ...Fonts.grayColor18Bold, marginLeft: 10 }}>
                  {userCurrentCity}
                </Text>
              </View>
              <View style={[styles.locationWrap, { marginTop: '8%' }]}>
                <TouchableOpacity
                  style={styles.locationWrapper}
                  onPress={() => {
                    navigation.navigate('Profile');
                  }}>
                  {/* <Ionicons name="ios-location-sharp" size={30} color={Colors.themeColor} /> */}
                  <MaterialCommunityIcons
                    name="account"
                    color={Colors.themeColor}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* Carousel */}
            <View style={styles.carousel}>
              <SliderBox
                images={SliderImage}
                sliderBoxHeight={100}
                autoplay={true}
                circleLoop={setTimeout(() => {
                  true;
                }, 2000)}
                dotColor="#FFEE58"
                style={styles.carouselimg}
                // style={{width:'100%',padding:10}}
                resizeMode={'contain'}
                inactiveDotColor="#90A4AE"
                dotStyle={{
                  width: 15,
                  height: 5,
                  borderRadius: 2,
                  marginHorizontal: 2,
                  padding: 0,
                  margin: 0,
                }}
              />
            </View>
            <View style={[styles.location, { justifyContent: 'space-between' }]}>
              <Text style={{ ...Fonts.blackColor20Bold }}> Select Service </Text>
              <GlobalButton
                title={'See all'}
                onPress={() => {
                  navigation.navigate('AllService');
                }}
              />
            </View>
            {/* Services */}
            <View style={styles.serviceType}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert("Please Click on select All Button")
                  // navigation.navigate('MaidService');
                }}>
                <View style={styles.iconCircle}>
                  <Image
                    source={require('../../Assets/images/banner/maid.png')}
                    style={styles.iconImageBanner}
                  />
                </View>
                <Text
                  style={{
                    ...Fonts.grayColor18Bold,
                    marginTop: 5,
                    textAlign: 'center',
                  }}>
                  Maid
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert("Please Click on select All Button")
                  // navigation.navigate('PlumberService');
                }}>
                <View style={styles.iconCircle}>
                  <Image
                    source={require('../../Assets/images/banner/plumber.png')}
                    style={styles.iconImageBanner}
                  />
                </View>
                <Text
                  style={{
                    ...Fonts.grayColor18Bold,
                    marginTop: 5,
                    textAlign: 'center',
                  }}>
                  Plumber
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert("Please Click on select All Button")
                  // navigation.navigate('ElectricianService');
                }}>
                <View style={styles.iconCircle}>
                  <Image
                    source={require('../../Assets/images/banner/electrician.png')}
                    style={styles.iconImageBanner}
                  />
                </View>
                <Text
                  style={{
                    ...Fonts.grayColor18Bold,
                    marginTop: 5,
                    textAlign: 'center',
                  }}>
                  Electrician
                </Text>
              </TouchableOpacity>
            </View>
            {/* Banner */}
            {/* <Image source={require('../../Assets/images/banner/carousel2.png')} style={styles.imgBanner} resizeMode={'contain'} /> */}
            {/* <Image source={require('../../Assets/images/banner/action+banner1.png')} style={styles.imgBanner} resizeMode={'contain'} /> */}
            <Text style={{ ...Fonts.blackColor20Bold, marginVertical: 20 }}>
              Best offers
            </Text>
            {/* Banner */}
            <Image
              source={require('../../Assets/images/banner/bnr.png')}
              style={styles.imgBanner}
              resizeMode={'contain'}
            />
            {/* <Image source={require('../../Assets/images/banner/newBanner.jpg')} style={styles.imgBanner} resizeMode={'contain'} />
                                                                                                                                                                    <Image source={require('../../Assets/images/banner/newBanner2.jpg')} style={styles.imgBanner} resizeMode={'contain'} />
                                                                                                                                                                    <Image source={require('../../Assets/images/banner/action+banner3.jpg')} style={styles.imgBanner} resizeMode={'contain'} />
                                                                                                                                                                    <Image source={require('../../Assets/images/banner/action+banner4.jpg')} style={styles.imgBanner} resizeMode={'contain'} /> */}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

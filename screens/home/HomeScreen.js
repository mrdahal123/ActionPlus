import {
  SafeAreaView,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from 'react-native';
import React, {Component, useState, useEffect, useContext} from 'react';
import {Colors, Fonts, Sizes} from '../../constant/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import LinearGradient from 'react-native-linear-gradient';
import {styles} from './HomeScreen.style';
// import CustomTextInput from '../../Components/CustomTextInput';
import Geolocation from '@react-native-community/geolocation';
import AuthContext from '../../Context/AuthContext';
import AuthService from '../Service/AuthService';
import {useFocusEffect} from '@react-navigation/native';
import {SliderBox} from 'react-native-image-slider-box';
import GlobalButton from '../../Components/GlobalButton';
import * as ApiService from '../../Utils/Utils';
import Text from '../../Components/Text';
import CarouselCards from '../../Components/Carousel';

export default function HomeScreen({navigation}) {
  const {authContext, appState} = useContext(AuthContext);
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
  const [serviceType, setServiceType] = useState('');
  const [topData, setTopData] = useState('');
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
        let locValue = {lat: latitude, long: longitude};
        let cordinets = {
          latitude: latitude,
          longitude: longitude,
        };
        GetCurrentLocation(cordinets);
        setLocation(locValue);
      },
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
    setLoader(true);
    let data = {};
    ApiService.PostMethode('category/get_all_category', data)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setLoader(false);
        let apiValue = response.data;
        let arr = [];
        apiValue.map(item => {
          if (item.category_status == 1) {
            arr.push(item);
          } else {
            return;
          }
        });
        setServiceType(arr);

        var sorted = arr.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.date) + new Date(a.date);
        });

        var first_three_record = sorted.slice(0, 3);

        setTopData(first_three_record);
        console.log(first_three_record);
        console.log(JSON.stringify(arr));
      })
      .catch(error => {
        setLoader(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getAllService();
  }, []);

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
    require('../../Assets/images/banner/newBanner.jpg'), // Local
    require('../../Assets/images/banner/newBanner2.jpg'), // Local image
    require('../../Assets/images/banner/action+banner3.jpg'), // Local image
    require('../../Assets/images/banner/action+banner4.jpg'), // Local image
  ];

  console.log('location', location);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.themeColor} />
      {loader == true ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={30} color={Colors.themeColor} />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.wrapper}>
            <View style={[styles.location, {justifyContent: 'space-between', height:60,paddingHorizontal:5}]}>
              <View style={[styles.locationWrap, {marginTop: '8%'}]}>
                <TouchableOpacity style={styles.locationWrapper}>
                  <Ionicons
                    name="ios-location-sharp"
                    size={30}
                    color={Colors.themeColor}
                  />
                </TouchableOpacity>
                <Text style={{...Fonts.grayColor18Bold, marginLeft: 10}}>
                  {userCurrentCity}
                </Text>
              </View>
              <View style={[styles.locationWrap, {marginTop: '8%'}]}>
                <TouchableOpacity
                  style={styles.locationWrapper}
                  onPress={() => {
                    navigation.navigate('Profile');
                  }}>
                  <MaterialCommunityIcons
                    name="account"
                    color={Colors.themeColor}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            </View>


              <CarouselCards/>

            <View style={[styles.location, {justifyContent: 'space-between',paddingHorizontal:5}]}>
              <Text style={{...Fonts.blackColor20Bold}}> Select Service </Text>
              <GlobalButton
                title={'See all'}
                onPress={() => {
                  navigation.navigate('AllService');
                }}
              />
            </View>
            <View
              style={{justifyContent: 'space-evenly',width:'100%', alignItems: 'center'}}>
              <FlatList
                data={topData}
                horizontal
                keyExtractor={(item, index) => index}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: 40,
                      width: 35,
                    }}
                  />
                )}
                renderItem={({item, index}) => {
                  return (
                    <View style={{marginTop: 10}}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('ComonService', {
                            servicetypeData: item,
                          });
                        }}
                        style={styles.circleContainer}>
                        <View style={styles.iconCircle}>
                          <Image
                            source={require('../../Assets/images/banner/action.png')}
                            style={{
                              height: 50,
                              width: 50,
                              resizeMode: 'contain',
                              alignSelf: 'center',
                            }}
                          />
                        </View>
                        <Text style={{marginTop: 10, ...Fonts.grayColor18Bold,paddingHorizontal:10}}>
                          {item.category_name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>

            <Text style={{...Fonts.blackColor20Bold, marginVertical: 20,paddingHorizontal:10}}>
              Best offers
            </Text>

            <Image
              source={require('../../Assets/images/banner/bnr.png')}
              style={styles.imgBanner}
              resizeMode={'contain'}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

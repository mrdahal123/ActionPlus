import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  ImageBackground,
  TextInput,
  FlatList,
} from 'react-native';
import {Colors, Fonts, Sizes} from '../../constant/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import AuthContext from '../../Context/AuthContext';
import * as ApiService from '../../Utils/Utils';
import GlobalButton from '../../Components/GlobalButton';
import Text from '../../Components/Text';
const BookingDetails = ({route, navigation}) => {
  const bookingInfo = route.params.data;
  const serviceName = route.params.serviceName;

  const gstAmount = bookingInfo.b_c_amount * (18 / 100);
  const servicePrice = bookingInfo.b_c_amount - gstAmount;

  console.log('bookingInfo', bookingInfo);
  console.log('serviceName', serviceName);

  const {appState} = useContext(AuthContext);
  let userData = appState.data.user_mobile_number;
  console.log('userData', userData);

  const [id, setId] = useState('');
  const [bookingData, setBookingData] = useState('');
  const [loader, setLoader] = useState(false);
  const [serName, setSerName] = useState('');

  const bookingDetails = async () => {
    setLoader(true);
    try {
      let response = await ApiService.PostMethode(
        'address/get_address_by_phone_number',
        {phone_number: userData},
      );
      console.log('response', response.data);
      setLoader(false);
      setBookingData(response.data);
      // setExistingFlatlistData([response?.data])
    } catch (error) {
      setLoader(false);
    }
  };
  useEffect(() => {
    {
      serviceName.map(item => {
        setSerName(item.serviceName);
        console.log('serName', serName);
      });
    }
    bookingDetails();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <View style={{flexDirection: 'row', padding: 10}}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          style={{padding: 2}}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={{...Fonts.blackColor20Bold, marginLeft: '25%'}}>
          Booking Details
        </Text>
      </View>
      <View style={{flex: 1, padding: 15}}>
        <View style={styles.wrapper}>
          <View>
            <Text style={{...Fonts.blackColor20Bold, color: '#F9B551'}}>
              # {bookingInfo._id}
            </Text>
            <Text style={{...Fonts.blackColor18Bold, color: '#696969'}}>
              {' '}
              {bookingInfo.b_c_date} , {bookingInfo.b_c_time}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 20,
              width: '100%',
              backgroundColor: Colors.whiteColor,
              padding: 10,
            }}>
            <Text style={{...Fonts.blackColor20Bold, color: '#696969'}}>
              Booking Address
            </Text>
            <Text
              style={{
                ...Fonts.blackColor17Bold,
                lineHeight: 25,
                color: '#000',
              }}>
              {bookingInfo.b_c_seat_address} {bookingInfo.b_c_state} ,{' '}
              {bookingInfo.b_c_city} ,{bookingInfo.b_c_flat_number} ,{' '}
              {bookingInfo.b_c_floor} , Pin Code :- {bookingInfo.b_c_pin_code}
            </Text>
          </View>
          {/* <View style={{ marginVertical: 10, }}> */}
          <Text
            style={{
              ...Fonts.blackColor20Bold,
              color: '#696969',
              paddingHorizontal: 10,
            }}>
            Payment Method
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../Assets/images/gpay.jpg')}
              style={{
                width: 50,
                height: 50,
                resizeMode: 'contain',
                paddingHorizontal: 10,
              }}
            />
            <Text style={{...Fonts.blackColor18Bold, color: '#000'}}>
              Google Pay
            </Text>
          </View>
          {/* </View> */}

          <View
            style={{
              marginVertical: 15,
              width: '100%',
              backgroundColor: Colors.whiteColor,
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}>
              <Text style={{...Fonts.blackColor16Bold}}>
                {/* {serName} */}
                Amount
              </Text>
              <Text style={{...Fonts.blackColor16Bold, flexDirection: 'row'}}>
                <Text style={{...Fonts.blackColor20Bold, color: '#F9B551'}}>
                  ???
                </Text>{' '}
                {servicePrice}
              </Text>
            </View>
            <View style={styles.container}>
              <Text style={{...Fonts.blackColor16Bold}}>GST (18%)</Text>
              <Text style={{...Fonts.blackColor16Bold, flexDirection: 'row'}}>
                <Text style={{...Fonts.blackColor20Bold, color: '#F9B551'}}>
                  ???
                </Text>{' '}
                {gstAmount}
              </Text>
            </View>

            <View style={styles.container}>
              <Text style={{...Fonts.blackColor16Bold}}>Total Amount</Text>
              <Text style={{...Fonts.blackColor16Bold, flexDirection: 'row'}}>
                <Text style={{...Fonts.blackColor20Bold, color: '#F9B551'}}>
                  ???
                </Text>{' '}
                {bookingInfo.b_c_amount}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.support}>
          <MaterialCommunityIcons
            name="comment-question"
            size={24}
            color="#FF0000"
          />
          <Text
            style={{...Fonts.blackColor20Bold, color: '#000', marginLeft: 10}}>
            Need Support
          </Text>
        </TouchableOpacity>
        <GlobalButton
          onPress={() => navigation.navigate('AllService')}
          title="Re-Book"
        />
      </View>
    </SafeAreaView>
  );
};

export default BookingDetails;

const styles = StyleSheet.create({
  continueButtonStyle: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    minWidth: '30%',
    alignSelf: 'flex-end',
    borderRadius: 25,
    justifyContent: 'center',
  },
  support: {
    width: '100%',
    backgroundColor: '#ffe0e5',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 20,
    marginVertical: 15,
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    padding: 15,
    backgroundColor: Colors.grayLightColor,
    borderRadius: 10,
  },
  container: {flexDirection: 'row', justifyContent: 'space-between',marginVertical:5},
});

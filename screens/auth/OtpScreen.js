import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  Keyboard,
} from 'react-native';
import React, {Component, useState, useContext, useEffect} from 'react';
import {Colors, Fonts, Sizes} from '../../constant/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import AuthService from '../Service/AuthService';
import RNOtpVerify from 'react-native-otp-verify';
import GlobalButton from '../../Components/GlobalButton';
import Text from '../../Components/Text';
import {string} from 'yup';
const OtpScreen = ({route, navigation}) => {
  const [Otp, setOTP] = useState('');
  const [otpp, setOtpp] = useState('');
  const [loader, setLoader] = useState(false);
  let mobNum = route.params.num;
  console.log(mobNum);
  const {authContext, AppUserData} = useContext(AuthContext);
  const [time, setTime] = React.useState(30);
  const timerRef = React.useRef(time);

  const VerifyOtp = () => {
    setLoader(true)
    let data = {
      user_mobile_number: mobNum,
      user_otp: Otp,
    };
    console.log('data', data);

    AuthService.Post('verify_otp', data)
      .then(Response => {
        setLoader(false);
        console.log('response', Response);
        if (Response.status === 'success') {
          authContext.signIn({
            data: Response.data[0],
          });
          // navigation.navigate('HomeScreen');
        } else {
          Alert.alert(Response.message);
        }
      })
      .catch(error => {
        setLoader(false);
        console.log(error);
      });
  };

  const handleLogin = () => {
    setLoader(true);
    let data = {
      user_mobile_number: mobNum,
    };
    console.log('data', data);
    AuthService.Post('send_otp', data)
      .then(Response => {
        console.log('res', Response);
        setLoader(false);
        console.log(Response.status);
      })
      .catch(error => {
        setLoader(false);
        console.log(error);
      });
  };

  const moveTo = () => {
    if (Otp.length == 4) {
      VerifyOtp();
      // navigation.navigate('HomeScreen');
      // setTimeout(() => {
      //     navigation.navigate('HomeScreen');
      // }, 1000)
    } else {
      alert('Please enter All Value');
    }
  };

  const otpHandler = message => {
    console.log('message', message);
    const otp = /(\d{4})/g.exec(message)[1];
    console.log('Auto otp', otp);
    setOtpp(otp);
    RNOtpVerify.removeListener();
    Keyboard.dismiss();
  };

  useEffect(() => {
    RNOtpVerify.getHash().then(console.log).catch(console.log);

    RNOtpVerify.getOtp()
      .then(p => RNOtpVerify.addListener(otpHandler))
      .catch(p => console.log(p));

    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      {loader == true ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <ActivityIndicator size={'large'} color={Colors.themeColor} />
        </View>
      ) : (
        <>
          <View style={{flex: 1}}>
            <StatusBar backgroundColor={Colors.themeColor} />
            <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            style={{position: 'absolute', top: 20, left: 30, zIndex: 500}}
            onPress={() => navigation.goBack()}
          />
            <View
              style={{
                height: '30%',
                backgroundColor: Colors.themeColor,
                flexDirection: 'row',
                alignItems: 'flex-start',
                padding: 10,
              }}
            />

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: '#fff',
                flexGrow: 1,
                position: 'absolute',
                bottom: 0,
                top: '2%',
                borderRadius: 5,
              }}
            />
            <Image
              source={require('../../Assets/images/banner/logo-top.jpg')}
              style={styles.appLogoStyle}
              resizeMode="contain"
            />

            <Text
              style={{
                ...Fonts.blackColor18Medium,
                textAlign: 'center',
                marginVertical: 10,
                lineHeight: 25,
                // ...Fonts.blackColor18Bold,
                // textAlign: 'center',
              }}>
              Please enter the 4-digit code sent {'\n'} to your mobile number (
              {mobNum})
            </Text>

            <View style={styles.inputContainer}>
              <SmoothPinCodeInput
                placeholder=""
                editable={true}
                autoFocus={true}
                cellStyle={{
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: Colors.grayLight,
                  backgroundColor: Colors.whiteColor,
                  shadowColor: Colors.grayLight,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 1.25,
                  shadowRadius: 8.84,

                  elevation: 8,
                }}
                cellStyleFocused={{
                  borderColor: Colors.themeColor,
                }}
                cellSpacing={15}
                codeLength={4}
                value={Otp}
                onTextChange={txt => setOTP(txt)}
                autoComplete={Otp}
                textStyle={{color: Colors.themeColor, fontSize: 24}}
              />

              <Text style={[Fonts.grayColor16Bold, {marginTop: 20}]}>
                Didn’t receive the otp code!{' '}
              </Text>

              {time == 0 ? (
                <TouchableOpacity
                  style={styles.wrapper}
                  onPress={() => {
                    handleLogin();
                   
                  }}>
                  <Text
                    style={{
                      ...Fonts.blackColor18Bold,
                      color: Colors.themeColor,

                      textAlign: 'center',
                      marginVertical: 10,
                    }}>
                    Resend
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text style={[Fonts.grayColor16Bold, {marginVertical: 10}]}>
                  Resend Otp in {time}
                </Text>
              )}
              <GlobalButton
                onPress={() => {
                  moveTo();
                }}
                title="Verify"
                inlineStyle={{alignSelf: 'center',marginTop:10}}
              />
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  continueButtonStyle: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: Colors.primaryColor,
    minWidth: '30%',
    alignSelf: 'flex-end',
    borderRadius: 25,
  },
  appLogoStyle: {
    width: 180.0,
    height: 180.0,
    justifyContent: 'center',
    resizeMode: 'contain',
    position: 'absolute',
    alignSelf: 'center',
  },
  inputContainer: {
    width: '90%',
    marginVertical: 20,
    justifyContent: 'space-around',
    alignSelf: 'center',
    alignItems: 'center',
  },
  butoonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 60,
    marginTop:10
  },
});

export default OtpScreen;

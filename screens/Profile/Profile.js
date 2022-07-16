import React, { Component, useState, useContext,useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native'
import { Colors, Fonts, Sizes } from "../../constant/style";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AuthContext from '../../Context/AuthContext';
import NavigationHeaders from '../../Components/NavigationHeaders';
import AuthService from '../Service/AuthService';
import { useFocusEffect } from '@react-navigation/native';
const Profile = ({ route, navigation }) => {
  const { authContext, appState } = useContext(AuthContext);
  // const userProfile = route.params.data

  // console.log("alldetails", userProfile)
  const LogOutAlertOccurred = (title, body, btnTxt, btnTxt2) => {
    Alert.alert(title, body, [
      {
        text: btnTxt,
        onPress: () => {
          authContext.signOut();
        },
      },
      {
        text: btnTxt2,
        onPress: () => {
          console.log('No Pressed');
        },
      },
    ]);
  };
  const [loader, setLoader] = useState(false)
  const [userAllDetails, setUserAllDetails] = useState('')

  const getProfileApi = async () => {
        
    setLoader(true)
    let apiData={
        "user_mobile_number":appState.data.user_mobile_number
    }
    console.log("getProfileApi", apiData);
    try {
        let response = await AuthService.Post('get_user_by_phone_number', apiData);
        console.log('getProfileApi response', response.data[0]);
        setLoader(false)
        setUserAllDetails(response.data[0])
    } catch (error) {
        setLoader(false)
        console.log("Data", error);
    }
}

useFocusEffect(
  React.useCallback(() => {
    const unsubscribe = getProfileApi();
    return () => unsubscribe;
  }, [])
)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      {loader == true ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <ActivityIndicator size={30} color={Colors.themeColor} />
            </View>
            ):(
      <ScrollView style={{ flex: 1, marginBottom: 5 }}>
        <AntDesign name="arrowleft" size={24} color="black" style={{ position: 'absolute', top: 20, left: 10, zIndex: 500 }} onPress={() => navigation.goBack()} />
        {/* <NavigationHeaders onPress={()=> navigation.goBack()} title={"Profile"}/> */}
        <View>
          <Text style={{ ...Fonts.blackColor24Bold, textAlign: 'center', marginTop: 20 }}>Profile</Text>

          {userAllDetails!=='' ? (

            <TouchableOpacity
              style={styles.imgShadow}>

              <Image style={[styles.profile, { borderRadius: 100, }]} source={{ uri: `data:image/jpeg;base64, ${userAllDetails.user_image}` }} />

            </TouchableOpacity>
          ) : (


            <Image source={require('../../Assets/images/banner/user.png')} style={styles.profile} />

          )}
          <TouchableOpacity onPress={() => {
            navigation.navigate('EditProfile',{
              data:userAllDetails
            })
          }} style={styles.cameraIcon}>
            <FontAwesome5 name="user-edit" size={20} color="#fff" style={{ marginLeft: 5 }} />
          </TouchableOpacity>


          {/* {userProfile && userProfile.user_image ? (

            <TouchableOpacity
              style={styles.imgShadow} onPress={() => {
                navigation.navigate('Profile')
              }} >

              <Image style={[styles.iconImage, { borderRadius: 100, }]} source={{ uri: `data:image/jpeg;base64, ${userProfile.user_image}` }} />

            </TouchableOpacity>
          ) : (

            <TouchableOpacity
              style={styles.imgShadow} onPress={() => {
                navigation.navigate('Profile')
              }} >

              <Image source={require('../../Assets/images/banner/user.png')} style={[styles.iconImage, { borderRadius: 100, }]} />
            </TouchableOpacity>
          )} */}

        </View>

        <TouchableOpacity style={styles.container}>
        <Text style={{ ...Fonts.grayColor18Bold, marginTop: 5, textAlign: 'center' }}>Favorites</Text>
          {/* <Text style={styles.textBody}>Favorites</Text> */}
          <AntDesign name="right" size={24} color="#696969" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          {/* <Text style={styles.textBody} >Notifications</Text> */}
          <Text style={{ ...Fonts.grayColor18Bold, marginTop: 5, textAlign: 'center' }}>Notifications</Text>
          <AntDesign name="right" size={24} color="#696969" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("Booking") }} style={styles.container}>
          {/* <Text style={styles.textBody}>Booking Details</Text> */}
          <Text style={{ ...Fonts.grayColor18Bold, marginTop: 5, textAlign: 'center' }}>Booking Details</Text>
          <AntDesign name="right" size={24} color="#696969" />
        </TouchableOpacity>
        {/* <Text style={styles.textHeader}>ABOUT</Text> */}
        <Text style={[styles.textHeader,{ ...Fonts.grayColor18Bold, marginTop: 5,  }]}>ABOUT</Text>
        <TouchableOpacity style={styles.container} onPress={() => { navigation.navigate("PrivacyPolicy") }}>
          {/* <Text style={styles.textBody}>Privacy Policy</Text> */}
          <Text style={{ ...Fonts.grayColor18Bold, marginTop: 5, textAlign: 'center' }}>Privacy Policy</Text>
          <AntDesign name="right" size={24} color="#696969" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          {/* <Text style={styles.textBody}>Terms of use</Text> */}
          <Text style={{ ...Fonts.grayColor18Bold, marginTop: 5, textAlign: 'center' }}>Terms of use</Text>
          <AntDesign name="right" size={24} color="#696969" />
        </TouchableOpacity>
        {/* <Text style={styles.textHeader}>APP</Text> */}
        <Text style={[styles.textHeader,{ ...Fonts.grayColor18Bold,   }]}>APP</Text>
        <TouchableOpacity style={styles.container} onPress={() => { navigation.navigate("Support") }}>
          {/* <Text style={styles.textBody}>Support </Text> */}
          <Text style={{ ...Fonts.grayColor18Bold, textAlign: 'center' }}>Support</Text>
          <AntDesign name="right" size={24} color="#696969" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          {/* <Text style={styles.textBody}>Report a Bug</Text> */}
          <Text style={{ ...Fonts.grayColor18Bold, marginTop: 5, textAlign: 'center' }}>Report a Bug</Text>
          <AntDesign name="right" size={24} color="#696969" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          {/* <Text style={styles.textBody}>App Version 1.0</Text> */}
          <Text style={{ ...Fonts.grayColor18Bold, marginTop: 5, textAlign: 'center' }}>App Version 1.0</Text>
          <AntDesign name="right" size={24} color="#696969" />
        </TouchableOpacity>
        <LinearGradient
          colors={['#F9B551', '#F87B2C']}
          style={styles.continueButtonStyle}>
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => {
              LogOutAlertOccurred('Warning', 'Are You Sure?', 'yes', 'No');
            }}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
            <Text style={{ ...Fonts.whiteColor16Bold }}>Logout</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>)}
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  profile: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 20
  },
  cameraIcon: {
    width: 45,
    height: 45,
    position: "absolute",
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    top: '68%',
    left: '55%',
    borderRadius: 100,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.themeColor,
    // paddingHorizontal: 10,
    backgroundColor: Colors.themeColor,
  },
  container: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: "space-between",
    borderBottomWidth: 0.6,
    paddingVertical: 10,
    alignSelf: 'center'
  },
  continueButtonStyle: {
    marginTop: 20,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    minWidth: '30%',
    alignSelf: "flex-end",
    borderRadius: 25,
    justifyContent: 'center',
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  textHeader: {
    ...Fonts.blackColor16Bold, padding: 18, color: '#696969'
  },
  textBody: {
    ...Fonts.blackColor14Bold, color: '#696969'
  }
})
export default Profile
import React, { Component, useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet
} from 'react-native'
import { Colors, Fonts, Sizes } from "../../constant/style";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
const Profile = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <ScrollView style={{ flex: 1, marginBottom: 5 }}>
        <View>
          <Text style={{ ...Fonts.blackColor24Bold, textAlign: 'center', marginTop: 20 }}>profile</Text>
          <Image source={require('../../Assets/images/user/user_9.jpg')} style={styles.profile} />
          <TouchableOpacity onPress={() => {
            navigation.navigate('EditProfile')
          }} style={styles.cameraIcon}>
            <FontAwesome5 name="user-edit" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.container}>
          <Text>Favroite</Text>
          <AntDesign name="right" size={24} color="#696969" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          <Text>Notification</Text>
          <AntDesign name="right" size={24} color="#696969" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("BookingHistory") }} style={styles.container}>
          <Text>Booking Details</Text>
          <AntDesign name="right" size={24} color="#696969" />
        </TouchableOpacity>
        <Text style={styles.textHeader}>ABOUT</Text>
        <TouchableOpacity style={styles.container} onPress={() => { navigation.navigate("PrivacyPolicy") }}>
          <Text>Privacy Policy</Text>
          <AntDesign name="right" size={24} color="#696969" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          <Text>Terms of use</Text>
          <AntDesign name="right" size={24} color="#696969" />
        </TouchableOpacity>
        <Text style={styles.textHeader}>App</Text>
        <TouchableOpacity style={styles.container}>
          <Text>Support </Text>
          <AntDesign name="right" size={24} color="#696969" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          <Text>Report a Bug</Text>
          <AntDesign name="right" size={24} color="#696969" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          <Text>App Version 1.0</Text>
          <AntDesign name="right" size={24} color="#696969" />
        </TouchableOpacity>
        <LinearGradient
          colors={['#F9B551', '#F87B2C']}
          style={styles.continueButtonStyle}>
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
            <Text style={{ ...Fonts.whiteColor16Bold }}>Logout</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
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
    width:45,
    height:45,
    position: "absolute",
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems:'center',
    top: '68%',
    left: '58%',
    borderRadius: 100,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.themeColor,
    padding: 10,
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
  textHeader:{
     ...Fonts.blackColor16Bold, padding: 18, color: '#696969' 
  }
})
export default Profile
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
import React, { Component, useState } from 'react'
import { Colors, Fonts, Sizes } from "../../constant/style";
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient';

const MaidService = ({ navigation }) => {

  const maidService = [
    {
      image: require('../../Assets/images/Services/full-home-cleaning.jpg'),
      type: "Full Home Cleaning",
    },
    {
      image: require('../../Assets/images/Services/car-cleaning.jpg'),
      type: "Car Cleaning",
    },
    {
      image: require('../../Assets/images/Services/bathroom-cleaning.jpg'),
      type: "Bathroom Cleaning",
    },
    {
      image: require('../../Assets/images/Services/kitchen-cleaning.jpg'),
      type: "Kitchen Cleaning",
    },
    {
      image: require('../../Assets/images/Services/carpet-cleaning.jpg'),
      type: "Carpet Cleaning",
    },
    {
      image: require('../../Assets/images/Services/sofa-cleaning.jpg'),
      type: "Sofa Cleaning ",
    },
  ]
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor, }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={maidService}
          keyExtractor={({ item, index }) => index}
          renderItem={({ item, index }) => {
            return (

              <TouchableOpacity onPress={() => {
                navigation.navigate("SlotBooking")
              }} style={styles.card}>
                <Image source={item.image} style={styles.boxImage} />
                <View style={{width:'50%',}}>
                <Text style={{ ...Fonts.blackColor17Bold, textAlign: 'left' }}>{item.type}</Text>
                </View>
                <Feather name="chevron-right" size={24} color="black"/>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default MaidService

const styles = StyleSheet.create({
  card: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowColor: "#F9B551",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  boxImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 10
  }
})
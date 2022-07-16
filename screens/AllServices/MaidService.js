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
  FlatList,
  ActivityIndicator
} from 'react-native'
import React, { Component, useState, useEffect,useContext } from 'react'
import { Colors, Fonts, Sizes } from "../../constant/style";
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient';
import NavigationHeaders from '../../Components/NavigationHeaders';
import axios from 'axios';
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../Context/AuthContext';

const MaidService = ({ route,navigation }) => {
//  let maidId = route.params.maidId;
// console.log("maidId",maidId);
  const { authContext, appState } = useContext(AuthContext);
  const [loader, setLoader] = useState(false)
  const [serviceType, setServiceType] = useState('')

  const getAllService = () => {
    setLoader(true)
    let data = {
      "category_id":  "62c4162acff13ea19b330b0e" 

    }
    console.log("data",data);
    ApiService.PostMethode('services/get_services_by_category_id', data)
      .then(response => {
        console.log(response);
        console.log(response.data);
        setLoader(false)
        let apiValue = response.data
        setServiceType(apiValue)
      })
      .catch(error => {
        setLoader(false)
        console.log(error);
      })
  }
  useEffect(() => {
    getAllService()
  }, [])
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
      {loader == true ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <ActivityIndicator size={30} color={Colors.themeColor} />
        </View>
      ) : (
        <>
          <ScrollView nestedScrollEnabled={true} style={{flexGrow:1, paddingVertical: 20,}}>
            <NavigationHeaders onPress={() => { navigation.goBack() }} title="Professional Cleaning Service" />
            <View style={{ flex: 1, paddingVertical: 20, }}>
              <FlatList
                data={serviceType}
                keyExtractor={({ item, index }) => index}
                renderItem={({ item, index }) => {
                  return (

                    <TouchableOpacity onPress={() => {
                      if(item.service_name==="Deep Cleaning "){
                        navigation.navigate("DeepCleaning",{
                          serviceName:item.service_name,catId:item.category_id
                          
                        })
                      }
                      else{
                        navigation.navigate("SlotBooking",{
                          serviceName:item.service_name , catId:item.category_id
                        })
                      }
                    }} style={styles.card}>
                      <Image source={require('../../Assets/images/banner/action.png')} style={styles.boxImage} />
                      <View style={{ width: '50%', }}>
                        <Text style={{ ...Fonts.blackColor17Bold, textAlign: 'left' }}>{item.service_name}</Text>
                      </View>
                      <Feather name="chevron-right" size={24} color="black" />
                    </TouchableOpacity>
                  )
                }}
              />
            </View>
          </ScrollView>
        </>)}
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
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 10
  }
})
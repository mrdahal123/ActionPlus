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
  ActivityIndicator
} from 'react-native'
import React, { Component, useState, useEffect, useContext } from 'react'
import { Colors, Fonts, Sizes } from "../../constant/style";
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient';
import NavigationHeaders from '../../Components/NavigationHeaders';
import axios from 'axios';
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../Context/AuthContext';
import GlobalButton from '../../Components/GlobalButton';
import Text from '../../Components/Text';

const MaidService = ({ route, navigation }) => {
  let AddOnId = route.params.Add_ons;
  console.log("AddOnId", AddOnId);
  const { authContext, appState } = useContext(AuthContext);
  const [loader, setLoader] = useState(false)
  const [serviceType, setServiceType] = useState('')
  const [selectedServiceType, setSelectedServiceType] = useState('')
  const [addOn, setAddOn] = useState([])

  const getAllService = () => {
    setLoader(true)
    let data = {
      "service_id": AddOnId
    }
    console.log("data", data);
    ApiService.PostMethode('sub_services/get_sub_services_by_service_id', data)
      .then(response => {
        console.log(response);
        console.log("getAllService", response.data);
        setLoader(false)
        let apiValue = response.data
        setServiceType(apiValue)
      })
      .catch(error => {
        setLoader(false)
        console.log(error);
      })
  }

  // const Brands = 
  const multipleCheckBox = (item, index) => {

    const newData = [...serviceType]
    console.log("old", newData);
    let selectedArr = [];
    newData[index].isSelected = !newData[index].isSelected;
    console.log("new", newData);
    setServiceType(newData)
    serviceType.forEach((item) => {
      newData.forEach((element) => {
        if (item._id == element._id && element.isSelected == true) {
          selectedArr.push({
            "serviceName": element.sub_service_name,
            "ServiceId": element._id
          })
          setAddOn(selectedArr)
          console.log("selectedArr", selectedArr)

        }
        else {
          return
        }
      })

    });
  }


  useEffect(() => {
    getAllService()

  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor, }}>
      {loader == true ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <ActivityIndicator size={30} color={Colors.themeColor} />
        </View>
      ) : (
        <>
          <ScrollView nestedScrollEnabled={true} style={{ flexGrow: 1, paddingVertical: 20, }}>
            <NavigationHeaders onPress={() => { navigation.goBack() }} title="Professional Cleaning Service" />
            <View style={{ flex: 1, paddingVertical: 20, }}>
              <FlatList
                data={serviceType}
                ListEmptyComponent={() => {
                  return (
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', marginTop: '30%' }}>
                      <Image source={require('../../Assets/images/gif/notFound.gif')}
                        style={{ width: 350, height: 350, resizeMode: 'contain', }} />
                      <Text style={Fonts.blackColor18Bold}>You have no bookings available</Text>
                    </View>
                  )
                }}
                keyExtractor={({ item, index }) => index}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        multipleCheckBox(item, index)
                      }}
                      style={styles.card}>
                      <Image source={require('../../Assets/images/banner/action.png')} style={styles.boxImage} />
                      <View style={{ width: '50%', }}>
                        <Text style={{ color: item.isSelected ? Colors.themeColor : '#000' }}>
                          {item.sub_service_name}</Text>
                      </View>

                      <TouchableOpacity style={[styles.filterButton, { backgroundColor: item.isSelected ? Colors.themeColor : null }]}  onPress={() => {
                        multipleCheckBox(item, index)
                      }}>

                        {item.isSelected == true ?
                          <FontAwesome5 name='check' size={20} color={'#fff'} /> : null}
                      </TouchableOpacity>
                    </TouchableOpacity>
                  )
                }}
              />
              {
                addOn.length > 0 ? (

                  <GlobalButton title={"Continue"} inlineStyle={{ margin: 20 }} onPress={() => {
                    navigation.navigate("SlotBooking", {
                      data: addOn.length > 0 ? addOn : null
                    })
                  }} />
                ) : null
              }
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
  },
  filterButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
})
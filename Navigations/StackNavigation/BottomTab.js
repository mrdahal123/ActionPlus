import React from 'react';
import { Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../../screens/home/HomeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import Booking from '../../screens/BookingDetails/Booking';
import Profile from '../../screens/Profile/Profile';
import { Fonts,Colors } from '../../constant/style';


const Tab = createMaterialBottomTabNavigator();
export const BottomTab = () => {
  return (
<Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor="#fff"
      barStyle={{ backgroundColor: Colors.orangeColor,width:'100%',paddingVertical:2,}}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          
          tabBarLabel: null,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Booking"
        component={Booking}
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color }) => (
            // <Image source={require('../../Assets/images/banner/book.png')} style={{width:30,height:30,}}/>
            <Feather name="box" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={28}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

import React from 'react';
import {Image, TouchableOpacity, StyleSheet, View} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../../screens/home/HomeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Booking from '../../screens/BookingDetails/Booking';
import Profile from '../../screens/Profile/Profile';
import {Fonts, Colors} from '../../constant/style';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../../screens/home/HomeScreen.style';

const Tab = createBottomTabNavigator();
export const BottomTab = () => {
  const [color , setColor]= React.useState(false)
  return (
    <Tab.Navigator
      style={{backgroundColor: 'red'}}
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.themeColor,
        tabBarInactiveTintColor: Colors.blackColor,
        tabBarStyle: {
          height: 70,
          backgroundColor: '#fff',
         
          paddingBottom: 2,
          borderTopWidth: 0,
        },

        // tabBarBackground:() =>(
        //   <LinearGradient
        //   colors={['#fff', '#000']} style={{
        //     height:50,
        //     // borderTopLeftRadius:15,
        //     // borderTopRightRadius:15
        //   }}/>
        // )
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <View
            
              style={{
                width: 50,
                height: 50,
                marginTop: 20,
                borderRadius: 100,
                backgroundColor: Colors.grayLightColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons name="home" color={color} size={25} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Booking"
        component={Booking}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size, style}) => (
            <View
              style={{
                width: 50,
                height: 50,
                marginTop: 20,
                borderRadius: 100,
                backgroundColor: Colors.grayLightColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome name="calendar-check-o" color={color} size={25} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                width: 50,
                height: 50,
                marginTop: 20,
                borderRadius: 100,
                backgroundColor: Colors.grayLightColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Feather name="menu" color={color} size={25} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>

    // <Tab.Navigator
    //       initialRouteName="HomeScreen"
    //       activeColor={Colors.themeColor}
    //       barStyle={{ backgroundColor:"#fff",width:'100%',elevation:0, paddingVertical:2,borderTopWidth:0,borderTopLeftRadius:50,borderTopRightRadius:50}}
    //     >
    //       <Tab.Screen
    //         name="HomeScreen"
    //         component={HomeScreen}
    //         options={{

    //           tabBarLabel: null,
    //           tabBarIcon: ({ color }) => (
    //             <MaterialCommunityIcons name="home" color={color} size={28} />
    //           ),
    //         }}
    //       />
    //       <Tab.Screen
    //         name="Booking"
    //         component={Booking}
    //         options={{
    //           tabBarLabel: null,
    //           tabBarIcon: ({ color }) => (
    //             // <Image source={require('../../Assets/images/banner/book.png')} style={{width:30,height:30,}}/>
    //             <FontAwesome name="calendar-check-o" color={color} size={26} />
    //           ),
    //         }}
    //       />
    //       <Tab.Screen
    //         name="Profile"
    //         component={Profile}
    //         options={{
    //           tabBarLabel: null,
    //           tabBarIcon: ({ color }) => (
    //             <MaterialCommunityIcons name="account" color={color} size={28}/>
    //           ),
    //         }}
    //       />
    //     </Tab.Navigator>
  );
};

// const styles = StyleSheet.create({
//   wrapperIcon: {
//     width: 50,
//     height: 50,
//     backgroundColor: 'red',
//     // backgroundColor:Colors.lightPink,
//     justifyContent: 'center',
//     alignItems: 'center',

//   }
// })

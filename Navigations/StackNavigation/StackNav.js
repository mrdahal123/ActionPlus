import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './../../screens/auth/LoginScreen';
import RegisterScreen from './../../screens/auth/RegisterScreen';
import OtpScreen from './../../screens/auth/OtpScreen';
import HomeScreen from './../../screens/home/HomeScreen';
import EditProfile from '../../screens/EditProfile/EditProfile';
import MaidService from '../../screens/AllServices/MaidService';
import ElectricianService from '../../screens/AllServices/ElectricianService';
import PlumberService from '../../screens/AllServices/PlumberService';
import SlotBooking from './../../screens/Calendar/SlotBooking';
import SelectAdd from '../../screens/SelectAddress/SelectAdd';
import BookingSuccess from '../../screens/BookingSuccess/BookingSuccess';
import AddnewAddress from '../../screens/SelectAddress/AddnewAddress';
import BookingHistory from '../../screens/BookingHistory/BookingHistory';
import BookingDetails from '../../screens/BookingDetails/BookingDetails';
import Profile from '../../screens/Profile/Profile';
import PrivacyPolicy from '../../screens/Profile/PrivacyPolicy';
import Booking from '../../screens/BookingDetails/Booking';
import AllService from '../../screens/AllServices/AllServices';
import Tutor from '../../screens/AllServices/Tutor';
import Cook from '../../screens/AllServices/Cook';
import Massage from '../../screens/AllServices/Massage';

const Stack = createNativeStackNavigator();

const StackNav = () => {
    return (

        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={HomeScreen}>

            {/* <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} /> */}
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SelectAdd" component={SelectAdd} />
            <Stack.Screen name="SlotBooking" component={SlotBooking} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="MaidService" component={MaidService} />

            <Stack.Screen name="ElectricianService" component={ElectricianService} />
            <Stack.Screen name="PlumberService" component={PlumberService} />
            <Stack.Screen name="BookingSuccess" component={BookingSuccess} />
            <Stack.Screen options={{ headerShown: true, title: 'Edit address', }} name="AddnewAddress" component={AddnewAddress} />
            <Stack.Screen name="BookingHistory" component={BookingHistory} />
            <Stack.Screen name="BookingDetails" component={BookingDetails} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen options={{ headerShown: true, title: 'Privacy And Policy', }} name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="Booking" component={Booking} />
            <Stack.Screen name="AllService" component={AllService} />
            <Stack.Screen name="Tutor" component={Tutor} />
            <Stack.Screen name="Cook" component={Cook} />
            <Stack.Screen name="Massage" component={Massage} />


        </Stack.Navigator>

    )
}
export default StackNav;
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfile from '../../screens/EditProfile/EditProfile';
import MaidService from '../../screens/AllServices/MaidService';

import SlotBooking from './../../screens/Calendar/SlotBooking';
import SelectAdd from '../../screens/SelectAddress/SelectAdd';
import BookingSuccess from '../../screens/BookingSuccess/BookingSuccess';
import AddnewAddress from '../../screens/SelectAddress/AddnewAddress';
import BookingDetails from '../../screens/BookingDetails/BookingDetails';
import PrivacyPolicy from '../../screens/Profile/PrivacyPolicy';
import AllService from '../../screens/AllServices/AllServices';
import { BottomTab } from './BottomTab';

import NavigationHeaders from '../../Components/NavigationHeaders';
import DeepCleaning from '../../screens/AllServices/DeepCleaning';


import TermsAndCondi from '../../screens/AllServices/ServiceType/TermsAndCondi';
import BookingInfo from '../../screens/AllServices/ServiceType/BookingInfo.js';
import ComonService from '../../screens/AllServices/ComonService';
import SelectService from '../../screens/AllServices/SelectService';
import Support from '../../screens/Profile/Support';
import TermsOfUse from '../../screens/AllServices/ServiceType/TermsOfUse';
// import BookingInfo from '../../screens/AllServices/ServiceType/BookingInfo.JS'; 

const Stack = createNativeStackNavigator();

const StackNav = () => {
    return (

        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={BottomTab}>


            <Stack.Screen name="BottomTab" component={BottomTab} />

            <Stack.Screen name="SelectAdd" component={SelectAdd} />
            <Stack.Screen name="SlotBooking" component={SlotBooking} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="MaidService" component={MaidService} />
            <Stack.Screen name="Support" component={Support} />
            <Stack.Screen name='TermsOfUse' component={TermsOfUse}/>

 
            <Stack.Screen name="BookingSuccess" component={BookingSuccess} />
            <Stack.Screen options={{ headerShown: true, title: 'Edit address', }} name="AddnewAddress" component={AddnewAddress} />

            <Stack.Screen name="BookingDetails" component={BookingDetails} />

            <Stack.Screen options={{ headerShown: true, title: 'Privacy Policy', }} name="PrivacyPolicy" component={PrivacyPolicy} />

            <Stack.Screen name="AllService" component={AllService} />

            <Stack.Screen name="NavigationHeaders" component={NavigationHeaders} />
            <Stack.Screen name="DeepCleaning" component={DeepCleaning} />

            <Stack.Screen name="TermsAndCondi" component={TermsAndCondi} />
            <Stack.Screen name="BookingInfo" component={BookingInfo} />
            <Stack.Screen name="ComonService" component={ComonService} />
            <Stack.Screen name="SelectService" component={SelectService} />
   


        </Stack.Navigator>

    )
}
export default StackNav;
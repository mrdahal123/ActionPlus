import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './../../screens/auth/LoginScreen';
import RegisterScreen from './../../screens/auth/RegisterScreen';
import OtpScreen from './../../screens/auth/OtpScreen';

const Stack = createNativeStackNavigator();

const AuthNav = () => {
    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
        </Stack.Navigator>

    )
}
export default AuthNav;
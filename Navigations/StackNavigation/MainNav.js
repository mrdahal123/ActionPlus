import * as React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from '../StackNavigation/StackNav';
import AuthContext from '../../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNav from './AuthNav';

function MainNav() {

    const [appState, setAppState] = useState('')

    const initialLoginState = {
        isLoading: true,
        userData: null,
        userToken: null,
        isLogout: false,
        // userDetails: null,
    }
    let options = { appState, setAppState };

    const LoginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                console.log('user Action', action);
                return {
                    ...prevState,
                    isLogout: false,
                    userToken: action.payload.token,
                    setIsLoading: false
                };
            case 'LOGIN':
                console.log("sign IN ", action.payload)
                return {
                    ...prevState,
                    userData: action.payload.data,
                    userToken: action.payload.token,
                    // userDetails: action.payload.allDetails,
                    setIsLoading: false,
                    isLogout: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userData: null,
                    userToken: null,
                    setIsLoading: false,
                    isLogout: true
                };
            case 'Register':
                return {
                    ...prevState,
                    userData: action.id,
                    userToken: action.token,
                    setIsLoading: false,
                    isLogout: false,
                };
            // case 'UPDATEPROFILE':
            //     console.log("edut",action.payload);
            //     return {
            //         ...prevState,
            //         userDetails: action.payload.data,
            //         setIsLoading: false,
            //         isLogout: false,
            //     };
            default:
                return prevState;
        }
    };

    const [loginState, dispatch] = React.useReducer(LoginReducer, initialLoginState)

    const authContext = React.useMemo(() => ({
        signIn: async (data) => {
            console.log("response main ", data);
            let userToken = data.data._id;
            let contextData;
            let userData = data.data
            // let userDetails = data.data
            // console.log("userDetails", userDetails)
            console.log("maine nav", userData, userToken);
            if (userToken && userData !== null) {

                try {
                    await AsyncStorage.setItem('userToken', userToken.toString())
                    // await AsyncStorage.setItem('userData', userData.toString())
                    await AsyncStorage.setItem('userData', JSON.stringify(userData));
                    contextData = { token: userToken, data: userData, };
                    console.log('contextData', contextData);
                    setAppState({
                        token: userToken,
                        data: userData,
                       
                    });
                    if ((userToken, userData)) {

                        dispatch({ type: 'LOGIN', payload: contextData })
                    }
                    else {
                        dispatch({ type: 'LOGIN', payload: contextData })
                    }

                }
                catch (error) {
                    console.log('Error Occurred while login', error);
                }
            }
            else {
                contextData = { token: userToken, data: userData };
                dispatch({ type: 'LOGIN', payload: contextData }),
                    setAppState({
                        token: userToken,
                        data: userData,
                        
                    });
            }

        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('userToken').then(
                    setAppState({}),
                    dispatch({ type: 'LOGOUT' }),
                    console.log('login state', loginState)
                )
            } catch (error) {
                console.log('Error Occurred while logout', error);
            }
        },


        signUp: async () => {
            let userToken = data.token;
            let contextData;
            let userData = data.data;
            console.log("maine nav", userData, userToken);
            if (userToken && userData !== null) {

                try {
                    await AsyncStorage.setItem('userToken', userToken)
                    await AsyncStorage.setItem('userData', userData)
                    contextData = { token: userToken, data: userData };
                    console.log('contextData signUp', contextData);
                    setAppState({
                        token: userToken,
                        data: userData,
                    });
                    if ((userToken, userData)) {

                        dispatch({ type: 'Register', payload: contextData })
                    }
                    else {
                        dispatch({ type: 'Register', payload: contextData })
                    }

                }
                catch (error) {
                    console.log('Error Occurred while login', error);
                }
            }
            else {
                contextData = { token: userToken, data: userData };
                dispatch({ type: 'Register', payload: contextData }),
                    setAppState({
                        token: userToken,
                        data: userData,
                    });
            }

        }
    }),
        [],
    );

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        let userToken = null;
        let userData = null;
       
        let dataFound;
        try {
            userToken = await AsyncStorage.getItem('userToken');
            userData = await AsyncStorage.getItem('userData');
            userData = JSON.parse(userData);
            console.log('User Token found ==>', userToken);
            console.log('User Data found ==>', userData);
            // userToken = await AsyncStorage.getItem('userToken');
            // userData = await AsyncStorage.getItem('userData');
            // userDetails = await AsyncStorage.getItem('userDetails');
            // userData = JSON.parse(userData);
            // userDetails = JSON.parse(userDetails);
            // console.log('User Token found ==>', userToken);
            // console.log('User Data found ==>', userData);
            // console.log('Parse userDetails found ==>', userDetails);
            if (userToken && userData !== null) {
                setAppState({
                    token: userToken,
                    data: userData,
                    signUpFlow: false,
                });
                dataFound = {
                    token: userToken,
                    user: userData,
                };
                dispatch({ type: 'RETRIEVE_TOKEN', payload: dataFound });
                console.log('fetchUserData called');
            } else {
                dataFound = {
                    token: userToken,
                    user: userData,
                    
                };
                console.log('dataFound', dataFound);
                dispatch({ type: 'RETRIEVE_TOKEN', payload: dataFound });
            }
        } catch (error) {
            console.log('Error Occurred while fetching user Data', error);
        }

    };
    // if (loginState.isLoading == true) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <ActivityIndicator size={'large'} color={'#80406A'} />
    //             <Text
    //                 style={{
    //                     fontSize: 16,
    //                     color: '#000',
    //                     marginVertical: 10,
    //                 }}>
    //                 Loading...
    //             </Text>
    //         </View>
    //     );
    // } else {
    console.log("LoginReducer", LoginReducer);
    return (
        <AuthContext.Provider value={{ ...options, authContext }}>
            <NavigationContainer>
                {loginState.userToken == null ? <AuthNav /> : <StackNav />}
            </NavigationContainer>
        </AuthContext.Provider>
    );
    // }
}

export default MainNav;
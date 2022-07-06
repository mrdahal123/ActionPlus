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
import React, { Component, useEffect, useState,useContext } from 'react'
import { Colors, Fonts, Sizes } from "../../constant/style";
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient';
import NavigationHeaders from '../../Components/NavigationHeaders';
import axios from 'axios';
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../Context/AuthContext';

const AllService = ({ navigation }) => {

    const { authContext, appState } = useContext(AuthContext);
    const [loader, setLoader] = useState(false)
    const [serviceType, setServiceType] = useState('')

    const getAllService = () => {
        setLoader(true)
        let data = {}
        ApiService.PostMethode('category/get_all_category', data)
            .then(response => {
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

    const AllService = [
        {
            image: require('../../Assets/images/service-include/maid.png'),
            type: "Maid",
        },
        {
            image: require('../../Assets/images/service-include/plumber.png'),
            type: "Plumber",
        },
        {
            image: require('../../Assets/images/service-include/electrician.png'),
            type: "Electrician",
        },
        {
            image: require('../../Assets/images/service-include/massage.png'),
            type: "Massage",
        },
        {
            image: require('../../Assets/images/service-include/tutor.png'),
            type: "Tutor",
        },
        {
            image: require('../../Assets/images/service-include/cook.png'),
            type: "Cook",
        },


    ]
    // const nav = () => {
    //     if()
    // }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor, }}>
            {loader == true ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <ActivityIndicator size={30} color={Colors.themeColor} />
                </View>
            ) : (
                <>
                    <ScrollView nestedScrollEnabled={true}>
                        <NavigationHeaders onPress={() => { navigation.goBack() }} title="Services" />
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={serviceType}
                                keyExtractor={({ item, index }) => index}
                                renderItem={({ item, index }) => {
                                    return (

                                        <TouchableOpacity onPress={() => {
                                            if (item.category_status == 1) {
                                                navigation.navigate("MaidService")
                                            }
                                            else if (item.category_name === 'Plumbing') {

                                                navigation.navigate("PlumberService")
                                            }
                                        }} style={styles.card}>
                                            <Image source={require('../../Assets/images/banner/action.png')} style={styles.boxImage} />
                                            <View style={{ width: '50%', }}>
                                                <Text style={{ ...Fonts.blackColor17Bold, textAlign: 'left' }}>{item.category_name}</Text>
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

export default AllService

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
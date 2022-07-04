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
import NavigationHeaders from '../../Components/NavigationHeaders';

const AllService = ({ navigation }) => {

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
            <ScrollView nestedScrollEnabled={true}>
                <NavigationHeaders onPress={() => { navigation.goBack() }} title="Services" />
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={AllService}
                        keyExtractor={({ item, index }) => index}
                        renderItem={({ item, index }) => {
                            return (

                                <TouchableOpacity onPress={() => {
                                    if (item.type === 'Maid') {
                                        navigation.navigate("MaidService")
                                    }
                                    else if(item.type==='Plumber'){
                                        
                                        navigation.navigate("PlumberService")
                                    }
                                    else if(item.type==='Electrician'){
                                        
                                        navigation.navigate("ElectricianService")
                                    }
                                    else if(item.type==='Massage'){
                                        
                                        navigation.navigate("Massage")
                                    }
                                    else if(item.type==='Tutor'){
                                        
                                        navigation.navigate("Tutor")
                                    }
                                    else if(item.type==='Cook'){
                                        
                                        navigation.navigate("Cook")
                                    }
                                }} style={styles.card}>
                                    <Image source={item.image} style={styles.boxImage} />
                                    <View style={{ width: '50%', }}>
                                        <Text style={{ ...Fonts.blackColor17Bold, textAlign: 'left' }}>{item.type}</Text>
                                    </View>
                                    <Feather name="chevron-right" size={24} color="black" />
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </ScrollView>
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
        width: 80,
        height: 80,
        resizeMode: 'contain',
        borderRadius: 10
    }
})
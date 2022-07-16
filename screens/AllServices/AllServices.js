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
import React, { Component, useEffect, useState, useContext } from 'react'
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
    const [serviceType, setServiceType] = useState([])

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
        require('../../Assets/images/newServiceList/maid.jpg'),
        require('../../Assets/images/newServiceList/makeup.jpeg'),
        require('../../Assets/images/newServiceList/painter.jpg'),
        require('../../Assets/images/newServiceList/elect.jpg'),
        require('../../Assets/images/newServiceList/plumber.jpg'),
        require('../../Assets/images/newServiceList/carPainter.jpg'),
        require('../../Assets/images/newServiceList/driver.jpg'),
    ]

 
    // const nav = () => {
    //     if()
    // }



    // return (
    //     <Text>dfgdstyfgysd</Text>
    // )
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor, }}>
            {loader == true ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <ActivityIndicator size={30} color={Colors.themeColor} />
                </View>
            ) : (
                <>
                    <ScrollView nestedScrollEnabled={true} style={{ flexGrow: 1, paddingVertical: 20, }}>
                        <NavigationHeaders onPress={() => { navigation.goBack() }} title="Services" />
                        <View style={{ flex: 1, marginVertical: 20 }}>
                            <FlatList
                                data={serviceType}
                                keyExtractor={({ item, index }) => index}
                                renderItem={({ item, index }) => {
                                    return (

                                        <TouchableOpacity onPress={() => {
                                            if (item.category_name === "Maid") {
                                                navigation.navigate("MaidService", {
                                                    maidId: item._id
                                                })
                                            }
                                            else if (item.category_name === 'Plumbing') {

                                                navigation.navigate("PlumberService", {
                                                    plumberId: item._id
                                                })
                                            }
                                            else if (item.category_name === 'Painter') {

                                                navigation.navigate("Painter", {
                                                    PainterId: item._id
                                                })
                                            }
                                            else if (item.category_name === 'Painter') {

                                                navigation.navigate("Painter", {
                                                    PainterId: item._id
                                                })
                                            }
                                            else if (item.category_name === 'Electricians') {

                                                navigation.navigate("ElectricianService", {
                                                    ElectriciansId: item._id
                                                })
                                            }
                                            else if (item.category_name === 'Carpenters') {

                                                navigation.navigate("Carpenters", {
                                                    CarpentersId: item._id
                                                })
                                            }
                                        }} style={styles.card}>
                                            <Image source={AllService[index]} style={styles.boxImage} />
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
        resizeMode: 'cover',
        borderRadius: 10
    }
})
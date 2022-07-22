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

const ComonService = ({ route, navigation }) => {
    const servicetypeData = route.params.servicetypeData._id
    console.log(servicetypeData)
    const { authContext, appState } = useContext(AuthContext);
    const [loader, setLoader] = useState(false)
    const [serviceType, setServiceType] = useState([])

    const getServiceType = () => {
        setLoader(true)
        let data = {
            "category_id": servicetypeData
        }
        ApiService.PostMethode('service_types/get_service_type_by_category_id', data)
            .then(response => {
                console.log(response.data);
                setLoader(false)
                let apiValue = response.data
                let arr =[]
                apiValue.map(item => {
                    console.log("status",item.service_type_status)
                    if(item.service_type_status==1){
                        arr.push(item)
                    }
                    else{
                        return
                    }
                })
                setServiceType(arr)

            })
            .catch(error => {
                setLoader(false)
                console.log(error);
            })
    }
    useEffect(() => {
        getServiceType()
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
                        <NavigationHeaders onPress={() => { navigation.goBack() }} title="Service Type" />
                        <View style={{ flex: 1, marginVertical: 20 }}>
                            <FlatList
                                data={serviceType}
                                ListEmptyComponent={() => {
                                    return (
                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', marginTop: '30%' }}>
                                            <Text style={{
                                                ...Fonts.grayColor20Bold, textAlign: 'center',
                                            }}>Services will be available {"\n"} in your area soon</Text>
                                            <Image source={require('../../Assets/images/gif/serviceNotAvail.gif')}
                                                style={{ width: 350, height: 350, resizeMode: 'contain', }} />
                                        </View>
                                    )
                                }}
                                keyExtractor={({ item, index }) => index}
                                renderItem={({ item, index }) => {
                                    return (

                                        <TouchableOpacity onPress={() => {
                                            console.log(item.category_id)
                                            navigation.navigate("SelectService",{
                                                data:item
                                            })
                                        }} style={styles.card}>
                                            <Image source={require("../../Assets/images/newServiceList/maid.jpg")} style={styles.boxImage} />
                                            <View style={{ width: '50%', }}>
                                                <Text style={{ ...Fonts.blackColor17Bold, textAlign: 'left' }}>{item.service_type_name}</Text>
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

export default ComonService

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
    },
    image: {
        width: '100%',
        resizeMode: 'contain',
        alignSelf: 'center',
    }
})
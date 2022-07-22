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
import { Colors, Fonts, Sizes } from "../../../constant/style";
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient';
import NavigationHeaders from '../../../Components/NavigationHeaders';
import axios from 'axios';
import * as ApiService from '../../../Utils/Utils';
import AuthContext from '../../../Context/AuthContext';

const ServiceType = ({route, navigation }) => {

    const maidId = route.params.maidId
    console.log(maidId)

    const { authContext, appState } = useContext(AuthContext);
    const [loader, setLoader] = useState(false)
    const [serviceType, setServiceType] = useState([])

    const getServiceTypeById = () => {
        setLoader(true)
        let data = {
            "id":maidId

        }
        console.log("data", data);
        ApiService.PostMethode('service_types/get_service_type_by_category_id', data)
            .then(response => {
                console.log(response);
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
        getServiceTypeById()
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
                                keyExtractor={({ item, index }) => index}
                                renderItem={({ item, index }) => {
                                    return (

                                        <TouchableOpacity onPress={() => {
                                            if (item.service_type_name === "One Time") {
                                                navigation.navigate("OneTime", {
                                                    maidId: item._id
                                                })
                                            }
                                            else if (item.service_type_name === 'Subscriptions') {
                                                alert("coming soon")
                                                // navigation.navigate("Subscription", {
                                                //     plumberId: item._id
                                                // })
                                            }

                                        }} style={styles.card}>
                                            <Image source={require("../../../Assets/images/newServiceList/maid.jpg")} style={styles.boxImage} />
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

export default ServiceType

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
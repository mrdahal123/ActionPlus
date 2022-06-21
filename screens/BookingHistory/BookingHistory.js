// import {
//     SafeAreaView,
//     StatusBar,
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     TouchableOpacity,
//     BackHandler,
//     ScrollView,
//     ImageBackground,
//     TextInput,
//     FlatList
// } from 'react-native'
// import React, { Component, useState } from 'react'
// import { Colors, Fonts, Sizes } from "../../constant/style";
// import { Feather } from 'react-native-vector-icons/Feather';

// const BookingHistory = ({navigation}) => {
//     let bookingDetails = [
//         {
//             image: require('../../Assets/images/Services/full-home-cleaning.jpg'),
//             type: "Full Home Cleaning",
//             id: 'MRN893813',
//             DateTime: ' 19-07-2022  09:05 am',
//         },
//         {
//             image: require('../../Assets/images/Services/car-cleaning.jpg'),
//             type: "car Cleaning",
//             id: 'MRN893813',
//             DateTime: ' 19-07-2022  10:05 am',
//         },
//         {
//             image: require('../../Assets/images/Services/bathroom-cleaning.jpg'),
//             type: "Bathroom Cleaning",
//             id: 'MRN893813',
//             DateTime: ' 19-07-2022  02:05 pm',
//         },
//         {
//             image: require('../../Assets/images/Services/kitchen-cleaning.jpg'),
//             type: "Kitchen Cleaning",
//             id: 'MRN893813',
//             DateTime: ' 19-07-2022  6:00 pm',
//         },
//         {
//             image: require('../../Assets/images/Services/carpet-cleaning.jpg'),
//             type: "Carpet Cleaning",
//             id: 'MRN893813',
//             DateTime: ' 19-07-2022  05:05 pm',
//         },
//         {
//             image: require('../../Assets/images/Services/sofa-cleaning.jpg'),
//             type: "Sofa Cleaning ",
//             id: 'MRN893813',
//             DateTime: ' 20-07-2022  12:05 pm',
//         },
//     ]
//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor, }}>
//             <View style={{ flex: 1 }}>
//                 <FlatList
//                     data={bookingDetails}
//                     keyExtractor={({ item, index }) => index}
//                     renderItem={({ item, index }) => {
//                         return (
//                             <View>
//                                 <TouchableOpacity onPress={() => { navigation.navigate("BookingDetails",{
//                                     bookingId:item.id
//                                 }) }} style={styles.card}>
//                                     <Image source={item.image} style={styles.boxImage} />
//                                     <View style={{ flexDirection: 'column', alignItems: 'flex-start',marginRight:'20%' }}>
//                                         <Text style={{ ...Fonts.blackColor20Bold, }}>{item.type}</Text>
//                                         <Text style={{ color: '#F9B551', marginVertical: 5 }}>{item.id}</Text>
//                                         <Text style={{ color: '#696969' }}>{item.DateTime}</Text>
//                                     </View>
//                                     <Feather name="chevron-right" size={24} color="black" />
//                                 </TouchableOpacity>
//                             </View>
//                         )
//                     }}
//                 />
//             </View>
//         </SafeAreaView>
//     )
// }



// const styles = StyleSheet.create({
//     card: {
//         width: '90%',
//         height: 110,
//         alignSelf: 'center',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: 10,
//         borderRadius: 10,
//         marginVertical: 10,
//         flexDirection: 'row',
//         backgroundColor: '#fff',
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 5,
//         },
//         shadowOpacity: 0.34,
//         shadowRadius: 6.27,
//         elevation: 10,
//     },
//     boxImage: {
//         width: 60,
//         height: 60,
//         resizeMode: 'contain',
//         borderRadius: 10,
//         borderWidth: 1,
//         backgroundColor: '#000',
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 5,
//         },
//         shadowOpacity: 0.34,
//         shadowRadius: 6.27,
//         elevation: 10,
//     }
// })
// export default BookingHistory


import React, { Component, useState } from 'react'
import { Colors, Fonts, Sizes } from "../../constant/style";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native'

const BookingHistory = ({ navigation }) => {

    let bookingData = [
        {
            image: require('../../Assets/images/Services/full-home-cleaning.jpg'),
            type: "Full Home Cleaning",
            id: 'MRN893813',
            DateTime: ' 19-07-2022  09:05 am',
        },
        {
            image: require('../../Assets/images/Services/car-cleaning.jpg'),
            type: "car Cleaning",
            id: 'MRN893813',
            DateTime: ' 19-07-2022  10:05 am',
        },
        {
            image: require('../../Assets/images/Services/bathroom-cleaning.jpg'),
            type: "Bathroom Cleaning",
            id: 'MRN893813',
            DateTime: ' 19-07-2022  02:05 pm',
        },
        {
            image: require('../../Assets/images/Services/kitchen-cleaning.jpg'),
            type: "Kitchen Cleaning",
            id: 'MRN893813',
            DateTime: ' 19-07-2022  6:00 pm',
        },
        {
            image: require('../../Assets/images/Services/carpet-cleaning.jpg'),
            type: "Carpet Cleaning",
            id: 'MRN893813',
            DateTime: ' 19-07-2022  05:05 pm',
        },
        {
            image: require('../../Assets/images/Services/sofa-cleaning.jpg'),
            type: "Sofa Cleaning ",
            id: 'MRN893813',
            DateTime: ' 20-07-2022  12:05 pm',
        },
    ]
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor, }}>
            <View style={{ flex: 1 }}>

                <FlatList
                    data={bookingData}
                    keyExtractor={({ item, index }) => index}
                    renderItem={({ item, index }) => {
                        console.log(item)
                        return (
                            <View>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("Booking")
                                }} style={styles.card}>
                                    <Image source={item.image} style={styles.boxImage} />

                                    <View style={{ width: '50%', }}>
                                        <Text style={{ ...Fonts.blackColor17Bold, textAlign: 'left' }}>{item.type}</Text>
                                        <Text style={{ color: '#F9B551', marginVertical: 5 }}>ID : {item.id}</Text>
                                        <Text style={{ color: '#696969' }}>{item.DateTime}</Text>
                                    </View>

                                    <AntDesign name="right" size={24} color="#000" />
                                </TouchableOpacity>

                            </View>
                        )
                    }} />

            </View>
        </SafeAreaView>
    )
}

export default BookingHistory

const styles = StyleSheet.create({
    boxImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 10
    },
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
})
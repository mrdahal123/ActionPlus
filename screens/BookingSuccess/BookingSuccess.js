
import React, { useEffect, useState } from 'react'
import { StyleSheet,  View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import GlobalButton from '../../Components/GlobalButton';
import { Colors, Fonts, Sizes } from "../../constant/style";
import Text from '../../Components/Text';

const BookingSuccess = ({ route, navigation }) => {
    const [userId, seUsertId] = useState('')
    // console.log("sdfd",route.params.data)
    // useEffect(() => {
    // let responseApi = route.params.data
    // console.log("responseApi", responseApi);

    // }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            {/* <Image
                source={require('../../Assets/images/banner/graphic.png')}
                style={{ width: 200, height: 200, resizeMode: "contain", position: 'absolute', right: -30, }} /> */}
            <Image source={require('../../Assets/images/banner/color-spark.jpg')} style={{ width: 300, height: 300, alignSelf: 'center', marginTop: '38%', resizeMode: 'contain' }} />
            <Image source={require('../../Assets/images/banner/sign.png')} style={{ width: 120, height: 120, resizeMode: 'contain', alignSelf: 'center', position: 'absolute', top: '46%' }} />

            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', top: '62%', alignSelf: 'center' }}>
                <Text style={{ ...Fonts.blackColor20Bold, marginVertical: 15 }}>Booking Successful</Text>
                {/* {responseApi && <Text style={{ ...Fonts.grayColor18Bold, marginVertical: 5, textAlign: 'center' }}>Your Booking Id is {"\n"} # {responseApi}</Text>} */}
                <Text style={{ ...Fonts.blackColor16Bold, textAlign: 'center',marginVertical: 5 }}>Our representative will contact you shortly .</Text>

                <GlobalButton inlineStyle={{ alignSelf:'center',marginVertical:10}} title={'Okay'} onPress={() => navigation.navigate('HomeScreen')} />


            </View>
        </SafeAreaView>
    )
}

export default BookingSuccess

const styles = StyleSheet.create({
    image: {
        width: '30%',
        height: '30%',
        resizeMode: 'contain',

    },
    continueButtonStyle: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        alignItems: 'center',
        alignSelf: 'center',
        minWidth: '40%',
        borderRadius: 25,
        justifyContent: 'center',

        marginVertical: 20
    },
})
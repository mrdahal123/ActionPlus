import React from 'react'
import { StyleSheet,  View, SafeAreaView, Image, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import { Colors, Fonts } from '../../constant/style';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import NavigationHeaders from '../../Components/NavigationHeaders';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../Components/Text';
import GlobalButton from '../../Components/GlobalButton';

const DeepCleaning = ({ route, navigation }) => {

    let serviceName = route.params.serviceType
    let arr = []
    arr.push(serviceName)
    // let catId = route.params.catId
    console.log(serviceName);

    const serviceInfo = [
        { type: "All rooms cobweb removal." },
        { type: "Sanitization of Dustbins." },
        { type: "Dinning table & chairs dustings & cleaning." },
        { type: "Hall sofa dusting , cleaning & Vacuuming." },
        { type: "TV cabinet ,book shelves, curtains dusting & cleaning." },
        { type: "All doors, Handles , tower bolt dusting and wiping with dry and wet cloth. " },
        { type: "All  wooden cupboards inside & outside dusting cleaning and vacuuming." },
        { type: "All electrical fixtures light , fan and fittings cleaning." },
        { type: "All kitchen cabinets dusting from inside and out side and vacuuming." },
        { type: "Dusting and wiping kitchen plat form & Gas stove." },
        { type: "Kitchen Chimney cleaning (Exterior). " },
        { type: "Wall marks to be cleaned." },
        { type: "Mirror ,glass and windows cleaning." },
        { type: "All balcony's sweeping and mopping .       " },
        { type: "All washrooms floor & tiles hand scrubbing, Mirror cleaning and water wash and mopping.  " },
        { type: "Railings dusting and cleaning. " },
        { type: "All rooms dry mop and wet mop and scrubbed with machine. " },
        { type: "All the dustbins have been emptied from the rooms return the large plastic bin to a designated point for disposal." }
    ]
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor, padding: 20 }}>
            <StatusBar backgroundColor={Colors.themeColor} />
            <View style={[styles.headerWrap,{ justifyContent:'space-around',marginRight:5}]}>
                    <NavigationHeaders title={serviceName.serviceName} onPress={() => {navigation.goBack() }}/>
                    </View>
            <FlatList
                data={serviceInfo}
                showsVerticalScrollIndicator={false}
                keyExtractor={({ item, index }) => index}
                renderItem={({ item, index }) => {
                    return (
                        <>
                            <View style={[styles.headerWrap, { width: '92%' }]}>
                                <Feather name='check-circle' size={25} color={Colors.themeColor} />
                                <Text style={[Fonts.blackColor14Bold, { marginLeft: 10 }]}>{item.type}</Text>
                            </View>
                        </>
                    )
                }} />

            <GlobalButton title={"Continue"} onPress={() => {
                navigation.navigate('SlotBooking', {
                    data: arr
                })
            }}/>
            {/* <TouchableOpacity style={styles.TimeButton} >

                <Text style={[Fonts.blackColor16Bold, { color: '#fff' }]}>Continue</Text>
            </TouchableOpacity> */}
        </SafeAreaView>
    )
}

export default DeepCleaning

const styles = StyleSheet.create({
    headerWrap: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 5,
        paddingHorizontal: 5
    },
    text:
    {
        textAlign: 'center', marginLeft: '20%', fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    TimeButton: {
        padding: 15,
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 18,
        // alignSelf: 'center',
        backgroundColor: '#F9B551',
        borderRadius: 10,
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 2.27,
        elevation: 5,
    },

})
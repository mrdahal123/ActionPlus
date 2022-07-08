import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar ,TouchableOpacity} from 'react-native'
import { Colors, Fonts } from '../../constant/style';
import AntDesign from 'react-native-vector-icons/AntDesign'
import NavigationHeaders from '../../Components/NavigationHeaders';

const DeepCleaning = ({ route,navigation }) => {
    let serviceType= route.params.serviceName
    console.log(serviceType);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor, padding: 20 }}>
            <StatusBar backgroundColor={Colors.themeColor} />
            <View style={styles.headerWrap}>
                <AntDesign name="arrowleft" size={24} color="black" onPress={() => { navigation.goBack() }} />
                <Text style={styles.text}>Deep Cleaning Service {"\n"} (with machine)</Text>
            </View>
            <Text style={{flex:1,justifyContent:'center',alignItems:'center',textAlign:'center',marginTop:'100%'}}>All details will be available by tommorow</Text>
        <TouchableOpacity style={styles.TimeButton} onPress={()=>{navigation.navigate('SlotBooking',{
            serviceName:serviceType
        })}}>
            
            <Text>Continue</Text>
        </TouchableOpacity>
        </SafeAreaView>
    )
}

export default DeepCleaning

const styles = StyleSheet.create({
    headerWrap: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row'
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
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#F9B551",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 2.27,
        elevation: 5,
    },

})
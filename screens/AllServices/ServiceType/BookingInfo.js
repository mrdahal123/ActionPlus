import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar } from 'react-native'
import { Colors, Fonts } from '../../../constant/style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import NavigationHeaders from '../../../Components/NavigationHeaders';

const BookingInfo = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar backgroundColor={Colors.themeColor} />
      <View style={{ width: '100%',padding:20 }}>
        <NavigationHeaders title={"Booking Info"} onPress={()=>{navigation.goBack()}}/>
        <MaterialCommunityIcons name="home" color={'#000'} size={25} style={{alignSelf:'flex-end',marginTop:-30}} onPress={()=>{navigation.navigate("HomeScreen")}} />
      </View>
      <Text style={{
        ...Fonts.grayColor20Bold,
        textAlign: 'center',
        marginVertical:20,
      }}>
        {/* Plumbing */}
        working on this page {"\n"}please have some patience</Text>

      <Image
        source={require('../../../Assets/images/gif/serviceNotAvail.gif')}
        // style={{width:'100%',justifyContent:'center',alignItems:'center',}}
        style={styles.image}
        resizeMode='contain'
      />
    </SafeAreaView>
  )
}

export default BookingInfo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    justifyContent: "center",
    alignItems: 'center',
  },
  appLogoStyle: {
    width: 180.0,
    height: 180.0,
    justifyContent: 'center',
    resizeMode: 'contain',
    position: 'relative',
    alignSelf: 'center'
  },
  image:{width:'100%',
  resizeMode:'contain',
  alignSelf:'center',
}
})
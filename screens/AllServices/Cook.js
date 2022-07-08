import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar } from 'react-native'
import { Colors, Fonts } from '../../constant/style';
import AntDesign from 'react-native-vector-icons/AntDesign'

const Cook = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar backgroundColor={Colors.themeColor} />
      <View style={{ width: '100%' }}>
        <Image
          source={require('../../Assets/images/banner/graphic.png')}
          style={{ width: 200, height: 200, resizeMode: "contain", position: 'absolute', right: -30, }} />
        <AntDesign name="arrowleft" size={24} color="black" style={{ padding: 20, }} onPress={() => { navigation.goBack() }} />
      </View>
      <Image
        source={require('../../Assets/images/banner/logo-top.jpg')}
        style={styles.appLogoStyle}
        resizeMode='contain'
      />
     <Text style={{
        ...Fonts.grayColor20Bold,
        textAlign: 'center',
        marginVertical:20,
      }}>  Services will be available {"\n"} in your area soon</Text>


      <Image
        source={require('../../Assets/images/service-include/common.png')}
        style={styles.image}
        resizeMode='contain'
      />
    </SafeAreaView>
  )
}

export default Cook

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
  image:{
   flexGrow:1,
    resizeMode:'contain',
    alignSelf:'center',
    marginBottom:200
  }
})
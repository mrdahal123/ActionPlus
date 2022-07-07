import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
const NavigationHeaders = ({
    onPress,
    title,
}) => {

    return (
      < >
      <AntDesign name="arrowleft" size={24} color="black" style={{ position:'absolute',top:5,left:10,zIndex:500}} onPress={onPress} />
            <Text style={styles.txetHeader}>{title}</Text>
      </>
            
    )
}

export default NavigationHeaders

const styles = StyleSheet.create({
    header: {
       alignSelf:'center'
    },
    txetHeader:{
        fontSize:18,
        fontWeight:'bold',
        color:'#000',
        textAlign:'center',
        position:'relative',
        zIndex:1,
    }
})
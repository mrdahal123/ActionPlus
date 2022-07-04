import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
const NavigationHeaders = ({
    onPress,
    title,
}) => {

    return (
        <View style={styles.header}>
            <AntDesign name="arrowleft" size={24} color="black" style={{ marginLeft: 15 }} onPress={onPress} />
            <Text style={styles.txetHeader}>{title}</Text>
            <TouchableOpacity>

            </TouchableOpacity>
        </View>
    )
}

export default NavigationHeaders

const styles = StyleSheet.create({
    header: {
        width: '100%',
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txetHeader:{
        fontSize:18,
        fontWeight:'bold',
        color:'#000'
    }
})
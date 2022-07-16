import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const selectAddButtons = () => {
    return (
        <View style={styles.checkButton}>
            <LinearGradient
                colors={['#F9B551', '#F87B2C']}
                style={[styles.continueButtonStyle, { minWidth: 30, opacity: values.addType == 'Other' ? 1 : 0.7 }]}>
                <TouchableOpacity onPress={() =>
                    setFieldValue('addType', 'Other')
                }>
                    <Text style={{ ...Fonts.whiteColor16Bold }}>Other</Text>
                </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
                colors={['#F9B551', '#F87B2C']}
                style={[styles.continueButtonStyle, { minWidth: 30, opacity: values.addType == 'Home' ? 1 : 0.7 }]}>
                <TouchableOpacity onPress={() =>
                    setFieldValue('addType', 'Home')
                }>
                    <Text style={{ ...Fonts.whiteColor16Bold }}>Home</Text>
                </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
                colors={['#F9B551', '#F87B2C']}
                style={[styles.continueButtonStyle, { minWidth: 30, opacity: values.addType == 'Work' ? 1 : 0.7 }]}>
                <TouchableOpacity onPress={() =>
                    setFieldValue('addType', 'Work')
                }>
                    <Text style={{ ...Fonts.whiteColor16Bold }}>Work</Text>
                </TouchableOpacity>
            </LinearGradient>

        </View>
    )
}

export default selectAddButtons

const styles = StyleSheet.create({
    checkButton: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignSelf: 'center',
        marginVertical: 10,
    },
})
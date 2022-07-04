import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React from 'react'
import { Colors } from '../constant/style'

const CustomTextInput = ({
    icon,
    type = 'input',
    placeholder,
    value,
    onChangeText,
    isErrors,
    isTouched,
    style,
    iconType = 'image',
    placeholderTextColor,
    keyboardType,
    ...props
}) => {
    return (

        <>
            <View style={styles.textInput}>
                {icon && iconType === 'image' ? <Image source={icon} style={{ width: 25, height: 25, resizeMode: 'contain', }} /> : icon}
                <TextInput
                    style={{ width: '100%',color:'#000' }}
                    secureTextEntry={type == 'password' ? true : false}
                    placeholder={placeholder}
                    value={value}
                    placeholderTextColor={placeholderTextColor}
                    keyboardType={keyboardType}
                    onChangeText={(text) => {
                        onChangeText(text)
                    }}
                    {...props}
                />
                {type == 'password' && <Image source={require('../Assets/images/banner/eye.png')} style={{ width: 25, height: 25, resizeMode: 'contain' }} />}

            </View>
            {isErrors && isTouched &&
                <View
                    style={{
                        width: '90%',
                        alignSelf: 'center',
                        paddingTop: 10,
                    }}>
                    <Text style={{ fontSize: 12, color: 'red' }}>
                        {isErrors}
                    </Text>
                </View>
            }
        </>
    )
}

export default CustomTextInput;

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: Colors.whiteColor,
        marginTop: 30,
        paddingVertical: 5,
        paddingHorizontal:15,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 25,
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
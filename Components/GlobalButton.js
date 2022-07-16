import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors, Fonts, Sizes } from "../constant/style";

const GlobalButton = ({
  onPress,
  title,
  inlineStyle,
}) => {
  return (
    <TouchableOpacity
     style={[styles.continueButtonStyle,{ paddingVertical: 10, marginTop: 5 ,...inlineStyle}]}
       onPress={onPress}>
        <Text style={{ ...Fonts.whiteColor16Bold, textAlign: 'center' }}>{title}</Text>
    </TouchableOpacity>
  )
}

export default GlobalButton

const styles = StyleSheet.create({
  
  continueButtonStyle: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: Colors.themeColor,
    minWidth: '30%',
    alignSelf: "flex-end",
    borderRadius: 8,
},
})
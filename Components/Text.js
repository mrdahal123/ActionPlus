import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {GlobalColor} from '../../constants/Colors';
import {GlobalFontSize} from '../../constants/FontSize';
export default props => (
  <Text
    {...props}
    style={[
      {
        // fontFamily: props.Bold ? 'Roboto-Bold' : 'Roboto-Regular',
        fontSize: 16,
        color:"#000",
      },
      props.style,
    ]}>
    {props.children}
  </Text>
);

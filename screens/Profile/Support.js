import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Colors, Fonts} from '../../constant/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Text from '../../Components/Text';
import NavigationHeaders from '../../Components/NavigationHeaders';
const Support = ({navigation}) => {
  return (
    <SafeAreaView
      style={{flex: 1, padding: 20, backgroundColor: Colors.whiteColor}}>
      <StatusBar backgroundColor={Colors.themeColor} />
      <View style={{marginVertical: 15}}>
        <NavigationHeaders
          onPress={() => {
            navigation.goBack();
          }}
          title="Support"
        />
      </View>

      <View style={{marginVertical: 50}}>
        <Text
          style={{
            ...Fonts.grayColor20Bold,
            textAlign: 'center',
          }}>
          {' '}
          For More information{' '}
        </Text>
        <Text
          style={{
            ...Fonts.grayColor24Regular,
            textAlign: 'center',
          }}>
          {' '}
          Please Contact
        </Text>
        <TouchableOpacity
          style={styles.TimeButton}
          onPress={() => {
            Linking.openURL(`tel:${9866492689}`);
          }}>
          <Ionicons name="call-sharp" size={35} color="#fff" />
          <Text
            style={{
              ...Fonts.grayColor26Regular,
              textAlign: 'center',
            }}>
            9866492689
          </Text>
        </TouchableOpacity>
        <Image
          source={require('../../Assets/images/service-include/support.jpg')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

export default Support;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appLogoStyle: {
    width: 180.0,
    height: 180.0,
    justifyContent: 'center',
    resizeMode: 'contain',
    position: 'relative',
    alignSelf: 'center',
  },
  image: {
    flexGrow: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 200,
  },
  TimeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    padding: 15,
    alignItems: 'center',
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: '#F9B551',
    borderRadius: 40,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 2.27,
    elevation: 5,
  },
});

import {StyleSheet,Text, SafeAreaView, ScrollView,View} from 'react-native';
import React from 'react';
import NavigationHeaders from '../../../Components/NavigationHeaders';

import {Colors, Fonts, Sizes} from '../../../constant/style';

const TermsOfUse = ({navigation,props}) => {
  return (
    <SafeAreaView style={{flex: 1,backgroundColor:Colors.whiteColor }}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
      <View style={{marginVertical: 15,right:10}}>
          <NavigationHeaders
            onPress={() => {
              navigation.goBack();
            }}
            title="Terms of Use"
          />
        </View>
        <Text style={styles.text}>
          <View style={styles.dot}/>  By agreeing to these terms of use, the customer agrees to behave in an
          appropriate manner with the worker and not torture the worker mentally
          or physically in any way Action Plus strictly prohibits the users of
          our application from discriminating on the basis of religion, race,
          caste, sex, place of birth, descent, sexual orientation, gender
          identity, disability, age or any of them. {'\n'}{'\n'}
          MyChores will not tolerate
          any adverse discrimination against any person on its platform,
          premises, whether that person is in its employment or otherwise. All
          valuables including cash, jewelry, items of sentimental value, art,
          antiques must be kept safe and secured. We shall not be held
          responsible if any valuables are lost. Any unsatisfactory services
          need to be reported within 24 hours of the service delivery.{'\n'}{'\n'}  The
          company will not be held responsible for any complain after 24 hours
          of service delivery. We do not move or clean heavy objects,
          electronics goods cabinets or similar item. if it need be, Customer
          need to arrange at their own cost. Cabinets, Cupboards and Storage
          areas will not be cleaned from inside, if it need be, Customer has to
          empty such places for our team to clean such places. Precaution must
          be taken to remove/cover food stuff while cleaning the premises to
          prevent contamination with chemical. Service does not include cleaning
          of bio hazard materials and wastes, or Human/animal excrement.  {'\n'}{'\n'}
          ActionPlus reserves the rights to change the price unless the customer
          has paid in full. We reserve the right not to be responsible for delay
          for a cleaning visit due to act of god, traffic congestion, postponed
          service due to broken equipment, job not complete due to lack of hot
          water or power and suitable cleaning materials, third party entering
          or present at Client's premises obstructing the cleaning process. {'\n'}{'\n'}
          Customer is not entitled for any refund in part or full once the
          service is delivered. Action Plus shall not by any means be or become
          liable to the customers for any damage suffered by them directly or
          indirectly through the presence of pest in the premise contracted The
          customer cannot ask the worker to execute services other than the ones
          the worker has been booked for as per the scope of work in the
          online/written communication. If the worker is asked to do additional
          work, it is up to the worker to agree to such work, at a cost
          additional to the existing pay that the customer shall be liable to
          pay Customer agrees to cooperate if actual time required at the
          location is more than the standard time
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsOfUse;

const styles = StyleSheet.create({
    text:{
      marginTop:10,
      textTransform:'capitalize',
      textAlign:"justify",
      lineHeight:25,
      color:'#000',
      fontSize:13,
      letterSpacing:0.8,
    },
    wrapper:{
      paddingHorizontal:25
    },
    dot:{
      width:10,
      height:10,
      backgroundColor:Colors.themeColor,
      borderRadius:100
    }
});

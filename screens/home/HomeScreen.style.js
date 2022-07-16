import { StyleSheet, } from 'react-native'
import { Colors, Fonts, Sizes } from "../../constant/style";

export const styles = StyleSheet.create({
    location: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        
    },
    logo:{
        width:40,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colors.themeColor,
        borderRadius:100,
       
       
    },
    iconCircle :{
        width:80,
        height:80,
        borderWidth:4,
        borderRadius:100,
        borderColor:Colors.grayLight,
        justifyContent:'center',
        alignItems:'center'
    },
    iconImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    iconImageBanner: {
        width: '60%',
        height: '60%',
        resizeMode: 'contain',
    },
    imgShadow:{
        borderRadius:100,
        backgroundColor:Colors.themeColor,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6.27,
        elevation: 10,
    },
    locationWrapper:{
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:3,
        borderRadius:100,
        borderColor:Colors.grayLight,
    },
    carouselimg: {
        width:'90%',
        height:180,
        borderRadius:10,
        alignSelf:'center',
        resizeMode:'contain',
        
      },
    carousel: {
        height: 200,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        zIndex: 1,
       marginHorizontal:10,
       alignSelf:'center',
        marginVertical:15,
        borderRadius:10
      },
    imgBanner:{
        width:'100%',
        height:180,
        borderRadius:10,
        alignSelf:'center',
        resizeMode:'contain',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    textInput: {
        backgroundColor: Colors.whiteColor,
        marginVertical: 20,
        padding: 15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        color:'#000'
    },
    continueButtonStyle: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: Colors.primaryColor,
        maxWidth: '50%',
        alignSelf: "flex-end",
        borderRadius: 25,
    },
    container: {
        backgroundColor: Colors.whiteColor,
        flex: 1,
    },
    wrapper: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    serviceType: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginVertical:10
    },
    locationWrap:{ flexDirection: 'row',alignItems:'center',justifyContent:'center',}
})
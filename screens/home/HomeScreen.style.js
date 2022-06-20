import { StyleSheet, } from 'react-native'
import { Colors, Fonts, Sizes } from "../../constant/style";

export const styles = StyleSheet.create({
    location: {
        width: '100%',
        paddingVertical: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },
    logo:{
        width:60,
        height:60,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colors.themeColor,
        borderRadius:100,
       
    },
    iconImage: {
        width: 60,
        height: 60,
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
    imgBanner: {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10
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
        paddingVertical: 30,
        paddingHorizontal: 20
    },
    serviceType: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center'
    }
})
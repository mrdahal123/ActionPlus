import { StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/style";

export const styles = StyleSheet.create({
    profile: {
        width: 150,
        height: 150,
        borderRadius: 100,
        alignSelf: 'center',
        marginVertical: 20
    },
    cameraIcon:{
        position:"absolute",
        justifyContent:'center',
        alignSelf:'center',
        top:'77%',
        left:'60%',
        borderRadius:100,
        borderWidth:1,
        borderColor:Colors.themeColor,
        padding:10,
        backgroundColor:Colors.themeColor,
    },
    continueButtonStyle: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 12,
        alignItems:'center',
        backgroundColor: Colors.primaryColor,
        minWidth: '30%',
        alignSelf: "flex-end",
        borderRadius: 25,
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
})
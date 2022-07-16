import { StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/style";

export const styles = StyleSheet.create({
    profile: {
        width: 120,
        height: 120,
        borderRadius: 100,
        alignSelf: 'center',
        marginVertical: 20
      },
    cameraIcon:{
        position:"absolute",
        justifyContent:'center',
        width:45,
        height:45,
        alignSelf:'center',
        top:'11%',
        left:'70%',
        borderRadius:100,
        borderWidth:1,
        borderColor:Colors.themeColor,
        padding:10,
        backgroundColor:Colors.themeColor,
    },
    // choseOption:{
    //     flexDirection:'row',

    // },
    textInput: {
        backgroundColor: Colors.whiteColor,
        marginTop: 30,
        padding: 15,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
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
        elevation: 5,
    },
    continueButtonStyle: {
        marginTop: 20,
        flexDirection:'row',
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
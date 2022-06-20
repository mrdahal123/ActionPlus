import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from "../../constant/style";

const PrivacyPolicy = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={{ ...Fonts.blackColor18Bold, marginBottom: 10 }}>Welcome to Action Plus Company's Privacy policy .</Text>
                <Text style={{ ...Fonts.blackColor14Bold, lineHeight: 25, letterSpacing: 0.5, textAlign: 'left' }}>
                    Action Plus consider the privacy and protec- tion of our clients' data, both corporate and personal,
                    to be of the utmost importance and we take robust measures across our
                    business to protect the security and integrity of all such information.
                    However, the law requires us to take particular steps  in relation to the processing
                    and protection of personal data. To ensure that you feel confident about providing
                    us with your personal information when communicating with us and using our services,
                    we outline below our practices in relation to the collection and use of personal data.
                    This policy (together with our terms of use and any other documents referred to on it)
                    sets out the basis on which we will collect, use and process personal data. Please read
                    this Privacy Policy carefully to ensure you understand how we handle your personal data;
                    please also check this page from time to time as the Policy may be updated.
                    INFORMATION WE MAY COLLECT FROM YOU
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default PrivacyPolicy

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        padding: 25,
    },
    wrapper: {
        padding: 20,
        // paddingVertical:25,
        marginVertical: 20,
        backgroundColor: Colors.whiteColor,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6.27,
        elevation: 10,
        borderRadius: 10
    }
})
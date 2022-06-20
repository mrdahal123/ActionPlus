import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    ImageBackground,
    TextInput,
    FlatList
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Fonts, Sizes } from "../../constant/style";
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

const SlotBooking = ({ navigation }) => {

    const [bookingTime, setBookingTime] = useState('')
    const [bookingDate, setBookingDate] = useState('')
    const [checked, setChecked] = useState(false)

    const handleSubmit = () => {
        if (bookingDate !== '' && bookingTime !== '') {
            navigation.navigate('SelectAdd')
            console.log("your booking date and time is", bookingDate, bookingTime)
        }
        else {
            alert("select a date and time for your maid please")
        }
        console.log(bookingDate, bookingTime)
    }

    const time = [{
        "id": "1",
        "time": "08:00 AM",
        "status": "Booked",
    },
    {
        "id": "2",
        "time": "09:00 AM",
    },
    {
        "id": "3",
        "time": "10:00 AM",
    },
    {
        "id": "4",
        "time": "11:00 AM",
    },
    {
        "id": "5",
        "time": "04:00 AM",
    },
    {
        "id": "6",
        "time": "05:00 PM",
    },
    { "id": "7", "time": "06:00 PM", },
    { "id": "8", "time": "07:00 PM", },
    { "id": "9", "time": "08:00 PM", },

    ]
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.themeColor} />
            <ImageBackground
                source={require('../../Assets/images/banner/background.png')}
                style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
                <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingVertical: 20,
                    }}>
                    <Text style={{ ...Fonts.blackColor20Bold, textAlign: 'center', marginTop: 50 }}>Select date and time</Text>

                    <View style={styles.calenderContainer}>
                        <CalendarPicker
                            onDateChange={(date) => setBookingDate(moment(date).format("MMM Do YY"))}
                            // onMonthChange={(month)=> (new Date(month))}
                            disabledDatesTextStyle={{ fontWeight: "700" }}
                            previousTitleStyle={{ color: '#4174D0', fontWeight: '700', paddingHorizontal: 15 }}
                            nextTitleStyle={{ color: '#4174D0', fontWeight: '700', paddingHorizontal: 15 }}
                            selectedDayColor={'#F9B551'}
                            selectedDayStyle={{ backgroundColor: '#F9B551' }}
                            selectedDayTextColor="red"
                            selectedDayTextStyle={{ color: "#fff", fontWeight: '700' }}
                        />
                    </View>
                    <Text style={{ ...Fonts.blackColor20Bold, padding: 15 }}>-12 Slots Available</Text>
                    <FlatList
                        scrollEnabled={false}
                        data={time}
                        numColumns={3}
                        keyExtractor={({ item, index }) => index}
                        renderItem={({ item, index }) => {

                            return (
                                <TouchableOpacity onPress={() => {
                                    setBookingTime(item.time)
                                    setChecked(item.id)
                                }} style={[styles.TimeButton, { backgroundColor: checked == item.id ? '#F9B551' : "#fff" }]}>
                                    <Text style={{ color: checked == item.id ? '#fff' : '#000' }}>{item.time}</Text>
                                </TouchableOpacity>
                            )
                        }
                        }
                    />

                    {/* Button */}
                    <LinearGradient
                        colors={['#F9B551', '#F87B2C']}
                        style={styles.continueButtonStyle}>
                        <TouchableOpacity
                            onPress={() =>
                                handleSubmit()
                            }>
                            <Text style={{ ...Fonts.whiteColor16Bold }}>Book Now</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default SlotBooking

const styles = StyleSheet.create({
    calenderContainer: {
        marginVertical: 20,
        borderWidth: 1,
        width: '90%',
        borderRadius: 15,
        alignSelf: 'center',
        borderColor: "#efefef",
        backgroundColor: '#fff',
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 5,
    },
    TimeButton: {
        padding: 15,
        marginLeft: 30,
        marginVertical: 10,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
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
        paddingHorizontal: 20,
        paddingVertical: 12,
        alignItems: 'center',
        minWidth: '30%',
        alignSelf: "flex-end",
        borderRadius: 25,
        justifyContent: 'center',
        marginHorizontal: 20,
    },
})



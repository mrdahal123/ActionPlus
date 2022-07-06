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
import React, { useCallback, useEffect, useState } from 'react'
import { Colors, Fonts, Sizes } from "../../constant/style";
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { date } from 'yup';
import NavigationHeaders from '../../Components/NavigationHeaders';

const SlotBooking = ({ navigation }) => {

    const [bookingTime, setBookingTime] = useState('')
    const [bookingDate, setBookingDate] = useState(new Date())
    const [checked, setChecked] = useState(false)

    // const [newTime, setNewTime] = useState()
    const [time, setTime] = useState('')

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

    // useEffect(() => {
    //     let dt = moment();
    //     dt.format("hh:mm a")
    //     let formatedTime = (moment(dt, "HH:mm:ss").format("hh:mm A"))

    //     setNewTime(formatedTime)
    // }, [])

    const createTImeSlot = useCallback((start, end) => {
        var startTime = moment(start, 'HH:mm');
        var endTime = moment(end, 'HH:mm');

        if (endTime.isBefore(startTime)) {
            endTime.add(1, 'day');
        }

        var timeStops = [];

        while (startTime <= endTime) {
            timeStops.push(new moment(startTime).format('HH:mm'));
            startTime.add(60, 'minutes');
        }
        return timeStops;
    }, []);


    useEffect(() => {
        var slots;
        let today = moment().format("MMM Do YY");
        let checkdate = moment(bookingDate).format("MMM Do YY");
        let now = moment().endOf('hour');

        now = now.add(1, 'minutes').format("HH:mm");

        console.log('bookingDate', bookingDate);
        console.log(checkdate);
        console.log(today);

        if (checkdate === today) {
            slots = createTImeSlot(now, '20:00');
        } else {
            slots = createTImeSlot('08:00', '20:00');
        }

        setTime(slots);
    }, [bookingDate])

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
                    <NavigationHeaders onPress={() => { navigation.goBack() }} title="Select date and time" />
                    {/* <Text style={{ ...Fonts.blackColor20Bold, textAlign: 'center', marginTop: 50 }}></Text> */}

                    <View style={styles.calenderContainer}>
                        <CalendarPicker
                            onDateChange={(date) => setBookingDate(date)}
                            minDate={new date()}
                            // onMonthChange={(month)=> (new Date(month))}
                            customDayHeaderStyles={{ color: "red" }}
                            previousTitleStyle={{ color: '#4174D0', fontWeight: '700', paddingHorizontal: 15 }}
                            nextTitleStyle={{ color: '#4174D0', fontWeight: '700', paddingHorizontal: 15 }}
                            selectedDayColor={'#F9B551'}
                            // showDayStragglers={{color:'red'}}
                            selectedDayStyle={{ backgroundColor: '#F9B551' }}
                            selectedDayTextColor="red"
                            selectedDayTextStyle={{ color: "#fff", fontWeight: '700' }}
                        />
                    </View>
                    <Text style={{ ...Fonts.blackColor20Bold, padding: 15 }}>Slots Available For Booking</Text>
                    <FlatList
                        scrollEnabled={false}
                        data={time}
                        numColumns={3}
                        keyExtractor={({ item, index }) => index}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setBookingTime(item)
                                        setChecked(item)
                                    }}
                                    // disabled={item.id == dateIndex ? true :false}
                                    style={[styles.TimeButton, { backgroundColor: checked == item ? '#F9B551' : "#fff" }]}>
                                    {/* <Text style={{ color: checked == item ? '#fff' : '#000' }}>{item}</Text> */}
                                    <Text style={{ color: checked == item ? '#fff' : '#000' }}>{moment(item, 'HH:mm').format("hh:mm a")}</Text>
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
        shadowColor: "#F9B551",
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
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 18,
        // alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#F9B551",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 2.27,
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



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
import Slider from '@react-native-community/slider';
const SlotBooking = ({ route, navigation }) => {
    const serviceType = route.params.serviceName
    console.log("serviceType", serviceType);


    const [bookingTime, setBookingTime] = useState('')
    const [bookingDate, setBookingDate] = useState(new Date())
    const [checked, setChecked] = useState(false)
    const [checkedFlat, setCheckedFlat] = useState('')
    const [squareFeet, setSquareFeet] = useState('')
    const [finalPrice, setFinalPrice] = useState('')
    const [flatType, setFlatType] = useState([])
    // const [DeepClean, setDeepClean] = useState('')

    // const [newTime, setNewTime] = useState()
    const [time, setTime] = useState('')

    // console.log("DefgdfaufugepClean",DeepClean);
    const handleSubmit = () => {
        if (bookingDate !== '' && bookingTime !== '' && checkedFlat!=='') {
            let format = moment(bookingDate).format('L');
            navigation.navigate('SelectAdd', {
                data: {
                    serviceType,
                    bookingTime,
                    format,
                    flatType,
                    finalPrice,
                    squareFeet,
                    finalPrice
                }
            })
            console.log("your booking date and time is", bookingDate, bookingTime)
        }
        else {
            alert("Please select all field")
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

    const flatData = [
        { flatType: '2 BHK', id: '1', mins: '60' },
        { flatType: '2.5 BHK', id: '2', mins: '75' },
        { flatType: '3.0 BHK', id: '3', mins: '90' },
        { flatType: '4.0 BHK', id: '4', mins: '120' },
        { flatType: 'Duplex', id: '5', mins: '150' },
    ]

    const deepClean = [
        { flatType: '2 BHK', mins: '210', serviceCharge: '3499' },
        { flatType: '2.5 BHK', mins: '240', serviceCharge: '3999' },
        { flatType: '3.0 BHK', mins: '270', serviceCharge: '4499' },
        { flatType: '4.0 BHK', mins: '300', serviceCharge: '5499' },
        { flatType: 'Duplex', mins: '390', serviceCharge: '7999' },
    ]



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
                // contentContainerStyle={{
                //     // flex: 1,
                //     marginVertical: 30,
                // }}
                >
                    <View style={{ marginVertical: 15 }}>
                        <NavigationHeaders onPress={() => { navigation.goBack() }} title="Select date and time" />

                    </View>


                    <View style={styles.calenderContainer}>
                        <CalendarPicker
                            onDateChange={(date) => setBookingDate(date)}
                            minDate={new date()}
                            // onMonthChange={(month)=> (new Date(month))}
                            customDayHeaderStyles={{ color: "red" }}
                            previousTitleStyle={{ color: '#4174D0', fontWeight: '700', paddingHorizontal: 20 }}
                            nextTitleStyle={{ color: '#4174D0', fontWeight: '700', paddingHorizontal: 20 }}
                            selectedDayColor={'#F9B551'}
                            // showDayStragglers={{color:'red'}}
                            selectedDayStyle={{ backgroundColor: '#F9B551' }}
                            selectedDayTextColor="red"
                            selectedDayTextStyle={{ color: "#fff", fontWeight: '700' }}
                        />
                    </View>
                    {serviceType === 'Deep Cleaning ' ? null : <Text style={{ ...Fonts.blackColor20Bold, padding: 15 }}>Please complete your booking </Text>}

                    {serviceType === 'Deep Cleaning ' ? null : <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignItems: 'center', alignSelf: 'center', marginVertical: 15 }}>

                        <Text style={{ ...Fonts.FontColor16Bold }}><Text style={{ color: Colors.themeColor }}>Sft </Text>{squareFeet}</Text>
                        <Text style={Fonts.FontColor16Bold}><Text style={{ color: Colors.themeColor }}>2.50 ₹ </Text>per/sft</Text>
                    </View>}

                    {serviceType === 'Deep Cleaning ' ? null : (
                        <View style={styles.sliderContainer}>
                            <Slider
                                style={{ width: '100%', }}
                                minimumValue={100}
                                step={5}
                                thumbTintColor={Colors.themeColor}
                                onValueChange={(value) => {
                                    setSquareFeet(value)
                                    let squareFeet = value
                                    let price = squareFeet * 2.50
                                    let finalPrice = price + (price * (18 / 100))
                                    console.log("finalPriceAfterGSt", finalPrice);
                                    setFinalPrice(finalPrice)
                                }}
                                maximumValue={1000}
                                minimumTrackTintColor={Colors.themeColor}
                                maximumTrackTintColor="#000000"
                            />
                        </View>
                    )}

                    <View>
                        <Text style={{ ...Fonts.blackColor18Bold, padding: 15 }}>Please select your flat type</Text>
                        <FlatList
                            data={serviceType === 'Deep Cleaning ' ? deepClean : flatData}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={({ item, index }) => index}
                            renderItem={({ item, index }) => {
                                console.log(item)
                                return (
                                    <>
                                        <TouchableOpacity
                                            onPress={
                                                () => {
                                                    let arr = []
                                                    arr.push(item)
                                                    setFlatType(arr)
                                                    setCheckedFlat(item)
                                                    console.log("item", arr)
                                                    serviceType === 'Deep Cleaning ' ? setFinalPrice(item.serviceCharge):null
                                                }}
                                            style={[styles.TimeButton, { backgroundColor: checkedFlat.flatType == item.flatType ? '#F9B551' : "#fff" }]}>
                                            <Text>{item.flatType}</Text>
                                        </TouchableOpacity>
                                    </>
                                )
                            }} />

                    </View>

                    <View style={[styles.TimeButton,]}>
                        {flatType.length > 0 ? flatType.map(Element => {
                            console.log(Element)
                            return (
                                <>
                                    <Text style={{ ...Fonts.blackColor16Bold, paddingVertical: 10 }}>
                                    {/* {serviceType === 'Deep Cleaning ' ?setFinalPrice(Element.serviceCharge ) : finalPrice} */}
                                        final amount includeing 18% GST is <Text style={{ color: Colors.themeColor, textAlign: 'center' }}>
                                            {serviceType === 'Deep Cleaning ' ? Element.serviceCharge : finalPrice} ₹</Text></Text>
                                    <Text style={{ ...Fonts.blackColor16Bold, padding: 15 }}>Duration of service  is <Text style={{ color: Colors.themeColor, textAlign: 'center' }}>
                                        {Element.mins} Mins</Text></Text>
                                       
                                </>
                            )
                        }) : null}

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
    sliderContainer: {
        width: '95%',
        paddingVertical: 15,
        backgroundColor: '#000',
        borderRadius: 10,
        shadowColor: "#F9B551",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 2.27,
        elevation: 5,
        alignSelf: 'center'
    }

})

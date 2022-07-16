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
import GlobalButton from '../../Components/GlobalButton';
const SlotBooking = ({ route, navigation }) => {
    const serviceType = route.params.serviceName
    const serviceId = route.params.catId
    console.log("serviceType", serviceType);


    const [bookingTime, setBookingTime] = useState('')
    const [bookingDate, setBookingDate] = useState(new Date())
    const [checked, setChecked] = useState(false)
    const [checkedFlat, setCheckedFlat] = useState('')
    const [squareFeet, setSquareFeet] = useState('')
    const [finalPrice, setFinalPrice] = useState('')
    const [flatType, setFlatType] = useState([])
    const [price, setPrice] = useState('')
    const [gst, setGst] = useState('')
    // const [DeepClean, setDeepClean] = useState('')

    // const [newTime, setNewTime] = useState()
    const [time, setTime] = useState([])

    // console.log("DefgdfaufugepClean",DeepClean);
    const handleSubmit = () => {
        if (bookingDate !== '' && bookingTime !== '' && checkedFlat !== '') {
            let format = moment(bookingDate).format('L');
            navigation.navigate('SelectAdd', {
                data: {
                    serviceType,
                    bookingTime,
                    format,
                    flatType,
                    finalPrice,
                    squareFeet,
                    serviceId
                }
            })
            console.log("your booking date and time is", bookingDate, bookingTime,)
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
        setTime('');
        var slots = [];
        let today = moment().format("MMM Do YY");
        let checkdate = moment(bookingDate).format("MMM Do YY");
        let now = moment().endOf('hour');

        now = now.add(1, 'minutes').format("HH:mm");



        if (checkdate === today) {
            if ((now.split(':')[0] < 20) && (now.split(':')[0] > 7)) {
                slots = createTImeSlot(now, '20:00');
            }

        } else {
            slots = createTImeSlot('08:00', '20:00');
        }

        console.log('slots', slots);

        setTime(slots);
    }, [bookingDate])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor, paddingVertical: 15 }}>
            <StatusBar backgroundColor={Colors.themeColor} />
            {/* <ImageBackground
                source={require('../../Assets/images/banner/background.png')}
                style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff', paddingVertical: 10 }}> */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginVertical: 15 }}>
                    <NavigationHeaders onPress={() => { navigation.goBack() }} title="Select date and time" />

                </View>


                <View style={styles.calenderContainer}>
                    <CalendarPicker
                        onDateChange={(date) => setBookingDate(date)}
                        minDate={new date()}
                        // onMonthChange={(month)=> (new Date(month))}
                        customDayHeaderStyles={{ color: "red" }}
                        // previousComponent={<AntDesign name='left'/>}
                        // nextComponent={<AntDesign name='right'/>}
                        previousTitleStyle={{ color: '#F9B551', fontWeight: '700', paddingHorizontal: 20 }}
                        previousTitle={null}

                        nextTitleStyle={{ color: '#F9B551', fontWeight: '700', paddingHorizontal: 20 }}
                        selectedDayColor={'#F9B551'}
                        // showDayStragglers={{color:'red'}}
                        selectedDayStyle={{ backgroundColor: '#F9B551' }}
                        selectedDayTextColor="red"
                        selectedDayTextStyle={{ color: "#fff", fontWeight: '700' }}
                    />
                </View>


                {serviceType === 'Deep Cleaning ' ? null : (
                    <View style={styles.sliderContainer}>
                        <Text style={{ ...Fonts.blackColor20Bold, padding: 15, textAlign: 'center' }}>Please complete your booking </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignItems: 'center', alignSelf: 'center', marginVertical: 15 }}>

                            <Text style={{ ...Fonts.FontColor16Bold, fontSize: 18 }}><Text style={{ color: Colors.themeColor, fontSize: 18 }}>Sq.ft </Text>{squareFeet}</Text>
                            <Text style={{ ...Fonts.FontColor18Bold, fontSize: 18 }}><Text style={{ color: Colors.themeColor, fontSize: 18 }}>2.50 ₹ </Text>per/sq.ft</Text>
                        </View>
                        <Slider
                            style={{ width: '100%', }}
                            minimumValue={100}
                            step={5}
                            thumbTintColor={Colors.themeColor}
                            onValueChange={(value) => {
                                setSquareFeet(value)
                                let squareFeet = value
                                let price = squareFeet * 2.50
                                setPrice(price)
                                let Gst = price * (18 / 100)
                                setGst(Gst)
                                let finalPrice = price + Gst
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
                                                serviceType === 'Deep Cleaning ' ? setFinalPrice(item.serviceCharge) : null
                                            }}
                                        style={[styles.TimeButton, { backgroundColor: checkedFlat.flatType == item.flatType ? '#fff9fa' : Colors.grayLightColor, borderWidth: 0.5, borderColor: checkedFlat.flatType == item.flatType ? Colors.themeColor : Colors.grayLightColor }]}>
                                        <Text style={{ color: '#000' }}>{item.flatType}</Text>
                                    </TouchableOpacity>
                                </>
                            )
                        }} />

                </View>

                {flatType.length > 0 ? flatType.map(Element => {
                    console.log(Element)
                    return (
                        <View style={[styles.TimeButton, { flexDirection: 'column' }]}>
                            {serviceType === 'Deep Cleaning ' ? null: (
                                <>
                                    <View style={styles.priceContainer}>
                                        <Text style={{ ...Fonts.blackColor14Bold, }}>
                                            Charge :  </Text>
                                        <Text>
                                            {price} ₹
                                        </Text>
                                    </View>

                                    <View style={styles.priceContainer}>
                                        <Text style={{ ...Fonts.blackColor14Bold, }}>
                                            Gst (18%) :  </Text>
                                        <Text>
                                            {gst} ₹
                                        </Text>
                                    </View>
                                </>
                            )}
                            <View style={styles.priceContainer}>
                                <Text style={{ ...Fonts.blackColor14Bold, }}>
                                    Total Amount : </Text>
                                <Text style={{ color: Colors.themeColor, }}>
                                    {serviceType === 'Deep Cleaning ' ? Element.serviceCharge : finalPrice} ₹</Text>
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={{ ...Fonts.blackColor14Bold, }}>
                                    Duration of service  is : </Text>
                                <Text style={{ color: Colors.themeColor, }}>
                                    {Element.mins} Mins </Text>
                            </View>
                        </View>

                        // <View style={[styles.TimeButton, { flexDirection: 'column' }]}>
                        //     <View style={{ flexDirection: 'row', justifyContent: 'space-between',width:'100%' }}>
                        //         <Text style={{ ...Fonts.blackColor14Bold, paddingVertical: 10 }}>
                        //             Charge  </Text>
                        //         <Text>
                        //             : {price} /-
                        //         </Text>
                        //         <View style={{ flexDirection: 'row', justifyContent: 'space-between',width:'100%' }}>
                        //         <Text>
                        //             Gst (18%)
                        //         </Text>
                        //         <Text>
                        //             {gst}
                        //         </Text>
                        //         </View>
                        //         <Text>
                        //             {/* GST (18%) And Total Amount is  */}
                        //             <Text style={{ color: Colors.themeColor, }}>
                        //                 {serviceType === 'Deep Cleaning ' ? Element.serviceCharge : finalPrice} ₹</Text></Text>
                        //     </View>

                        //     <Text style={{ ...Fonts.blackColor16Bold, padding: 15 }}>Duration of service  is <Text style={{ color: Colors.themeColor, }}>
                        //         {Element.mins} Mins</Text></Text>

                        // </View>
                    )
                }) : null}
                <Text style={{ ...Fonts.blackColor20Bold, padding: 15 }}>Preferred time For Booking</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'flex-start', marginHorizontal: 5 }}>
                    {time.length > 0 ?
                        time.map(item => (

                            <TouchableOpacity
                                onPress={() => {
                                    setBookingTime(item)
                                    setChecked(item)
                                }}
                                style={[styles.TimeButton, { backgroundColor: checked == item ? '#fff9fa' : Colors.grayLightColor, borderWidth: 0.5, borderColor: checked == item ? Colors.themeColor : Colors.grayLightColor }]}>

                                <Text style={{ color: '#000' }}>{moment(item, 'HH:mm').format("hh:mm a")}</Text>
                            </TouchableOpacity>



                        ))



                        : <Text style={{ ...Fonts.blackColor16Bold, padding: 15 }}>Booking  Is Not Available Please Select Another Date</Text>
                    }
                </View>


                {/* Button */}

                <GlobalButton inlineStyle={{ marginRight: 20, marginBottom: 10 }} title={'Book Now'} onPress={() =>
                    handleSubmit()
                } />
            </ScrollView>
            {/* </ImageBackground> */}
        </SafeAreaView >
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
        marginHorizontal: 15,
        flexDirection: 'row',
        backgroundColor: Colors.grayLightColor,
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
    priceContainer:
        { width: '100%', justifyContent: 'space-between', padding: 15, flexDirection: 'row' },

    // continueButtonStyle: {
    //     paddingHorizontal: 20,
    //     paddingVertical: 12,
    //     alignItems: 'center',
    //     minWidth: '30%',
    //     alignSelf: "flex-end",
    //     borderRadius: 25,
    //     justifyContent: 'center',
    //     marginHorizontal: 25,
    //     marginBottom: 5
    // },
    sliderContainer: {
        width: '90%',
        paddingVertical: 15,
        marginHorizontal: 20,
        backgroundColor: Colors.grayLightColor,
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

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const SliderImage = [
  // "https://source.unsplash.com/1024x768/?nature",
  // "https://source.unsplash.com/1024x768/?water",
  // "https://source.unsplash.com/1024x768/?girl",
  // "https://source.unsplash.com/1024x768/?tree", // Network image
  require('../Assets/images/banner/newBanner.jpg'), // Local
  require('../Assets/images/banner/newBanner2.jpg'), // Local image
  require('../Assets/images/banner/action+banner3.jpg'), // Local image
  require('../Assets/images/banner/action+banner4.jpg'), // Local image
];

const data = [
  {
    title: 'Aenean leo',
    body: 'Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
    imgUrl: 'https://picsum.photos/id/11/200/300',
  },
  {
    title: 'In turpis',
    body: 'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
    imgUrl: 'https://picsum.photos/id/10/200/300',
  },
  {
    title: 'Lorem Ipsum',
    body: 'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
    imgUrl: 'https://picsum.photos/id/12/200/300',
  },
];
const CarouselCardItem = ({item, index}) => {
  return (
    <TouchableOpacity
      onPress={console.log('hello')}
      style={styles.container}
      key={index}>
      <Image source={item} style={styles.image} />
      {/* <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text> */}
    </TouchableOpacity>
  );
};

const CarouselCards = () => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  return (
    <View
      style={{
        height:200,
        marginTop:30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
 
      }}>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        loop={true}
        autoplay={true}
        ref={isCarousel}
        data={SliderImage}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={index => setIndex(index)}
        useScrollView={true}></Carousel>
      {/* <View style={{position: 'absolute', top: '70%'}}> */}
        <Pagination
          dotsLength={SliderImage.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 10,
            height: 5,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
            position: 'relative',
            zIndex: 100,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      {/* </View> */}
    </View>
  );
};

export default CarouselCards;

const styles = StyleSheet.create({
    container: {
      borderRadius: 8,
      width: "100%",
  
    },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius:5,
  },
});

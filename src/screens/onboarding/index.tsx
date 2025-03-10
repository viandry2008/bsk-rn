import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import Colors from '../../styles/colors';
import BtnCustom from '../../components/btnCustom';

const {width, height} = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Welcome to Our App',
    description: 'This is a sample onboarding screen in React Native.',
    image: require('../../assets/images/onboard/img_intro_1.png'),
  },
  {
    id: '2',
    title: 'Easy to Use',
    description: 'Our app is simple and user-friendly.',
    image: require('../../assets/images/onboard/img_intro_2.png'),
  },
  {
    id: '3',
    title: 'Get Started Now',
    description: 'Sign up and start exploring today!',
    image: require('../../assets/images/onboard/img_intro_3.png'),
  },
];

const Onboard: React.FC = ({navigation}: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
      setCurrentIndex(nextIndex);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({item, index}) => (
          <View style={styles.page}>
            {/* Atur gambar agar halaman ketiga berada di atas */}
            <Image
              source={item.image}
              style={index === 2 ? styles.topImage : styles.image}
            />
            {index === 2 ? <View style={{height: 265}} /> : false}
            <Text style={styles.title}>{item.title}</Text>
            {index < 2 ? (
              <Text style={styles.description}>{item.description}</Text>
            ) : null}
            <View style={{marginTop: 32, backgroundColor: 'red'}} />
            {index < 2 ? (
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <View style={styles.indicatorContainer}>
                  {onboardingData.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.indicator,
                        currentIndex === index && styles.activeIndicator,
                      ]}
                    />
                  ))}
                </View>
                <BtnCustom
                  title="NEXT"
                  onPress={handleNext}
                  paddingHorizontal={32}
                />
              </View>
            ) : (
              <View style={{width: '100%', alignItems: 'center'}}>
                <BtnCustom
                  title="GET STARTED"
                  onPress={() =>
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'MainHome'}],
                    })
                  }
                  paddingHorizontal={100}
                />
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},

  // Pastikan konten berada di tengah
  page: {
    width,
    height, // Gunakan tinggi layar penuh agar selalu di tengah
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Gambar default
  image: {width: 300, height: 300, resizeMode: 'contain'},

  // Gambar halaman ketiga (di atas layar)
  topImage: {
    width: width,
    height: height * 0.5,
    resizeMode: 'stretch',
    position: 'absolute',
    top: 0,
    // left: "50%",
    // transform: [{ translateX: -width * 0.4 }]
  },

  title: {fontSize: 24, fontWeight: 'bold', marginTop: 16, marginBottom: 16},
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },

  // Footer tetap di bawah layar dengan posisi absolut
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerCenter: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    // top: 16,
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    paddingHorizontal: 32,
  },

  indicatorContainer: {flexDirection: 'row'},
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeIndicator: {backgroundColor: Colors.primary},

  nextButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  nextButtonText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
});

export default Onboard;

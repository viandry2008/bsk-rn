import React, {useEffect, useRef} from 'react';
import {Animated, Image, View, StatusBar, StyleSheet} from 'react-native';
import Colors from '../../styles/colors';
// import ColorStyle from '../../styles/ColorStyle';

const SplashScreen = () => {
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }, [fadeIn]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Animated.View style={{opacity: fadeIn}}>
        <Image
          source={{
            uri: 'https://ebook-bsk-staging.resone.my.id:9010/ebookbsk/media/ivEsRzAZAjnUO1KsEbgRh69RFuoXniUXpDqVbY4J.png',
          }}
          style={styles.logoApp}
        />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoApp: {
    width: 160,
    height: 80,
    resizeMode: 'contain',
  },
});

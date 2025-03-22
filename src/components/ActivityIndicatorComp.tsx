import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const ActivityIndicatorComp = () => {
  return (
    <View style={{alignItems: 'center', marginVertical: 16}}>
      <ActivityIndicator size="large" color={Colors.black} />
    </View>
  );
};

export default ActivityIndicatorComp;

const styles = StyleSheet.create({});

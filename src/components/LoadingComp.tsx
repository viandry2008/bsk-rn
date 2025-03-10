import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {RFValue} from 'react-native-responsive-fontsize';
import Colors from '../styles/colors';

type Props = {
  loading: boolean;
};

const LoadingComp = ({loading}: Props) => {
  return (
    <Spinner
      visible={loading}
      textContent={'Harap tunggu...'}
      color={Colors.white}
      textStyle={{
        fontFamily: 'Inter_24pt-Medium',
        color: Colors.white,
        fontSize: RFValue(14),
      }}
    />
  );
};

export default LoadingComp;

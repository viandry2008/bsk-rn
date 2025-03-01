import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TextMask} from 'react-native-masked-text';
import {RFValue} from 'react-native-responsive-fontsize';
import RenderHtml from 'react-native-render-html';

type Props = {
  type: 'regular' | 'medium' | 'semibold' | 'bold';
  size: number;
  textAlign?: string;
  color: string;
  value: string;
  numberOfLines?: number;
  isPrice?: boolean;
  unitPrice?: any;
  isRender?: boolean;
};

const TextComp = ({
  type,
  size,
  textAlign,
  color,
  value,
  numberOfLines,
  isPrice,
  unitPrice,
  isRender,
}: Props) => {
  let textStyle: any;

  switch (type) {
    case 'regular':
      textStyle = styles.regular;
      break;
    case 'medium':
      textStyle = styles.medium;
      break;
    case 'semibold':
      textStyle = styles.semibold;
      break;
    case 'bold':
      textStyle = styles.bold;
      break;
    default:
      break;
  }
  return (
    <>
      {isRender ? (
        <RenderHtml
          allowedStyles={['color', 'fontFamily']}
          baseStyle={{color: color, fontFamily: 'Inter-Regular'}}
          source={{html: value}}
        />
      ) : (
        <>
          {isPrice == true ? (
            <TextMask
              type={'money'}
              options={{
                precision: 0,
                separator: '.',
                delimiter: '.',
                unit: unitPrice == undefined ? 'Rp ' : unitPrice,
                suffixUnit: '',
              }}
              value={value}
              numberOfLines={1}
              style={[
                textStyle,
                {
                  color: color,
                  fontSize: RFValue(size),
                },
              ]}
            />
          ) : (
            <Text
              numberOfLines={numberOfLines}
              style={[
                textStyle,
                {color: color, fontSize: RFValue(size), textAlign: textAlign},
              ]}>
              {value}
            </Text>
          )}
        </>
      )}
    </>
  );
};

export default TextComp;

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'Inter_24pt-Regular',
  },
  medium: {
    fontFamily: 'Inter_24pt-Medium',
  },
  semibold: {
    fontFamily: 'Inter_24pt-SemiBold',
  },
  bold: {
    fontFamily: 'Inter_24pt-Bold',
  },
});

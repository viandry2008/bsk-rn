import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../styles/colors';
import { Input } from '@rneui/themed';
// import Colors from '../../styles/colors';
// // import Font from '../../styles/fonts';

interface Props {
    focusRef?: any,
    title?: any,
    placholder?: any,
    icon?: any,
    lefticon?: any,
    rightIcon?: any,
    scureText?: any,
    titleCustom?: any,
    val?: any,
    editable?: any,
    change?: any,
    styled?: any,
    disabled?: any,
    bottomZero?: any,
    inputfocus?: any,
    press?: any,
    tkeyboard?: any,
    errorMsg?: any,
    errorMsgStyle?: any,
    caretHide?: any,
    borderBottom?: any,
    defVal?: any,
}


const CustomFormInput = ({
    focusRef,
    title,
    placholder,
    icon,
    lefticon,
    rightIcon,
    scureText,
    titleCustom,
    val,
    editable,
    change,
    styled,
    disabled,
    bottomZero,
    inputfocus,
    press,
    tkeyboard,
    errorMsg,
    errorMsgStyle,
    caretHide,
    borderBottom,
    defVal,
}: Props) => {
    return (
        <View>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {icon}
        {titleCustom ? (
          titleCustom
        ) : (
          <>
          <Text style={[Font.titleForm]}>{title}</Text>
          </>
        )}
      </View>
      <View style={{height:8}} /> */}
            <Input
                ref={focusRef}
                value={val}
                onChangeText={change}
                label={
                    titleCustom ? (
                        titleCustom
                    ) : (
                        <Text style={[{ marginBottom: 8 }]}>{title}</Text>
                    )
                }
                onPressIn={press}
                editable={editable}
                placeholder={placholder}
                // style={styled ? styled : [Font.medium16]}
                // style={{marginBottom: 0, paddingBottom: 0}}
                inputContainerStyle={
                    borderBottom
                        ? {
                            borderColor: Colors.container,
                            marginHorizontal: 0,
                            borderBottomWidth: 1,
                            borderRadius: 8,
                            paddingHorizontal: 8,
                            // bottom: 0,
                            // backgroundColor: 'red',
                            // marginBottom: -16,
                        }
                        : {
                            borderColor: Colors.container,
                            marginHorizontal: 0,
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingHorizontal: 8,
                            // bottom: 0,
                            // backgroundColor: 'red',
                            // marginBottom: -16,
                        }
                }
                errorMessage={errorMsg ? errorMsg : false}
                errorStyle={bottomZero ? bottomZero : { height: 0 }}
                containerStyle={icon ? { paddingHorizontal: 0 } : false}
                inputStyle={{ paddingHorizontal: 0 }}
                leftIcon={lefticon}
                leftIconContainerStyle={{ marginRight: 8 }}
                rightIcon={rightIcon}
                secureTextEntry={scureText}
                showSoftInputOnFocus={inputfocus}
                keyboardType={tkeyboard}
                disabled={disabled}
                caretHidden={caretHide}
                defaultValue={defVal}
            />
        </View>
    );
};

export default CustomFormInput;

const styles = StyleSheet.create({});

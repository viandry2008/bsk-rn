import React, { ReactNode } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    View,
    GestureResponderEvent,
} from 'react-native';
import Colors from '../styles/colors';

const { width } = Dimensions.get('window');

interface BtnCustomProps {
    title?: string;
    onPress?: (event: GestureResponderEvent) => void;
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: number;
    fontSize?: number;
    paddingVertical?: number;
    paddingHorizontal?: number;
    isOutline?: boolean;
    leftIcon?: ReactNode; // Ikon di sebelah kiri teks
    rightIcon?: ReactNode; // Ikon di sebelah kanan teks
    disabled?: boolean;
    disabledBackgroundColor?: string; // Warna latar saat disabled
    disabledTextColor?: string; // Warna teks saat disabled
}

const BtnCustom = ({
    title = '',
    onPress = () => { },
    backgroundColor = Colors.primary,
    textColor = '#fff',
    borderRadius = 14,
    fontSize = 14,
    paddingVertical = 12,
    paddingHorizontal = width * 0.06,
    isOutline = false,
    leftIcon = null,
    rightIcon = null,
    disabled = false,
    disabledBackgroundColor = Colors.container, // Default warna saat disabled
    disabledTextColor = Colors.placeholder, // Default warna teks saat disabled
}: BtnCustomProps) => {
    const currentBackgroundColor = disabled
        ? disabledBackgroundColor
        : isOutline
            ? 'transparent'
            : backgroundColor;

    const currentTextColor = disabled
        ? disabledTextColor
        : isOutline
            ? backgroundColor
            : textColor;

    return (
        <TouchableOpacity
            onPress={!disabled ? onPress : undefined}
            style={[
                styles.button,
                {
                    backgroundColor: currentBackgroundColor,
                    borderColor: backgroundColor,
                    borderWidth: isOutline ? 1 : 0,
                    borderRadius,
                    paddingVertical,
                    paddingHorizontal,
                },
            ]}
            disabled={disabled} // Nonaktifkan interaksi saat disabled
        >
            {leftIcon && (
                <View style={[styles.iconContainer, { marginRight: 8 }]}>
                    {leftIcon}
                </View>
            )}
            <Text
                style={[
                    // Font.medium14,
                    { color: currentTextColor, fontSize },
                ]}
            >
                {title}
            </Text>
            {rightIcon && (
                <View style={[styles.iconContainer, { marginLeft: 8 }]}>
                    {rightIcon}
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row', // Memungkinkan ikon kiri dan kanan
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        // margin dinamis ditentukan berdasarkan posisi ikon
    },
});

export default BtnCustom;

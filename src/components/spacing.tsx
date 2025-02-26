import React from 'react';
import { View, StyleSheet } from 'react-native';

interface SpacingProps {
    size?: number; // Ukuran spasi, dengan default 16
    horizontal?: boolean; // Jika true, spasi akan horizontal (lebar)
}

const Spacing: React.FC<SpacingProps> = ({ size = 16, horizontal = false }) => {
    return (
        <View style={{ [horizontal ? 'width' : 'height']: size }} />
    );
};

export default Spacing;

import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';
import Colors from '../../styles/colors';

const Privacy = ({ navigation }: any) => {

    return (
        <SafeAreaView style={styles.wrap}>
            <StatusBar backgroundColor="transparent" barStyle={'dark-content'} translucent />
            <ScrollView showsVerticalScrollIndicator={false}>
                
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrap: { flex: 1, backgroundColor: Colors.white, padding: 16 },
});

export default Privacy;

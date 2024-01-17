import React from 'react';
import { StyleSheet, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Color from '../Constant/Color'

const Loader = (props) => {
    return (
         <SafeAreaView style={styles.container}>
            <ActivityIndicator color={Color.Loader} style={styles.loader} size="large" />
         </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        justifyContent: 'center',
    },
    loader: {
        backgroundColor:'transparent',
        color: Color.Loader
    }
});

export default Loader;
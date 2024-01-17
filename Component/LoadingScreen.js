import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Dimensions,
    View
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Color from '../Constant/Color';
import Loader from './Loader';

const LoadingScreen = (props) => {
    return (
        <SafeAreaView>
            <View style={styles.container} >
                <Loader />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: Color.BackgroundColor,
        justifyContent: 'center'
    },
});

export default LoadingScreen;
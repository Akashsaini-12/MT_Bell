import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated,StyleSheet } from 'react-native';
import * as OwnerAction from '../Screen/Store/Action/Owner';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ToggleButton = ({ phoneNumber }) => {
  const [isToggled, setIsToggled] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();
  const loginUserDetail = useSelector(state => state.Owner.login);
  const signupUserDetail = useSelector(state => state.Owner.FetchDataSuccess);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    Animated.timing(slideAnim, {
      toValue: isToggled ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    if (!isToggled) {
      pushNotification(phoneNumber);
    }
  };
  const pushNotification = async (num) => {
    await dispatch(OwnerAction.getDeviceToken(num, loginUserDetail?.data?.auth || signupUserDetail?.data?.auth));
    const token = await AsyncStorage.getItem('getDeviceTokon');
    await dispatch(OwnerAction.sendNotification(token, num))
  }

  const leftPosition = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });

  return (
    <TouchableOpacity onPress={handleToggle} style={styles.container1}>
      <View style={styles.outerBox}>
        <Animated.View style={[styles.innerBox, { left: leftPosition }]} />
        <Text style={styles.label}>{isToggled ? 'Ring' : ''}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
container1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerBox: {
    width: 100,
    height: 40,
    backgroundColor: '#000000',
    borderRadius: 20,
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: -20
  },
  innerBox: {
    width: 40,
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 20,
    position: 'absolute',
  },
  label: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    right: 15,
    bottom: 10,
  },
})

export default ToggleButton;

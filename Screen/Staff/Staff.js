import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Alert, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import messaging from '@react-native-firebase/messaging';
import { useSelector, useDispatch } from 'react-redux';
import notifee, { AndroidImportance } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';

import LoadingScreen from '../../Component/LoadingScreen';
import Colors from '../../Constant/Color';
import * as OwnerAction from '../Store/Action/Owner';
import GradientButton from '../../Component/Button';
import Font from '../../Constant/Font';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Staff = ({ navigation, }) => {

  const [isLoading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [completeDate, setCompleteDate] = useState('');
  const [name, setName] = useState();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const userDetail = useSelector(state => state.Owner.login)
  const [show, setShow] = useState(false);

  useEffect(() => {
    getDeviceToken();
  }, [isFocused]);

  useEffect(() => {
    async function fetchData() {
      const userToken = await AsyncStorage.getItem('authLoginTokon');
      const name = await AsyncStorage.getItem('authName');
      setName(name)
      setLoading(false);
      dispatch(OwnerAction.getUserDetail(userToken || signAuth))
    }
    fetchData()
  }, [isFocused]);

  const getDeviceToken = async () => {
    const token = await messaging().getToken();
    const auth = await AsyncStorage.getItem('authLoginTokon',);
    await dispatch(OwnerAction.postDeviceTokon(userDetail?.data?.phoneNumber, token, auth))
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      setShow(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const currentHour = date.getHours();
      const currentMinute = date.getMinutes();
      const currentSecond = date.getSeconds();
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const currentDayOfWeek = daysOfWeek[date.getDay()];
      const formattedDate = moment(date).format('DD MMMM YYYY');
      const formattedTime = moment(date).format('hh:mm A');

      setCurrentTime(formattedTime);

      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Good Morning');
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }

      setCurrentDay(currentDayOfWeek);
      setCompleteDate(formattedDate);
    };

    updateTime();

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [isFocused]);

  // async function onDisplayNotification(data) {
  //   if (Platform.OS === 'ios') {
  //     await notifee.requestPermission()
  //   }
  //   const channelId = await notifee.createChannel({
  //     id: "Default9",
  //     name: 'Default Channel 9',
  //     sound: "ringtone",
  //     importance: AndroidImportance.HIGH
  //   });
  //   await notifee.displayNotification({
  //     title: '<b>Do You Want to Accept/ Reject</b>',
  //     subtitle: '',
  //     body:
  //       'This Notification come from Owner',
  //     android: {
  //       channelId,
  //       color: "#598e50",
  //       actions: [
  //         {
  //           title: '<b>Accept</b>',
  //           pressAction: { id: 'Accepted' },
  //         },
  //         {
  //           title: '<b>Reject</b>',
  //           pressAction: { id: 'Reject' },
  //         },
  //       ],
  //     },
  //   });
  // }

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold On", "Are you sure you want to go back ?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Yes", onPress: () => { BackHandler.exitApp() } },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove(); // Remove the event listener when the component unmounts
    };
  }, []);

  const handleAcceptReject = (actionId) => {
    if (actionId === 'Accepted' || actionId === 'Reject') {
      notifee.cancelAllNotifications();
    }
    if (actionId === 'Accepted') {

    } else if (actionId === 'Reject') {

    }
  }
  return (
    isLoading ? <LoadingScreen /> :
      <ScrollView>
        <View style={styles.background}>
          <View style={styles.container}>
            <Text style={[styles.wel_start_text, { marginTop: 30 }]}>Hello, {name}</Text>
            <Text style={[styles.wel_start_text,]}>{greeting}</Text>
          </View>
          <View style={{ justifyContent: 'flex-end', flexDirection: "row", marginRight: 15 }}>
            <Text style={[styles.dateStyle,]}>{currentDay} , </Text>
            <View>
              <Text style={[styles.dateStyle,]}>{completeDate}</Text>
              <Text style={[styles.dateStyle,]}>{currentTime}</Text>
            </View>
          </View>
          {show && (<View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.showButton}>
              <View style={{ width: '40%' }}>
                <GradientButton
                  title="Accept"
                  onPress={() => { setShow(false), handleAcceptReject('Accepted') }}
                  fontSize={18}
                />
              </View>
              <View style={{ width: '40%' }}>
                <GradientButton
                  title="Reject"
                  onPress={() => { setShow(false), handleAcceptReject('Reject') }}
                  fontSize={18}
                />
              </View>
            </View>
          </View>
          )}
        </View>
      </ScrollView>
  )
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#DADADA',
    flex: 1,
    height: windowHeight,
    width: "100%",
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: Colors.Headerbackgroud,
    width: windowWidth,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 50,
    color: Colors.white,
    marginBottom: 25
  },
  wel_start_text: {
    // color: '#fff',
    // fontSize: 25,
    // fontWeight: 'bold',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 40,
    lineHeight: 50,
    color: '#1F1F1F',
  },
  button: {
    width: '40%',
    height: 40,
    backgroundColor: Colors.greenButton,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 20,
    marginRight: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: Font.large,
    fontWeight: 'bold'
  },
  showButton: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    alignItems: 'center'
  },
  dateStyle: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '200',
    fontSize: 20,
    color: '#797979',
  }
})

export default Staff
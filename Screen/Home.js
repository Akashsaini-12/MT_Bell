import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import '../notifeeConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Video from './Video';
import Svg, { Circle, Path } from 'react-native-svg';
import GradientButton from '../Component/Button';
import getVideoId from 'get-video-id';
import YoutubePlayer from "react-native-youtube-iframe";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const { width, height } = Dimensions.get('window');
const vidID = getVideoId('https://youtu.be/pfXURG0LrYM');

const Home = (props) => {
  const tiltOffset = width * 0.19;
  const tiltOffset1 = width * -0.6;
  const tiltOffset2 = width * 0.05;
  const topOffset = 70;

  useEffect(() => {
    getDeviceToken();
  }, []);

  const getDeviceToken = async () => {
    const token = await messaging().getToken();
    // console.log(token, 'token');
    AsyncStorage.setItem('Token', token);
    let Token = await AsyncStorage.getItem('Token');
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      onDisplayNotification(remoteMessage);
    });
    return unsubscribe;
  }, []);

  async function onDisplayNotification(data) {
    if (Platform.OS === 'ios') {
      await notifee.requestPermission();
    }
    const channelId = await notifee.createChannel({
      id: 'Default9',
      name: 'Default Channel 9',
      sound: 'ringtone',
      importance: AndroidImportance.HIGH,
    });
    await notifee.displayNotification({
      title: '<b>Do You Want to Accept/ Reject</b>',
      subtitle: '',
      body: 'This Notification come from Owner',
      android: {
        channelId,
        color: '#598e50',
        actions: [
          {
            title: '<b>Accept</b>',
            pressAction: { id: 'Accepted' },
          },
          {
            title: '<b>Reject</b>',
            pressAction: { id: 'Reject' },
          },
        ],
      },
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
        <Path
          d={`M0,0 L${width + tiltOffset1},0 A${width - tiltOffset2},${width} 0 0,0 ${width},${height - topOffset} Q${width / 2},${height} 0,${height} Z`}
          fill="#DADADA"
        />
      </Svg>

      <View style={styles.textContainer}>
        <View style={styles.headContainer}>
          <Text style={styles.head}>Welcome to</Text>
          <Text style={styles.subHead}>MTBell</Text>
        </View>
        <View style={styles.videoContainer}>
          {/* <Video /> */}
          <YoutubePlayer
            height={200}
            play={false}
            videoId={vidID}
          />
        </View>

        <View style={styles.buttonContainer}>
          <GradientButton
            title="LOGIN"
            onPress={() => { props.navigation.navigate('Login') }}
            fontSize={18}
          />
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.footer}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('SignUp')}
          >
            <Text style={styles.footerLink}>&nbsp;Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // top: windowHeight * 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginTop: -100,
  },
  headContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  head: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '200',
    fontSize: 40,
    lineHeight: 50,
    color: '#797979',
  },
  subHead: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 40,
    lineHeight: 50,
    color: '#1F1F1F',
  },
  videoContainer: {
    width: '90%',
    marginTop: 30,
    // marginTop: windowHeight * 0.1,
    marginBottom: height * 0.1,
  },
  buttonContainer: {
    width: '60%',
    marginTop: -20,
  },
  signupBoldText: {
    color: '#464646',
  },
  footer: {
    color: '#464646',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    // lineHeight: 25,
  },
  footerLink: {
    color: '#145fd9',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 17,
    // lineHeight: 25,
  },
  signupContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
});

export default Home;

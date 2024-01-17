import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../Constant/Color';
import Font from '../Constant/Font';
import Texts from '../Constant/Text';
import Dashboard from '../Screen/Owner/Dashboard';
import { ToastAndroid } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as OwnerAction from '../Screen/Store/Action/Owner';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Svg, { Circle, Path } from 'react-native-svg';
import GradientButton from '../Component/Button';
import LoadingScreen from '../Component/LoadingScreen';


const { width, height } = Dimensions.get('window');
const OtpVerification = ({ navigation, route }) => {


  const tiltOffset1 = width * -0.6;
  const tiltOffset2 = width * 0.05;
  const topOffset = 70;

  const { userDetails, res, genrateOtp } = route.params;

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [otp, setOtp] = useState(['', '', '', '',]);
  const [activeInput, setActiveInput] = useState(0);
  const [otpLogin, setOtpLogin] = useState('');
  const [resendOtp, setResendOtp] = useState(false);
  const [Loading, setLoading] = useState(false);


  //validation
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [buttonName, setButtonName] = useState('')
  const [validOtp, setValidOtp] = useState(true);


  const showToast = msg => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };


  useEffect(() => {
    if (userDetails?.state == 'signUp') {
      setButtonName('Submit');
    } else {
      setButtonName('Login');
    }
  }, [isFocused])


  useEffect(() => {
    if (activeInput === 3) {
      setReadyToSubmit(true);
    }
  }, [activeInput])

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text !== '' && index < 3) {
      setActiveInput(activeInput + 1);
    } else if (text === '' && index > 0) {
      setActiveInput(activeInput - 1);
    }
  };

  const handleResend = async () => {
    setResendOtp(true);
    setLoading(true)
    resetOtpFeild();
    const min = 1000;
    const max = 9999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setOtpLogin(randomNumber);
    await dispatch(OwnerAction.sendSMSorEmail(res?.data?.email, res?.data?.phoneNumber, randomNumber))
    setLoading(false)

  };

  const resetOtpFeild = () => {
    setOtp(['', '', '', '', '']);
  };

  if (Loading) {
    return (
      <LoadingScreen />
    );
  }

  const handleSubmit = () => {
    // handle OTP verification logic here
  };

  const focusInput = (input) => {
    input.focus();
  };

  const loginHandler = async () => {
    if (readyToSubmit) {
      if (resendOtp) {
        if (otp.join('') == otpLogin) {
          AsyncStorage.setItem('authName', res?.data?.name);
          AsyncStorage.setItem('authLoginTokon', res?.data?.auth);
          AsyncStorage.setItem('authLoginRole', JSON.stringify(res?.data?.role));
          AsyncStorage.setItem('authLoginTokon', res?.data?.auth);
          AsyncStorage.setItem('managerId', JSON.stringify(res?.data?.id));

          if (res?.data?.role === '2') {
            resetOtpFeild();
            navigation.navigate("AuthNavigators", { screen: "Dashboard" });
          } else {
            resetOtpFeild();
            navigation.navigate("AuthNavigators", { screen: "Staff" })
          }
          setValidOtp(true);
        } else {
          resetOtpFeild();
          setValidOtp(false);
        }
      } else {
        if (otp.join('') == genrateOtp) {
          AsyncStorage.setItem('authName', res?.data?.name);
          AsyncStorage.setItem('authLoginTokon', res?.data?.auth);
          AsyncStorage.setItem('authLoginRole', JSON.stringify(res?.data?.role));
          AsyncStorage.setItem('authLoginTokon', res?.data?.auth);
          AsyncStorage.setItem('managerId', JSON.stringify(res?.data?.id));


          AsyncStorage.getItem('authLoginRole').then((token) => {
            if (token === '2') {
              resetOtpFeild();
              navigation.navigate("AuthNavigators", { screen: "Dashboard" });
            } else {
              resetOtpFeild();
              navigation.navigate("AuthNavigators", { screen: "Staff" });
            }
          })
          setValidOtp(true);
        } else {
          resetOtpFeild();
          setValidOtp(false);
        }
      }
    } else {
      setValidOtp(false);
      resetOtpFeild();
    }
  }

  const SubmitHandler = async () => {
    if (readyToSubmit) {
      if (otp.join('') == genrateOtp) {
        resetOtpFeild();
        navigation.navigate("Login", { userDetails })
        showToast('Account has been created Successfully');
        setValidOtp(true);
      } else {
        resetOtpFeild();
        setValidOtp(false);
      }
    } else {
      resetOtpFeild();
      setValidOtp(false);
    }
  }


  const Handler = () => {
    if (userDetails?.state == 'signUp') {
      SubmitHandler();
    } else {
      loginHandler();
    }
  }
  return (
    <ScrollView>
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
          {/* <Text style={[styles.head, { marginTop: 30, fontSize: 30 }]}>Enter the 4-digit OTP code we sent to your phone number +91 {res?.data?.phoneNumber}</Text> */}
          {/* <Text style={styles.subtitle}>Enter the 4-digit OTP code we sent to your phone number +91 {res?.data?.phoneNumber}</Text> */}
          <Text style={styles.subtitle}>Enter the 4-digit OTP code we sent to your phone number and email id</Text>
        </View>
        {!validOtp && <Text style={styles.errorText} >{Texts.InvalidOTP}</Text>}
        <View style={styles.videoContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={[styles.otpInput, activeInput === index && styles.otpInputActive]}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              keyboardType='numeric'
              maxLength={1}
              ref={(input) => {
                if (input && activeInput === index) {
                  focusInput(input);
                }
              }}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                if (index === 3) {
                  handleSubmit();
                }
              }}
            />
          ))}
        </View>
        {/* {!validOtp && <Text style={styles.errorText} >{Texts.InvalidOTP}</Text>} */}
        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
          <Text style={[styles.head, { fontSize: 20, marginTop: -65, lineHeight: 70, }]}>I Didn't Receive a Code!</Text>
          <TouchableOpacity style={{ marginTop: -15 }} onPress={handleResend}>
            <Text style={styles.resendButtonText}>Resend OTP</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <GradientButton
            title={buttonName}
            onPress={() => { Handler() }}
            fontSize={18}
          />
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: '60%',
    marginTop: 50,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    padding: Platform.OS === 'ios' ? 18 : 10,
    width: '90%',
    color: '#000000',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'auto',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#1F1F1F',
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    marginLeft: 5,
    backgroundColor: Colors.white
  },
  resendButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.greenText
  },
});
export default OtpVerification;



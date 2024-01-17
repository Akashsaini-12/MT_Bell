import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as OwnerAction from './Store/Action/Owner';
import Svg, { Circle, Path } from 'react-native-svg';
import GradientButton from '../Component/Button';
import LoadingScreen from '../Component/LoadingScreen';

const { width, height } = Dimensions.get('window');

const Login = (props) => {

  const tiltOffset1 = width * -0.6;
  const tiltOffset2 = width * 0.05;
  const topOffset = 70;

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [otpStatement, setOtpStatement] = useState('');
  const [Loading, setLoading] = useState(false);

  const userDetails = {
    mobile,
  };

  if (Loading) {
    return (
      <LoadingScreen />
    );
  }

  const handleLogin = async () => {
    if (email || mobile) {
      setLoading(true);
      var res;
      if (email) {
        res = await dispatch(OwnerAction.login(email));
      } else {
        res = await dispatch(OwnerAction.login(mobile));
      }

      if (res?.message === 'User not found') {
        setError('No user found');
        setLoading(false);
      } else {
        setError('');
        sendVerificationCode(res);
      }
    } else {
      setError('Please enter a valid email or a 10-digit mobile number.')
    }
  };

  const sendVerificationCode = async (res) => {
    const min = 1000;
    const max = 9999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    await dispatch(OwnerAction.sendSMSorEmail(email, mobile, randomNumber))
    setLoading(false);
    setEmail('');
    setMobile('');
    setError('')
    props.navigation.navigate('OtpVerification', { res: res, genrateOtp: randomNumber });
  };

  const validateInput = (text) => {
    if (text?.length === 10) {
      setMobile(text);
      setEmail('');
      setError('');
    } else {
      setMobile('');
      setEmail(text);
      if (text.length === 0) {
        setError('');
      } else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text)) {
        setError('');
      } else {
        setError('Invalid input. Please enter a valid email or a 10-digit mobile number.');
      }
    }
  };

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
          <Text style={[styles.head, { marginTop: 30, fontSize: 30 }]}>User Login</Text>
        </View>
        <View style={styles.videoContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#707070"
            value={mobile || email}
            autoCapitalize="none"
            placeholder="Your registered Mobile or E-mail"
            onChangeText={validateInput}
          // onBlur={() => {
          //   if (input.length === 0) {
          //     showErrorAlert('Please enter your mobile or email address.');
          //   }
          // }}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <View style={styles.buttonContainer}>
          <GradientButton
            title="LOGIN"
            onPress={handleLogin}
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
  },
  footerLink: {
    color: '#145fd9',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 17,
  },
  signupContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
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
});

export default Login;

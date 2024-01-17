import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../Constant/Color'
import Font from '../Constant/Font'
import Texts from '../Constant/Text'
import * as OwnerAction from './Store/Action/Owner'
import { useSelector, useDispatch } from 'react-redux';
import Svg, { Circle, Path } from 'react-native-svg';
import GradientButton from '../Component/Button';
import LoadingScreen from '../Component/LoadingScreen';


const { width, height } = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const SignUp = (props) => {

  const tiltOffset1 = width * -0.6;
  const tiltOffset2 = width * 0.05;
  const topOffset = 70;
  const dispatch = useDispatch();

  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [Loading, setLoading] = useState(false);

  //  validation
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [validName, setValidName] = useState('');
  const [validPhone, setvalidPhone] = useState(true);
  const [validEmail, setValidEmail] = useState(false);
  const [showError, setShowError] = useState('')
  const [state, setState] = useState('signUp')

  useEffect(() => {
    if (!(Name === "") && !(email === "") && (mobile.length === 10) && !validEmail && validPhone) {
      setReadyToSubmit(true);
    }
  }, [Name, mobile, validPhone, email, validEmail])

  if (Loading) {
    return (
      <LoadingScreen />
    );
  }

  const EmailChangeBlur = () => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(email)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  };

  const PhoneValidate = (num) => {
    if (num.length === 10) {
      setvalidPhone(true)
      setShowError('')
    } else {
      setvalidPhone(false)
    }
  }

  const SubmitHandler = async () => {
    if (readyToSubmit) {
      setLoading(true)
      const min = 1000;
      const max = 9999;
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      await dispatch(OwnerAction.sendSMSorEmail(email,mobile,randomNumber))

      const res = await dispatch(OwnerAction.managerSignup(Name, email, mobile, companyName),);
      const userDetails = {
        Name,
        email,
        mobile,
        state
      };
      if (res.message == 'User already exist') {
        setShowError('mobile number already exist')
        setLoading(false);
      } else {
        setLoading(false);
        props.navigation.navigate("OtpVerification", { userDetails: userDetails,genrateOtp: randomNumber});
        setShowError('')
      }
    } else {
      console.log("321");
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
          <Text style={[styles.head, { marginTop: 30, fontSize: 30 }]}>User SignUp</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputArea}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#707070"
              value={Name}
              placeholder="Name"
              onChangeText={(text) => setName(text)}
            />
          </View>

          <View style={styles.inputArea}>
            <TextInput
              style={[styles.input, { zIndex: -1 }]}
              placeholderTextColor="#707070"
              value={email}
              autoCapitalize="none"
              placeholder="Email"
              // onBlur={() => {
              //   EmailChangeBlur()
              // }}
              // onChangeText={text => EmailChangeBlur(text)}
              onChangeText={(text) => { setEmail(text); EmailChangeBlur() }}
            />
            {validEmail && <Text style={styles.errorText} >{Texts.InvalidEmail}</Text>}
          </View>

          <View style={styles.inputArea}>
            <TextInput
              style={[styles.input, { zIndex: -1 }]}
              placeholderTextColor="#707070"
              value={mobile}
              autoCapitalize="none"
              placeholder="Mobile No."
              onChangeText={phoneNo => setMobile(phoneNo)}
              keyboardType="number-pad"
              maxLength={10}
              onBlur={() => {
                PhoneValidate(mobile)
              }}
            />
            {!validPhone && <Text style={styles.errorText} >{Texts.InvalidPhone}</Text>}
            {showError ? <Text style={styles.errorText}>{showError}</Text> : null}
          </View>

          <View style={styles.inputArea}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#707070"
              value={companyName}
              autoCapitalize="none"
              placeholder="Your Company Name"
              onChangeText={text => setCompanyName(text)}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <GradientButton
            title="CONTINUE"
            onPress={SubmitHandler}
            fontSize={18}
          />
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.footer}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
          >
            <Text style={styles.footerLink}>&nbsp;Login </Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  )
}
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
  inputContainer: {
    width: '90%',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.1,
  },
  inputArea: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    // width: '90%',
    marginLeft: 20,
    color: 'red',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 10
  },
});
export default SignUp;
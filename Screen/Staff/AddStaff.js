import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  BackHandler,
  Dimensions, ToastAndroid
} from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../Constant/Color'
import Font from '../../Constant/Color'
import Texts from '../../Constant/Text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as OwnerAction from '../Store/Action/Owner';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";
import GradientButton from '../../Component/Button';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const AddStaff = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [id, setId] = useState(null);
  const [editFeild, setEditFeild] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    jobTitle: '',
  });

  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [readyToSubmit2, setReadyToSubmit2] = useState(false);
  const [validPhone, setvalidPhone] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [showError, setShowError] = useState(false);
  const [editMode, setEditMode] = useState(false);


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
    if (!(editFeild.name === "") && !(editFeild.email === "") && (editFeild.phoneNumber.length === 10) && !validEmail && !validPhone) {
      setReadyToSubmit2(true);
    }
  }, [editFeild.name, editFeild.email, validPhone, editFeild.phoneNumber, validEmail])


  useEffect(() => {
    if (!(Name === "") && !(email === "") && (mobile.length === 10) && !validEmail && !validPhone) {
      setReadyToSubmit(true);
    }
  }, [Name, mobile, validPhone, email, validEmail])


  useEffect(() => {
    if (route.params && route.params.edit) {
      setEditFeild(route.params.edit);
      setId(route.params.edit?.id)
      setEditMode(true);
    } else {
      setEditFeild({
        name: '',
        email: '',
        phoneNumber: '',
        jobTitle: '',
      });
      setId(null)
      setEditMode(false);
    }
  }, [route.params]);

  const backAction = () => {
    initialState();
    navigation.navigate("Dashboard");
    return true;
  };

  const EmailChangeBlur = () => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const PhoneValidate = (num) => {
    if (num.length !== 10) {
      setvalidPhone(true)
    } else {
      setvalidPhone(false)
    }
  };

  const handleAddStaff = async () => {
    if (route.params && route.params.edit) {
      if (readyToSubmit2) {
        const { name, email, phoneNumber, jobTitle } = editFeild;
        const res = await dispatch(OwnerAction.editStaff(name, email, phoneNumber, jobTitle, id))
        // console.log(res,"response");
        if (res?.success == true) {
          showToast('Staff updated Successfully');
          initialState();
          navigation.goBack();
        } else {
          console.log('error123');
          showToast('Something went wrong. Please try after sometime');
        }
      } else {
        console.log("44submit");
      }
    } else {
      if (readyToSubmit) {
        const res = await dispatch(OwnerAction.addStaff(Name, email, mobile, jobTitle,))
        if (res?.message == 'User already exist') {
          setShowError(true);
        }
        else {
          await dispatch(OwnerAction.sendSMSorEmail(email, mobile, 0))
          showToast('Staff has been created Successfully');
          initialState();
          navigation.goBack();
        }
      } else {
        console.log("55submit");
      }
    }
  }

  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }
  }, [isFocused]);

  const initialState = () => {
    setName('');
    setEmail('');
    setMobile('');
    setJobTitle('');
    setvalidPhone(false);
    setValidEmail(false);
    setShowError(false);
  };

  return (
    <ScrollView>
      {editMode && <View style={styles.background}>
        <View style={styles.container}>
          <View style={{ width: '90%' }}>
            <Text style={[styles.wel_start_text, { marginBottom: 30 }]}>Edit Staff</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#707070"
            value={editFeild.name}
            autoCapitalize="none"
            placeholder="Name"
            onChangeText={(text) => { setEditFeild({ ...editFeild, name: text }), setName(text) }}
          />
          <TextInput
            style={[styles.input, { zIndex: -1 }]}
            placeholderTextColor="#707070"
            value={editFeild.email}
            autoCapitalize="none"
            placeholder="Email"
            onBlur={() => { EmailChangeBlur(email) }}
            onChangeText={(text) => { setEditFeild({ ...editFeild, email: text }), setEmail(text) }}
          />
          {validEmail && <Text style={styles.errorText} >{Texts.InvalidEmail}</Text>}
          <TextInput
            style={[styles.input, { zIndex: -1 }]}
            placeholderTextColor="#707070"
            value={editFeild.phoneNumber}
            autoCapitalize="none"
            placeholder="Mobile"
            maxLength={10}
            onBlur={() => { PhoneValidate(mobile) }}
            onChangeText={(text) => { setEditFeild({ ...editFeild, phoneNumber: text }), setMobile(text) }}
          />
          {validPhone && <Text style={styles.errorText}>{Texts.InvalidPhone}</Text>}
          {showError && <Text style={styles.errorText}>{Texts.MobileExist}</Text>}
          <TextInput
            style={styles.input}
            placeholderTextColor="#707070"
            value={editFeild.jobTitle}
            autoCapitalize="none"
            placeholder="Job Title"
            onChangeText={(text) => setEditFeild({ ...editFeild, jobTitle: text })}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={{ width: '80%', justifyContent: 'center', }}>
            <GradientButton
              title="+ Edit Staff"
              onPress={handleAddStaff}
              fontSize={18}
            />
          </View>
        </View>
      </View>}
      {!editMode && <View style={styles.background}>
        <View style={styles.container}>
          <View style={{ width: '90%' }}>
            <Text style={[styles.wel_start_text, { marginBottom: 30 }]}>New Staff</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#707070"
            value={Name}
            autoCapitalize="none"
            placeholder="Name"
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={[styles.input, { zIndex: -1 }]}
            placeholderTextColor="#707070"
            value={email}
            autoCapitalize="none"
            placeholder="Email"
            onBlur={() => { EmailChangeBlur(email) }}
            onChangeText={text => setEmail(text)}
          />
          {validEmail && <Text style={styles.errorText} >{Texts.InvalidEmail}</Text>}
          <TextInput
            style={[styles.input, { zIndex: -1 }]}
            placeholderTextColor="#707070"
            value={mobile}
            autoCapitalize="none"
            placeholder="Mobile"
            maxLength={10}
            onBlur={() => { PhoneValidate(mobile) }}
            onChangeText={text => setMobile(text)}
          />
          {validPhone && <Text style={styles.errorText}>{Texts.InvalidPhone}</Text>}
          {showError && <Text style={styles.errorText}>{Texts.MobileExist}</Text>}
          <TextInput
            style={styles.input}
            placeholderTextColor="#707070"
            value={jobTitle}
            autoCapitalize="none"
            placeholder="Job Title"
            onChangeText={text => setJobTitle(text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={{ width: '80%', justifyContent: 'center', }}>
            <GradientButton
              title="+ Add New Staff"
              onPress={handleAddStaff}
              fontSize={18}
            />
          </View>
        </View>
      </View>}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#DADADA',
    flex: 1,
    height: windowHeight,
    width: '100%'
  },
  container: {
    width: '100%',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wel_start_text: {
    color: '#474747',
    fontSize: 30,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,

  },
  placetext: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    padding: Platform.OS === 'ios' ? 18 : 10,
    width: '90%',
    color: '#000000',
    marginBottom: 25
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: Colors.greenButton,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    zIndex: -1,
    marginBottom: 15,
    marginRight: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: Font.large,
    fontWeight: 'bold'
  },
  errorText: {
    color: Colors.red,
    fontSize: Font.small,
    width: '90%',
    marginTop: -20,
    marginBottom: 20
  },

})

export default AddStaff


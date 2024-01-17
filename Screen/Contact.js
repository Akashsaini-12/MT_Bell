import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Linking, Dimensions, ToastAndroid } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../Constant/Color';
import { Button, Icon } from 'react-native-elements';
import GradientButton from '../Component/Button';
import LoadingScreen from '../Component/LoadingScreen';
import * as OwnerAction from './Store/Action/Owner';

const winWidth = Dimensions.get("window").width;

const Contact = props => {

  const dispatch = useDispatch();

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailInvalidError, setEmailInvalidError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [Loading, setLoading] = useState(false);


  if (Loading) {
    return (
      <LoadingScreen />
    );
  }

  const validateInput = (text) => {
    setEmail(text);
    regx = (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text))
    if (regx) {
      setEmailInvalidError(false);
    }
    else {
      setEmailInvalidError(true);
    }
  };
  const initialState = () => {
    setname("");
    setEmail("");
    setSubject("");
    setMessage("");
    setNameError(false);
    setEmailError(false);
    setEmailInvalidError(false);
    setSubjectError(false);
    setMessageError(false);

  };

  const showToast = msg => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };


  const submitHandler = async () => {
    if (name === "") {
      setNameError(true);
    } if (email === "") {
      setEmailError(true);
    } if (subject === "") {
      setSubjectError(true);
    } if (message === "") {
      setMessageError(true);
    }
    if (!nameError && !emailError && !emailInvalidError && !subjectError && !messageError) {
      console.log(subject, message, email, name, "input");
      console.log("no 123");
      setLoading(true);
      await dispatch(OwnerAction.contactUS(name, email, subject, message));
      initialState();
      showToast('Your Contact form has been Submited');
      setLoading(false);
    }

  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.maincontainer}>
      <View style={{ alignItems: 'flex-start', padding: 10 }}>
        <View >
          <Text
            style={styles.contactText}>
            Get In Touch
          </Text>
        </View>
        <TextInput
          placeholder="Enter Your Name"
          placeholderTextColor={Colors.placeholderTextColor}
          style={styles.textinput}
          value={name}
          onChangeText={(text) => { setname(text), setNameError(false) }}
        />
        {nameError && <Text style={styles.errorText} >Required</Text>}
        <TextInput
          placeholder="Enter Email Address"
          placeholderTextColor={Colors.placeholderTextColor}
          style={styles.textinput}
          value={email}
          onChangeText={(text) => { validateInput(text), setEmailError(false) }}
        />
        {emailError && <Text style={styles.errorText}>Required</Text>}
        {emailInvalidError && <Text style={styles.errorText}>Invalid Email</Text>}
        <TextInput
          placeholder="Enter Subject"
          placeholderTextColor={Colors.placeholderTextColor}
          style={styles.textinput}
          value={subject}
          onChangeText={(text) => { setSubject(text), setSubjectError(false) }}
        />
        {subjectError && <Text style={styles.errorText} >Required</Text>}
        <TextInput
          placeholder="Enter Message"
          placeholderTextColor={Colors.placeholderTextColor}
          style={[styles.textinput, { textAlignVertical: 'top' }]}
          multiline={true}
          numberOfLines={4}
          value={message}
          onChangeText={(text) => { setMessage(text), setMessageError(false) }}
        />
        {messageError && <Text style={styles.errorText} >Required</Text>}
        <View style={{ width: '100%', marginTop: 25, marginBottom: 40 }}>
          <GradientButton
            title="Send Message"
            onPress={submitHandler}
            fontSize={18}
          />
        </View>

        {/* Contact Details */}
        <View style={styles.detailsView}>
          <Icon name="home" type="font-awesome-5" size={25} style={styles.margin} />
          <View>
            <Text style={styles.ansText}>ANS IT Services Pvt. Ltd.</Text>
            <Text>A-62, A-Block, Sector 2,</Text>
            <Text>Noida, Uttar Pradesh 201301</Text>
          </View>
        </View>

        <View style={styles.detailsView}>
          <Icon name="mobile-alt" type="font-awesome-5" size={25} style={styles.margin} />
          <View style={{ marginLeft: 10 }}>
            <Text onPress={() => { Linking.openURL('tel:9650452845') }} style={styles.numstyle}>+91 9650452845</Text>
            <Text >Mon to Sat 09:00am to 09:00pm</Text>
          </View>
        </View>

        <View style={styles.detailsView}>
          <Icon name="envelope" type="font-awesome-5" size={25} style={styles.margin} />
          <View>
            <Text onPress={() => { Linking.openURL('mailto:ansit@gmail.com') }} style={styles.ansText}>ansit@gmail.com</Text>
            <Text>Send us your query anytime!</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#DADADA',
    width: '100%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: Colors.Headerbackgroud,
  },
  textinput: {
    borderWidth: 1.5,
    width: '100%',
    padding: 10,
    marginTop: 10,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'auto'
  },
  detailsView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    alignItems: "center",
    marginTop: 15,
    color: '#1F1F1F'
  },
  contactText: {
    color: '#474747',
    fontSize: 30,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,
    marginTop: 10,
    marginBottom: 20
  },
  ansText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  margin: {
    marginRight: 24,
    color: '#1F1F1F'
  },
});

export default Contact;


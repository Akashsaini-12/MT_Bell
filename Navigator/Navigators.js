import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Alert } from 'react-native'
import Modal from 'react-native-modal';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import SignUp from '../Screen/SignUp'
import Login from '../Screen/Login';
import Home from '../Screen/Home';
import Contact from '../Screen/Contact';
import About from '../Screen/About';
import OtpVerification from '../Component/OtpVerification'
import Dashboard from '../Screen/Owner/Dashboard'
import AddStaff from '../Screen/Staff/AddStaff'
import Staff from '../Screen/Staff/Staff';
import Splash from '../Screen/Splash/Splash';



const AuthNavigator = createStackNavigator();
const MainNavigator = createStackNavigator();
const ProviderNavigator = createStackNavigator();
const Drawer = createDrawerNavigator();


const ProviderNavigators = (props) => {
  return (
    <ProviderNavigator.Navigator drawerContent={(props) => <ProviderNavigatorsContents {...props} />}>
      <ProviderNavigator.Screen name="Home" options={{ headerShown: false }} component={Home} />
      <ProviderNavigator.Screen name="Login" options={{ headerShown: false }} component={Login} />
      <ProviderNavigator.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
      <ProviderNavigator.Screen name="OtpVerification" options={{ headerShown: false }} component={OtpVerification} />
    </ProviderNavigator.Navigator>
  );
};

const AuthNavigators = ({ navigation }) => {

  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const toggleBoxVisibility = () => {
    setIsBoxVisible(!isBoxVisible);
  };

  const [name, setName] = useState('MTBell');
  useEffect(() => {
    checkLoggedInUser();
  }, []);
  const checkLoggedInUser = async () => {
    const userName = await AsyncStorage.getItem('authName');
    setName(userName);
  };

  const [managerBlock, setManagerBlock] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem('authLoginRole').then((token) => {
      if (token === '2') {
        setManagerBlock(true);
      } else {
        setManagerBlock(false);
      }
    });
  }, []);


  const HeaderLeft = () => {
    return (
      <TouchableOpacity onPress={toggleBoxVisibility}>
        <Icon
          name='menu'
          type='material'
          size={30}
          color='#FFFFFF'
          containerStyle={{ marginHorizontal: 15 }}
        />
      </TouchableOpacity>
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('authName');
              await AsyncStorage.removeItem('authLoginTokon');
              await AsyncStorage.removeItem('authLoginRole');
              await AsyncStorage.removeItem('authLoginTokon');
              await AsyncStorage.removeItem('managerId');
              await AsyncStorage.removeItem('managerToken');
              navigation.navigate('ProviderNavigators', { screen: "Login" })
            } catch (error) {
              console.error('Error while logging out:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <AuthNavigator.Navigator
        screenOptions={{ headerShown: false }}
      >
        <AuthNavigator.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: true,
            headerTitle: `Welcome ${name}`,
            headerLeft: HeaderLeft,
            headerBackground: () => (
              <LinearGradient
                colors={['#484AE2', '#69E1EF', '#E2E7E7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.linearGradient}
              />
            ),
            headerTitleAlign: 'center',
            headerTitleAlign: 'center',
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontSize: 25,
            },
          }}
        />
      <AuthNavigator.Screen
          name="AddStaff"
          component={AddStaff}
          options={{
            headerShown: true,
            headerTitle: 'Staff',
            headerLeft: HeaderLeft,
            headerBackground: () => (
              <LinearGradient
                colors={['#484AE2', '#69E1EF', '#E2E7E7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.linearGradient}
              />
            ),
            headerTitleAlign: 'center',
            headerTitleAlign: 'center',
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontSize: 30,
            },
          }}
        />

        <AuthNavigator.Screen
          name="Staff"
          component={Staff}
          options={{
            headerShown: true,
            headerTitle: 'Staff',
            headerLeft: HeaderLeft,
            headerBackground: () => (
              <LinearGradient
                colors={['#484AE2', '#69E1EF', '#E2E7E7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.linearGradient}
              />
            ),
            headerTitleAlign: 'center',
            headerTitleAlign: 'center',
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontSize: 30,
            },
          }}
        />
        <AuthNavigator.Screen
          name="About"
          component={About}
          options={{
            headerShown: true,
            headerTitle: 'About',
            headerLeft: HeaderLeft,
            headerBackground: () => (
              <LinearGradient
                colors={['#484AE2', '#69E1EF', '#E2E7E7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.linearGradient}
              />
            ),
            headerTitleAlign: 'center',
            headerTitleAlign: 'center',
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontSize: 30,
            },
          }}
        />
        <AuthNavigator.Screen
          name="Contact"
          component={Contact}
          options={{
            headerShown: true,
            headerTitle: 'Contact',
            headerLeft: HeaderLeft,
            headerBackground: () => (
              <LinearGradient
                colors={['#484AE2', '#69E1EF', '#E2E7E7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.linearGradient}
              />
            ),
            headerTitleAlign: 'center',
            headerTitleAlign: 'center',
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontSize: 30,
            },
          }}
        />
      </AuthNavigator.Navigator>
      <Modal
        isVisible={isBoxVisible}
        onBackdropPress={toggleBoxVisibility}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        style={{ margin: 0 }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.background}>
            <Image source={require('../assets/SplashScreen.jpg')} style={styles.image} />
          </View>
          {managerBlock && (<TouchableOpacity onPress={() => {toggleBoxVisibility(),navigation.navigate('Dashboard')}}>
            <Text style={styles.link}>Dashboard</Text>
          </TouchableOpacity>)}
          {!managerBlock && (<TouchableOpacity onPress={() => {toggleBoxVisibility(),navigation.navigate('Staff')}}>
            <Text style={styles.link}>Staff</Text>
          </TouchableOpacity>)}
          {managerBlock && (<TouchableOpacity onPress={() => {toggleBoxVisibility(),navigation.navigate('AddStaff')}}>
            <Text style={styles.link}>Add Staff</Text>
          </TouchableOpacity>)}
          <TouchableOpacity onPress={() => {toggleBoxVisibility(),navigation.navigate('About')}}>
            <Text style={styles.link}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {toggleBoxVisibility(),navigation.navigate('Contact')}}>
            <Text style={styles.link}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.link}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
};


const MainNavigators = (props) => {


  return (
    <NavigationContainer independent={false}>
      <MainNavigator.Navigator screenOptions={{ headerShown: true }} initialRouteName="Splash">
        <MainNavigator.Screen
          name="AuthNavigators"
          component={AuthNavigators}
          // navigation={props.navigation}
          options={{ headerShown: false }}
        />
        <MainNavigator.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <MainNavigator.Screen
          name="ProviderNavigators"
          component={ProviderNavigators}
          options={{ headerShown: false }}
        />
      </MainNavigator.Navigator>
    </NavigationContainer>



  );
};

export default MainNavigators;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  link: {
    fontSize: 20,
    marginBottom: 20,
    color: 'blue',
    alignSelf: 'flex-start',
    // borderBottomWidth: 1,
  },
  closeButton: {
    color: 'red',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width * 0.7,
    backgroundColor: '#d2eff7',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingLeft: 30,
    // paddingTop: 100
  },
  background: {
    width: '100%',
    marginBottom: 30
    // height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

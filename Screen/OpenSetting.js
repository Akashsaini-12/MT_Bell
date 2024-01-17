// import React, { useCallback, useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   SafeAreaView,
//   View,
//   TouchableOpacity,
//   Linking,
//   PermissionsAndroid,  
//   Platform,
//   Button
// } from 'react-native';

// const OpenSetting = () => {
//   const openAppSettings = useCallback(async () => {
//     if(Platform.OS === 'android') {
//       // On Android, send the RINGTONE_PICKER intent
//       Linking.sendIntent('android.intent.action.RINGTONE_PICKER');
//      }else {
//       // On iOS, open the App-Prefs URL with the Sounds section
//       Linking.openURL('App-Prefs:Sounds');
//      }
//     },[]);

  
//   const requestStoragePermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         {
//           title: 'Storage Permission',
//           message: 'This app needs permission to access your device storage.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('Storage permission granted');
//       } else {
//         console.log('Storage permission denied');
//       }
//     } catch (error) {
//       console.warn(error);
//     }
//   };
//   useEffect(() => {
//     requestStoragePermission();
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.innerContainer}>
//         <Text style={styles.titleText}>
//           How to open Settings App in React Native
//         </Text>
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.buttonStyle}
//           onPress={openAppSettings}>
//           <Text style={styles.buttonTextStyle}>Open the Settings App</Text>
//         </TouchableOpacity>
//       </View>
      
//       <Button
//        title="Open Ringtone Settings"
//        onPress={() => {
//        Platform.OS === 'android'
//        ? Linking.sendIntent('android.intent.action.RINGTONE_PICKER')
//        : Linking.openURL('App-Prefs:Sounds');
//        }}
//       />
//       </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 35,
//     justifyContent: 'center',
//   },
//   titleText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     paddingVertical: 20,
//   },
//   buttonTextStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   buttonStyle: {
//     alignItems: 'center',
//     backgroundColor: 'green',
//     padding: 10,
//     width: '100%',
//     marginTop: 16,
//   },
//   footerHeading: {
//     fontSize: 18,
//     textAlign: 'center',
//     color: 'grey',
//   },
//   footerText: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: 'grey',
//   },
// });
// export default OpenSetting;


// import React, { useState } from 'react';
// import { View, Text, TextInput, Button,Linking } from 'react-native';
// import Sound from 'react-native-sound';

// const App = () => {
 
//   const [ringtoneUri, setRingtoneUri] = useState(null);

//   // Play the selected ringtone using react-native-sound
//   Linking.addEventListener('url', ({ url }) => {
//     // if (url.startsWith('content://')) {
//     //   // The user has selected a ringtone
//     //   console.log('Ringtone selected:', url);
//     //   setRingtoneUri(url);
//     //   console.log(url);
//     // }
//     console.log('hello world',url);
//   });
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//          <>
//           <Button
//             title="Select Ringtone"
//             onPress={() => {
//               // Open the system ringtone settings screen
//               if (Platform.OS === 'android') {
//                 Linking.sendIntent('android.intent.action.RINGTONE_PICKER');
//               } else {
//                 Linking.openURL('App-Prefs:Sounds');
//               }
//             }}
//           />
//         </>
//     </View>
//   );
// };
// export default App;


// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';

// const App = () => {
//   const [currentScreen, setCurrentScreen] = useState('login');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Hardcoded credentials
//     const adminUsername = 'admin';
//     const adminPassword = 'admin';
//     const staffUsername = 'staff';
//     const staffPassword = 'staff';

//     setCurrentScreen(
//       username === adminUsername && password === adminPassword
//         ? 'admin'
//         : username === staffUsername && password === staffPassword
//         ? 'staff'
//         : 'login'
//     );
//   };


//   return (
//     <View>
//       {currentScreen === 'login' && (
//         <>
//           <Text>Username:</Text>
//           <TextInput value={username} onChangeText={setUsername} />
//           <Text>Password:</Text>
//           <TextInput value={password} onChangeText={setPassword} secureTextEntry={true} />
//           <Button title="Login" onPress={handleLogin} />
//         </>
//       )}
//       {currentScreen === 'admin' && (
//         <>
//           <Text>Welcome, admin!</Text>
//           <Button title="Ring Staff" onPress={handleRingButtonPress} />
//         </>
//       )}
//       {currentScreen === 'staff' && <Text>Welcome, staff!</Text>}
//       {currentScreen === 'staff-notification' && <Text>A notification has been received!</Text>}
//     </View>
//   );
// };

// export default App;


 
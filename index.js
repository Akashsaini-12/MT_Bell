/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee ,{AndroidImportance}from '@notifee/react-native';




// async function onDisplayNotification(data) {

//   if(Platform.OS === 'ios') {
//   await notifee.requestPermission()
//   }
//   const channelId = await notifee.createChannel({
//     id: data.notification.android.channelId,
//     name: 'Default Channel 9',
//     sound:data.notification.android.sound,
//     importance: AndroidImportance.HIGH
//   });
//   await notifee.displayNotification({
//     title: '<b>Do You Wan to Accept/ Reject</b>',
//     subtitle: '&#129395;',
//     body:
//    'this is a demo notification',
//     android: {
//     channelId,
//     color: '#4caf50',
//     actions: [
//     {
//      title: '<b>Accept</b>;',
//       pressAction: { id: 'dance' },
//      },
//     {
//        title: '<b>Reject</b>;',
//        pressAction: { id: 'cry' },
//      },
//     ],
//    },
//   });
// }

      messaging().setBackgroundMessageHandler(async remoteMessage => {
          //  onDisplayNotification(remoteMessage)
        console.log('Message handled in the background!', remoteMessage);
        console.log(remoteMessage.notification.android.channelId,"channelId");
        console.log(remoteMessage.notification.android.sound,"sound");
        });
          
      
AppRegistry.registerComponent(appName, () => App);

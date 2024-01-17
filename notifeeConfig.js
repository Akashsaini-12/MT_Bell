import notifee from '@notifee/react-native';

const handleBackgroundEvent = async ({ type, detail }) => {
  if (type === 'PRESS') {
    const { notificationId, pressAction } = detail;

    if (pressAction.id === 'accepted') {
      // User clicked on the "Accepted" button
      console.log('accepted');
      // Handle the accepted action here
    } else if (pressAction.id === 'rejected') {
        console.log('rejected');
      // User clicked on the "Rejected" button
      // Handle the rejected action here
    }
    else{
        console.log('helllo');
    }

    // Mark the notification as pressed to prevent default behavior
    await notifee.pressNotification(notificationId);
  }
}; 

  

notifee.onBackgroundEvent(handleBackgroundEvent);

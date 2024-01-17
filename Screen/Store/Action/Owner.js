import AsyncStorage from '@react-native-async-storage/async-storage';
import Url from "../../../Constant/Url";
export const OTPVERIFICATION = "OTPVERIFICATION";
export const SENDNOTIFICATION = "SENDNOTIFICATION";
export const FETCHDATASUCCESS = "FETCHDATASUCCESS";
export const ADDSTAFF = "ADDSTAFF";
export const EDITSTAFF = "EDITSTAFF";
export const DEVICETOKON = "DEVICETOKON";
export const GETDEVICETOKON = "GETDEVICETOKON";
export const LOGIN = "LOGIN";
export const GETUSERDETAIL = "GETUSERDETAIL";
export const SMSEMAIL = "SMSEMAIL";
export const CONTACTUS = "CONTACTUS";

// const response = fetch(`https://api.authkey.io/request?authkey=90f1c99e19266c14&mobile=${mobile}&country_code=91&sms=Hello, your OTP is ${randomNumber}`, {


// export const getVerificationCode = (mobile, randomNumber) => {
//   // console.log(randomNumber,"in api call");
//   return async (dispatch) => {
//     try {
//       // if (mobile?.length == 10) {
//         const response = await fetch(
//           `https://api.authkey.io/request?authkey=90f1c99e19266c14&mobile=${mobile}&country_code=91&sid=9014&otp=${randomNumber}`,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );
//       const resData = await response.json();
//       console.log(resData, 'call message123');
//       dispatch({ type: OTPVERIFICATION, data: resData });
//     } catch (e) {
//       console.log(e, "error");
//     }
//   };
// };



export const sendNotification = (deviceTokon) => {
  const serverKey = 'AAAAxIK0PVo:APA91bFVvddEStyLBEItjw8mZvr6Q16cRLJVvXuR4vC0DvHHxD82crE81jPYtOLgd9lSCun75HkduOlP_xyacIHHUC3ZDOplELN4rkxMDmeDw5tP1R1W1PYECdcB0y6OiS87an1s-UQh';
  const deviceToken = `${deviceTokon}`;
  const url = 'https://fcm.googleapis.com/fcm/send';
  const headers = {
    'Authorization': `key=${serverKey}`,
    'Content-Type': 'application/json',
  };
  const payload = {
    to: deviceToken,
    notification: {
      "title": "Do You Want to Accept/Reject",
      "body": "Hi,Good Morning to All ",
      "sound": "ringtone.mp3",
      "android_channel_id": "Default9"
    },
    "data": {
      "field1": "value1",
      "field2": "value2"
    },
    "content_available": true,
    "priority": "high"
  }
  return async dispatch => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const resData = await response.json();
        dispatch({ type: SENDNOTIFICATION, data: resData });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const managerSignup = (Name, email, mobile, companyName) => {

  return async (dispatch) => {
    try {
      const response = await fetch(Url.ManagerSignup, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 0,
          name: Name,
          email: email,
          phoneNumber: mobile,
          company: companyName,
          jobTitle: "",
          token: "",
          role: 2,
          status: 0,
          auth: ""
        }),
      });
      if (response.ok) {
        const resData = await response.json();
        const token = resData.data.auth;
        const id = resData.data.id;
        AsyncStorage.setItem('managerToken', token);
        AsyncStorage.setItem('managerId', JSON.stringify(id));
        dispatch({ type: FETCHDATASUCCESS, data: resData });
        return resData;
      }
    } catch (error) {
    }
  };
};

export const login = (mobile) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        Url.Login + mobile,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      if (response.ok) {
        const resData = await response.json();
        // console.log(resData,"login response");
        dispatch({ type: LOGIN, data: resData });
        return resData;
      }
    } catch (error) {
    }
  }
};



export const addStaff = (Name, email, mobile, jobTitle) => {
  return async (dispatch) => {
    const id = await AsyncStorage.getItem('managerId');
    try {
      const response = await fetch(Url.AddStaff, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 0,
          name: Name,
          email: email,
          phoneNumber: mobile,
          company: '',
          jobTitle: jobTitle,
          token: "",
          role: 3,
          managerId: id,
          status: 0,
          auth: ""
        }),
      });
      if (response.ok) {
        const resData = await response.json();
        dispatch({ type: ADDSTAFF, data: resData });
        return resData;
      }
    } catch (error) {
    }
  }
};

export const editStaff = (Name, email, mobile, jobTitle,value) => {
  return async (dispatch) => {
    const auth = await AsyncStorage.getItem('authLoginTokon');
    const id = await AsyncStorage.getItem('managerId');
    try {
      const response = await fetch(Url.EditStaff, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + auth,
        },
        body: JSON.stringify({
          id: value,
          name: Name,
          email: email,
          phoneNumber: mobile,
          company: '',
          jobTitle: jobTitle,
          token: "",
          role: 3,
          managerId: id,
          status: 0,
          auth: ""
        }),
      });
      if (response.ok) {
        const resData = await response.json();
        dispatch({ type: EDITSTAFF, data: resData });
        return resData;
      }
    } catch (error) {
    }
  }
};

export const postDeviceTokon = (mobile, deviceToken, auth) => {
  return async (dispatch) => {
    try {
      const response = await fetch(Url.PostDeviceTokon, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + auth,
        },
        body: JSON.stringify({
          phoneNumber: mobile,
          token: deviceToken,
        }),
      });
      if (response.ok) {
        const resData = await response.json();
        // console.log(resData,"api post ka token ka data");
        dispatch({ type: DEVICETOKON, data: resData });
      }
    } catch (error) {
    }
  };
};


export const getDeviceToken = (num, auth) => {
  return async dispatch => {
    try {
      const response = await fetch(Url.GetDeviceTokon + num, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + auth,
        },
      })
      if (response.ok) {
        const resData = await response.json();
        AsyncStorage.setItem('getDeviceTokon', resData.data);
        dispatch({ type: GETDEVICETOKON, data: resData });
      }
    } catch (e) {
    }
  };
};

export const getUserDetail = (auth) => {
  return async dispatch => {
    const id = await AsyncStorage.getItem('managerId');
    try {
      const response = await fetch(Url.GetUserDetail + id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + auth,
        },
      })
      const resData = await response.json();
      dispatch({ type: GETUSERDETAIL, data: resData });
      return resData;
    } catch (e) {
      console.log(e);
    }
  };
};

export const sendSMSorEmail = (email,number, otp) => {
  return async (dispatch) => {
    try {
      const response = await fetch(Url.SendSmsMail, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
          phoneNumber: number,
        }),
      });
      if (response.ok) {
        const resData = await response.json();
        console.log(resData, "api post ka token ka data11");
        dispatch({ type: SMSEMAIL, data: resData });
      } else {
        console.log("response not ok email");
      }
    } catch (error) {
      console.log("email error");
    }
  };
};
export const contactUS = (name,email,subject,message) => {
  return async (dispatch) => {
    const auth = await AsyncStorage.getItem('authLoginTokon');
    try {
      const response = await fetch(Url.ContactUs, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + auth,
        },
        body: JSON.stringify({
          message: message,
          email: email,
          name: name,
          subject: subject,
        }),
      });
      if (response.ok) {
        const resData = await response.json();
        console.log(resData, "api post for contactUS");
        dispatch({ type: CONTACTUS, data: resData });
      } else {
        console.log("response not ok email contact");
      }
    } catch (error) {
      console.log("email error",error);
    }
  };
};


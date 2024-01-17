import {
  OTPVERIFICATION,
  SENDNOTIFICATION,
  FETCHDATASUCCESS,
  ADDSTAFF,
  EDITSTAFF,
  DEVICETOKON,
  GETDEVICETOKON,
  LOGIN,
  GETUSERDETAIL,
  SMSEMAIL,
  CONTACTUS
} from '../Action/Owner';


const initialState = {
  Otpverification: null,
  SendNotification: null,
  FetchDataSuccess: null,
  addStaff: null,
  editStaff: null,
  deviceToken: null,
  getDeviceTokon: null,
  login: null,
  getUserDetail: null,
  smsemail: null,
  contactUS: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case OTPVERIFICATION:
      return {
        ...state,
        Otpverification: action.data,
      }
    case SENDNOTIFICATION:
      return {
        ...state,
        SendNotification: action.data
      }
    case FETCHDATASUCCESS:
      return {
        ...state,
        FetchDataSuccess: action.data
      }
    case ADDSTAFF:
      return {
        ...state,
        addStaff: action.data
      }
    case EDITSTAFF:
      return {
        ...state,
        editStaff: action.data
      }
    case DEVICETOKON:
      return {
        ...state,
        deviceToken: action.data
      }
    case LOGIN:
      return {
        ...state,
        login: action.data
      }
    case GETDEVICETOKON:
      return {
        ...state,
        getDeviceTokon: action.data
      }
    case GETUSERDETAIL:
      return {
        ...state,
        getUserDetail: action.data
      }
    case SMSEMAIL:
      return {
        ...state,
        smsemail: action.data
      }
    case CONTACTUS:
      return {
        ...state,
        contactUS: action.data
      }
  }
  return state
}

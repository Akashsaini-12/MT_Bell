
import  React ,{useEffect,useState}from 'react';
import Navigators from './Navigator/Navigators'
import OpenSetting from './Screen/OpenSetting';
import { Provider } from "react-redux";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import OwnerReducer from './Screen/Store/Reducer/Owner';

const rootReducer = combineReducers({
  Owner: OwnerReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App({navigation}) { 
  return (
    <Provider store={store}>
        <SafeAreaProvider>
       <Navigators></Navigators>
       </SafeAreaProvider>
       </Provider>
  );
}





















// elestic
// 64561E79B0732CE375666ED951A0C9CAC858
//90979CB617E1937B9517C473586F07FC80B99013F83A4EB6761B7AFEE3C8921E6C54634035415CBD5ECCC56E4C23CAEE

// My approach is to use firebase. Use need a server and a database. 
// You initialize firebase in your app.
//  When user open your application you get token from firebase and send it to your server 
//  and in your server you store token for each user.
//   And then when a user wants to send message to another user,
//    it call an api from your server to send notification to specific user.
//     And in your server you have firebase token for each user and by using that you can send push 
//     notification to that user with apis that firebase prepared


















































































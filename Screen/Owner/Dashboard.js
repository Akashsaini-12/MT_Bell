import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
  BackHandler,
  TouchableOpacity
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as OwnerAction from '../Store/Action/Owner';
import LoadingScreen from '../../Component/LoadingScreen';
import GradientButton from '../../Component/Button';
import ToggleButton from '../../Component/ToggleButton';
import Colors from '../../Constant/Color';
import Font from '../../Constant/Font';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowHeight = Dimensions.get('window').height;

const Dashboard = () => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const loginUserDetail = useSelector(state => state.Owner.login);
  const signupUserDetail = useSelector(state => state.Owner.FetchDataSuccess);
  const getUserDetail = useSelector(state => state.Owner.getUserDetail);
  const signAuth = signupUserDetail?.data?.auth;
  const staffData = getUserDetail?.data;

  useEffect(() => {
    async function fetchData() {
      const userToken = await AsyncStorage.getItem('authLoginTokon');
      const name = await AsyncStorage.getItem('authName');
      setName(name);
      const res = dispatch(OwnerAction.getUserDetail(userToken || signAuth));
    }
    fetchData();
  }, [isFocused]);

  useEffect(() => {
    if (getUserDetail) {
      setLoading(false);
    }
  }, [getUserDetail]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Hold On',
        'Are you sure you want to go back ?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'Yes', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => {
      backHandler.remove();
    };
  }, []);


  const handleEditClick = (item) => {
    navigation.navigate('AddStaff', { edit: item })
  };

  const renderItem = ({ item }) => (
    <View style={{ flex: 1, width: '100%', marginTop: -5 }}>
      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        <TouchableOpacity style={{ margin: 10, marginTop: 15 }} onPress={() => handleEditClick(item)}>
          <Icon name="edit" size={25} color="#000" />
        </TouchableOpacity>

        <Text style={[styles.staffListText]}>{item?.name}</Text>
        <ToggleButton phoneNumber={item?.phoneNumber} />
      </View>
      <Text style={[styles.staffListNum, {}]}>
        {`(${item?.phoneNumber?.slice(0, 3)})-${item?.phoneNumber?.slice(3, 6)}-${item?.phoneNumber?.slice(6)}`}
      </Text>
    </View>
  );

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View style={styles.background}>
      <Text style={[styles.wel_start_text]}>Staff List</Text>
      <View style={styles.container}>
        <View style={styles.staffList}>
          <FlatList
            data={staffData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>

        <View style={styles.buttonContainer}>
          <GradientButton
            title="+ Add New Staff"
            onPress={() => navigation.navigate('AddStaff')}
            fontSize={18}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#DADADA',
    flex: 1,
    height: windowHeight,
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -80,
  },
  wel_start_text: {
    color: '#474747',
    fontSize: 30,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,
    marginTop: 20,
    marginLeft: 30,
  },
  HeaderText: {
    color: Colors.white,
    fontSize: Font.large,
    fontWeight: 'bold',
    padding: 10,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
  },
  staffList: {
    alignSelf: 'center',
    backgroundColor: '#DADADA',
    width: '90%',
  },
  staffListText: {
    fontSize: 20,
    width: '60%',
    fontWeight: 'bold',
    padding: 10,
    fontFamily: 'Poppins',
    color: '#2E2E2E',
    fontWeight: 800,
  },
  staffListNum: {
    fontSize: 14,
    width: '60%',
    fontWeight: 'bold',
    padding: 10,
    fontFamily: 'Poppins',
    color: '#9B9B9B',
    fontWeight: 800,
    marginTop: -20,
    marginLeft: 50
  },
  get_btn: {
    backgroundColor: Colors.greenButton,
    borderRadius: 24,
    width: 50,
  },
  get_btn_text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'center',
    paddingVertical: 10,
  },
  ringView: {
    alignItems: 'center',
    width: '90%',
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Dashboard;

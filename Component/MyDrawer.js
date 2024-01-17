import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    Alert
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';



const MyDrawer = props => {

    const [mangerBlock, setMangerBlock] = useState(true);
    AsyncStorage.getItem('authLoginRole').then((token) => {
        if (token === '2') {
            setMangerBlock(true);
        } else {
            setMangerBlock(false);
        }
    });

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
                            props.navigation.navigate('ProviderNavigators')
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
        <DrawerContentScrollView {...props} style={{ backgroundColor: 'white' }} >
            {mangerBlock && (<DrawerItem
                label="Dashboard"
                onPress={() => {
                    { props.navigation.navigate('Dashboard') }
                }
                }
                pressOpacity={0.5}
                style={styles.drawerItem}
                labelStyle={styles.label}
            />)}
            {!mangerBlock && (<DrawerItem
                label="Staff"
                onPress={() => {
                    { props.navigation.navigate('Staff') }
                }
                }
                pressOpacity={0.5}
                style={styles.drawerItem}
                labelStyle={styles.label}
            />)}
            {mangerBlock && (<DrawerItem
                label="Add Staff"
                onPress={() => {
                    { props.navigation.navigate('AddStaff') }
                }
                }
                pressOpacity={0.5}
                style={styles.drawerItem}
                labelStyle={styles.label}
            />)}
            <DrawerItem
                label="About Us"
                onPress={() => {
                    { props.navigation.navigate('About') }
                }
                }
                pressOpacity={0.5}
                style={styles.drawerItem}
                labelStyle={styles.label}
            />
            <DrawerItem
                label="Contact"
                onPress={() => props.navigation.navigate('Contact')}
                pressOpacity={0.5}
                style={styles.drawerItem}
                labelStyle={styles.label}
            />
            <DrawerItem
                label="Log Out"
                onPress={handleLogout}
                pressOpacity={0.5}
                style={styles.drawerItem}
                labelStyle={styles.label}
            />
        </DrawerContentScrollView>
    )
};

const styles = StyleSheet.create({
    drawerItem: {
        borderTopWidth: 0.2,
        borderRadius: 0,
        borderColor: 'black'
    },
    label: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
    },
    timeLabel: {
        color: 'yellow',
        fontSize: 14,
    },
    headerlabel: {
        color: 'yellow',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: -20
        // alignSelf: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25
    }
});

export default MyDrawer;
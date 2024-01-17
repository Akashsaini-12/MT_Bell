import React, { useEffect } from "react";
import {
    Image,
    StyleSheet,
    View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = () => {

    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
          checkLoggedInUser();
        }, 2000);
    
        return () => clearTimeout(timer); 
      }, []);

    const checkLoggedInUser = async () => {
        try {
            AsyncStorage.getItem('authLoginTokon' || 'managerToken').then((value) => {
                if (value !== null) {
                    AsyncStorage.getItem('authLoginRole').then((token) => {
                        if (token === '2') {
                            navigation.navigate("AuthNavigators", { screen: "Dashboard" });
                        } else {
                            navigation.navigate("AuthNavigators", { screen: "Staff" })
                        }
                    })
                } else {
                    navigation.navigate("ProviderNavigators");
                }
            });
        } catch (error) {
            console.log("Something went wrong", error);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <Image source={require('../../assets/SplashScreen.jpg')} style={styles.image} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d2eff7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
});

export default Splash;

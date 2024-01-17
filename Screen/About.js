import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions,Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../Constant/Color';

const windowHeight = Dimensions.get('window').height;

const AboutUsScreen = () => {
  return (
    <ScrollView>
      <View style={styles.background}>
          <Image style={styles.image} source={require('../assets/newAbout.jpg')} />
          <Text style={styles.text}>
            ANS IT Services Private Limited is a global software consulting and technology services company.
            We provide multi-channel fulfillment niche domain services with specializing in industry-specific solutions,
            strategic outsourcing, and integration services.
            Clients gain a competitive advantage by leveraging our Application development, delivery capabilities
            to achieve their service milestones with world-class quality and reduced costs.
          </Text>
          <Text style={styles.text}>
            Founded in 2012, ANS IT is a dependable partner for more than 100 satisfied clients that include a diverse range
            of Fortune and SME companies. We have IT experts, catering result-oriented and cost-competitive solutions
            for across the world.
          </Text>
          
          {/* Contact Details */}
          <View style={styles.detailsView}>
            <Icon name="home" type="font-awesome-5" size={25} style={styles.margin} />
            <View>
              <Text style={styles.ansText}>ANS IT Services Pvt. Ltd.</Text>
              <Text>A-62, A-Block, Sector 2,</Text>
              <Text>Noida, Uttar Pradesh 201301</Text>
            </View>
          </View>

          <View style={styles.detailsView}>
            <Icon name="mobile-alt" type="font-awesome-5" size={25}  style={styles.margin} />
            <View style={{marginLeft: 10}}>
              <Text onPress={() => { Linking.openURL('tel:9650452845') }} style={styles.numstyle}>+91 9650452845</Text>
              <Text >Mon to Sat 09:00am to 09:00pm</Text>
            </View>
          </View>

          <View style={styles.detailsView}>
            <Icon name="envelope" type="font-awesome-5" size={25}  style={styles.margin} />
            <View>
              <Text onPress={() => { Linking.openURL('mailto:ansit@gmail.com') }} style={styles.ansText}>ansit@gmail.com</Text>
              <Text>Send us your query anytime!</Text>
            </View>
          </View>

          {/* End of Contact Details */}
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#DADADA',
    padding: 20,
    minHeight: windowHeight,
    width: "100%",
  },
  body: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    color: 'black',
    marginBottom: 15,
    color: '#1F1F1F',
    fontFamily: 'Poppins',
  },
  detailsView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ansText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  numstyle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
  margin: {
    marginRight: 20,
  },
});

export default AboutUsScreen;

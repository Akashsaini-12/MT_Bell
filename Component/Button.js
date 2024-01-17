import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = ({ title, onPress, fontSize }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <LinearGradient
        colors={['#484AE2', '#69E1EF', '#E2E7E7']}
        style={styles.buttonGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[styles.buttonText, { fontSize: fontSize, }]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
  },
  buttonGradient: {
    borderRadius: 8,
    padding: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: "bold"
  },
});

export default GradientButton;

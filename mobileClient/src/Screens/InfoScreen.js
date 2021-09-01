import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

const InfoScreen = () => {
  const description = "The revolution has started. Through fitto, it's now easier to choose, store, carry, and drink all of the nutrition supplements you need in capsules.";

  return (
    <SafeAreaView>
      <Text style={styles.textStyle}>
        When technology meets supplements
      </Text>
      
      <Text style={styles.subHeaderStyle}>
        {description}
        </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40
  },
  subHeaderStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    fontSize: 20
  }
});

export default InfoScreen;

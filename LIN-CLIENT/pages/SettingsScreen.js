import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const SettingsScreen = ({ route, navigation }) => {
  return(
    <View style={styles.container}>
        <Text>Settings</Text>
        <StatusBar style="auto" />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
});

export default SettingsScreen;
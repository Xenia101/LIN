import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Github from '../Components/Github';

const SettingsScreen = ({ route, navigation }) => {
  return(
    <View style={styles.container}>
        <Github></Github>
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
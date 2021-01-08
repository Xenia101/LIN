import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import {TodoList} from './TodoList'

const HomeScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text>Home</Text>
            
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;
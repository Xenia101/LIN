import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    View,
    Keyboard,
    StyleSheet,
    SafeAreaView,
    TouchableWithoutFeedback
} from 'react-native';

import TodoList from '../Components/TodoList'

const HomeScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView>
                    <TodoList></TodoList>
                </SafeAreaView>
            </TouchableWithoutFeedback>
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
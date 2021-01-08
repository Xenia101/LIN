import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    View,
    StyleSheet,
    SafeAreaView
} from 'react-native';

import TodoList from '../Components/TodoList'
import AddTodo from '../Components/AddTodo'

const HomeScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <SafeAreaView>
                <TodoList></TodoList>
                <AddTodo></AddTodo>
            </SafeAreaView>
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
import * as React from 'react';
import { 
    ScrollView,
    Text,
    StyleSheet 
} from 'react-native';

const TodoList = () => {
    return (
        <ScrollView contentContainerStyle={styles.listContainer}>
            <Text>ScrollView</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        alignItems: 'center'
    }
})

export default TodoList;